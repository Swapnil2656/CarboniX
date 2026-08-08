import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { prisma } from '../../lib/prisma';
import { resolveTenantContext } from '../admin/admin.controller';
import { ChatMessage, Role, callNvidiaApi } from '@carbonix/core';
import { platformRegistry } from '@carbonix/agents';
import { Expo } from 'expo-server-sdk';
import { decryptToken } from '../../lib/platformTokenService';
import * as crypto from 'crypto';

const expo = new Expo();

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

const SYSTEM_PROMPT = `
You are CarboniX AI, a helpful and expert assistant for the CarboniX platform.
CarboniX is an industrial-grade cloud infrastructure optimization platform. It helps users quantify, monitor, and reduce the carbon footprint and cost of their cloud deployments (like AWS, GCP, Azure).

You MUST ALWAYS use a tool to respond.
1. If the user asks about their projects, use listProjects, switchProjectRegion, etc. Use the data from the tools to give detailed answers about their infrastructure.
2. If the user asks to generate a self-hosted agent API key, use generateApiKey to generate a key for their project (use listProjects to find their project ID first).
3. If the user asks a general question (like "what is CarboniX?", "hi", "who are you?"), use the "respondToUser" tool to answer them accurately based on your knowledge of CarboniX.

NEVER answer without using a tool.
`;

const tools = [
  {
    type: 'function',
    function: {
      name: 'respondToUser',
      description: 'Use this to respond to the user for general queries, greetings, and chat.',
      parameters: {
        type: 'object',
        properties: { response: { type: 'string', description: 'The text to reply to the user with.' } },
        required: ['response']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'listProjects',
      description: 'List all available projects and their IDs.',
      parameters: {
        type: 'object',
        properties: {},
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'switchProjectRegion',
      description: 'Switch the region of a deployed project to a new cloud region.',
      parameters: {
        type: 'object',
        properties: {
          projectId: { type: 'string', description: 'The ID of the project to update.' },
          region: { type: 'string', description: 'The new region code (e.g., us-east-1, eu-west-1).' },
          deploymentId: { type: 'string', description: 'Optional. Target a specific deployment within the project.' },
          applyToAll: { type: 'boolean', description: 'Optional. Set to true if switching every deployment in the project.' },
        },
        required: ['projectId', 'region'],
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'pushMobileNotification',
      description: 'Send a push notification to the user on their mobile device.',
      parameters: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'The ID of the user to notify.' },
          title: { type: 'string', description: 'The title of the notification.' },
          body: { type: 'string', description: 'The main content of the notification.' },
        },
        required: ['userId', 'title', 'body'],
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'getProjectStatus',
      description: 'Get the current status, region, and emission metrics of a project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: { type: 'string', description: 'The ID of the project.' },
        },
        required: ['projectId'],
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'generateApiKey',
      description: 'Generate a new CarboniX agent API key for self-hosted server deployment.',
      parameters: {
        type: 'object',
        properties: {
          projectId: { type: 'string', description: 'The ID of the project to generate the key for.' },
        },
        required: ['projectId'],
      }
    }
  },
];

// The callNvidiaApi function has been moved to @carbonix/core
async function executeTool(name: string, args: any, adminUserId: string, adminUserEmail: string) {
  switch (name) {
    case 'listProjects': {
      const { projectIds } = await resolveTenantContext(adminUserId, adminUserEmail);
      const projects = await prisma.project.findMany({
        where: { id: { in: projectIds } },
        select: { id: true, name: true, region: true, isDeployed: true }
      });
      if (projects.length === 0) return 'No projects found.';
      return JSON.stringify(projects);
    }
    case 'switchProjectRegion': {
      const { projectId, region, deploymentId, applyToAll } = args;
      
      const { projectIds, teamUserIds } = await resolveTenantContext(adminUserId, adminUserEmail);
      if (!projectIds.includes(projectId)) {
        throw new Error('Project not found or you do not have permission to modify it.');
      }

      const oldProject = await prisma.project.findUnique({ where: { id: projectId } });
      if (!oldProject) throw new Error('Project not found');

      // 1. Fetch targeted deployments
      const deployments = await prisma.deployment.findMany({
        where: {
          projectId,
          ...(deploymentId && !applyToAll ? { id: deploymentId } : {})
        },
        include: { platformToken: true }
      });

      if (deployments.length === 0) {
        throw new Error('No deployments found matching the criteria.');
      }

      const results = [];
      let anySuccess = false;

      // 2. Process each deployment
      for (const deployment of deployments) {
        if (deployment.platformToken) {
          try {
            const token = decryptToken(deployment.platformToken.encryptedToken);
            const adapter = platformRegistry.getAdapter(deployment.platformToken.platform);
            if (adapter && adapter.capabilities.canSetRegion) {
              const res = await adapter.applyRegion(token, deployment.platformToken.projectSlug || deployment.label || '', region);
              if (res.success || res.requiresRedeploy) {
                // Update DB since it worked
                await prisma.deployment.update({
                  where: { id: deployment.id },
                  data: { region }
                });
                anySuccess = true;
                results.push(`[REAL] Deployment '${deployment.label || deployment.id}' region switched to ${region} via ${deployment.platformToken.platform}.`);
              } else {
                results.push(`[FAILED] Deployment '${deployment.label || deployment.id}' failed: ${res.error}`);
              }
            } else {
              results.push(`[FAILED] No capable adapter for ${deployment.platformToken.platform}.`);
            }
          } catch (e: any) {
            if (e.name === 'PlatformQuotaError') {
              try {
                const prompt = `The user's cloud provider (${deployment.platformToken.platform}) rejected an automated region migration to ${region} due to exhausted quota/credits (HTTP 402/429). Please generate a short JSON/YAML/IaC configuration snippet that the user can manually copy-paste into their repository (e.g., vercel.json, railway.json, netlify.toml) to force the deployment to region ${region}. Only output the snippet.`;
                const fallbackResponse = await callNvidiaApi(
                  NVIDIA_API_KEY!, 
                  'meta/llama-3.1-70b-instruct', 
                  'You are an expert DevOps engineer. Provide only the config snippet requested.', 
                  [{ role: 'user', content: prompt }]
                );
                const snippet = fallbackResponse?.choices?.[0]?.message?.content || 'No snippet generated.';
                results.push(`[FAILED] Quota exceeded on ${deployment.platformToken.platform}. Fallback instructions:\\nTo manually migrate to ${region}, apply this config:\\n${snippet}`);
              } catch (fallbackErr) {
                results.push(`[FAILED] Quota exceeded on ${deployment.platformToken.platform}. Fallback generation also failed.`);
              }
            } else if (e.name === 'PlatformAuthError') {
              results.push(`[FAILED] Authentication failed for ${deployment.platformToken.platform}. Please reconnect your integration on the settings page.`);
              await prisma.platformToken.update({ 
                where: { id: deployment.platformToken.id }, 
                data: { status: 'INVALID', lastError: e.message }
              });
            } else if (e.name === 'PlatformTransientError') {
              results.push(`[FAILED] Transient error on ${deployment.platformToken.platform}. Please try again later.`);
            } else {
              results.push(`[ERROR] Failed to switch '${deployment.label || deployment.id}': ${e.message}`);
            }
          }
        } else {
          // Simulation fallback for deployments lacking a real token
          await prisma.deployment.update({
            where: { id: deployment.id },
            data: { region }
          });
          anySuccess = true;
          results.push(`[SIMULATED] Deployment '${deployment.label || deployment.id}' region switched to ${region} (No physical platform token).`);
        }
      }

      if (anySuccess) {
        await prisma.project.update({
          where: { id: projectId },
          data: { region }
        });

        const actionLog = results.join('\\n');

        await prisma.auditLog.create({
          data: {
            actorId: adminUserId,
            actorEmail: 'system@carbonix.ai',
            actorRole: 'SYSTEM',
            action: 'PROJECT_REGION_SWITCH',
            resource: 'project',
            resourceId: projectId,
            before: { region: oldProject.region },
            after: { region, results: actionLog },
            ip: 'AI Agent',
            userAgent: 'CarboniX Backend',
          }
        });

        await prisma.notification.create({
          data: {
            title: 'Project Region Changed',
            body: `Project '${oldProject.name}' region changed to ${region}. Details:\\n${actionLog}`,
            type: 'TARGETED',
            status: 'SENT',
            targetAudience: 'CUSTOM',
            targetUserIds: teamUserIds,
            createdBy: adminUserId,
          }
        });
      }

      return `Execution complete:\\n${results.join('\\n')}`;
    }
    case 'pushMobileNotification': {
      const { userId, title, body } = args;
      
      const userProfile = await prisma.profile.findUnique({ where: { userId } });
      
      let pushSuccess = false;
      if (userProfile?.expoPushToken && Expo.isExpoPushToken(userProfile.expoPushToken)) {
        const messages = [{
          to: userProfile.expoPushToken,
          sound: 'default' as const,
          title,
          body,
          data: { type: 'agent_alert' },
        }];
        try {
          const chunks = expo.chunkPushNotifications(messages);
          for (const chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk);
          }
          pushSuccess = true;
        } catch (error) {
          console.error('Expo push error:', error);
        }
      }

      await prisma.notification.create({
        data: {
          title,
          body,
          type: 'TARGETED',
          status: pushSuccess ? 'SENT' : 'FAILED',
          targetAudience: 'CUSTOM',
          targetUserIds: [userId],
          createdBy: adminUserId,
          totalRecipients: 1,
        },
      });
      return pushSuccess ? `Notification '${title}' sent successfully.` : `Notification '${title}' logged but push delivery failed (no valid token).`;
    }
    case 'getProjectStatus': {
      const { projectId } = args;
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) return 'Project not found.';
      return `Project '${project.name}' is currently deployed in region '${project.region}'. It is active and tracking carbon emissions.`;
    }
    case 'generateApiKey': {
      const { projectId } = args;
      
      const { projectIds } = await resolveTenantContext(adminUserId, adminUserEmail);
      if (!projectIds.includes(projectId)) {
        return 'Project not found or you do not have permission to modify it.';
      }

      const project = await prisma.project.findUnique({ where: { id: projectId } });
      
      const rawKey = 'cx_' + crypto.randomBytes(32).toString('hex');
      const prefix = rawKey.substring(0, 12);
      const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');
      
      await prisma.apiKey.create({
        data: {
          name: `Agent Key for ${project?.name} (AI Generated)`,
          prefix,
          hashedKey,
          createdBy: adminUserId,
          projectId: projectId,
          permissions: ['agent_control'],
        }
      });
      
      return `Success! I have generated a self-hosted server agent API key for project '${project?.name}'. Your new API key is: ${rawKey} . Please copy it immediately as it will not be shown again.`;
    }
    default:
      return `Unknown tool: ${name}`;
  }
}

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    const adminUserId = req.user!.id;
    const history = await prisma.chatHistory.findUnique({
      where: { userId: adminUserId },
    });

    if (history) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (history.updatedAt < thirtyDaysAgo) {
        await prisma.chatHistory.delete({ where: { userId: adminUserId } });
        return res.json({ success: true, messages: [] });
      }

      return res.json({ success: true, messages: history.messages });
    }

    return res.json({ success: true, messages: [] });
  } catch (error: any) {
    console.error('Failed to get chat history:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const clearHistory = async (req: AuthRequest, res: Response) => {
  try {
    const adminUserId = req.user!.id;
    await prisma.chatHistory.delete({ where: { userId: adminUserId } });
    res.json({ success: true });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.json({ success: true });
    }
    console.error('Failed to clear chat history:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const chat = async (req: AuthRequest, res: Response) => {
  try {
    const adminUserId = req.user!.id;
    const adminUserEmail = req.user!.email;
    const { message } = req.body;
    const history = req.body.history || [];
    
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required.' });
    }

    const updatedHistory: ChatMessage[] = [...history, { role: 'user', content: message }];
    
    if (!NVIDIA_API_KEY) {
      updatedHistory.push({ role: 'model', content: "AI features are currently disabled. Please configure NVIDIA_API_KEY on the server to enable CarboniX Assistant." });
      return res.json({ success: true, text: "AI features are currently disabled. Please configure NVIDIA_API_KEY on the server to enable CarboniX Assistant.", updatedHistory });
    }

    let aiData = await callNvidiaApi(NVIDIA_API_KEY, 'meta/llama-3.1-70b-instruct', SYSTEM_PROMPT, updatedHistory, tools);
    let aiMessage = aiData?.choices?.[0]?.message;
    
    if (!aiMessage) {
      return res.status(500).json({ success: false, error: 'No response from AI.' });
    }

    let iterations = 0;
    while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0 && iterations < 5) {
      iterations++;
      const toolCalls = aiMessage.tool_calls;
      
      // Check if the AI used the respondToUser bypass
      if (toolCalls.length === 1 && toolCalls[0].function.name === 'respondToUser') {
        try {
          const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
          aiMessage.content = parsedArgs.response || "Hello!";
          break; // Exit tool loop, answer generated
        } catch (e) {
          // Fallback if parsing fails
        }
      }

      for (const call of toolCalls) {
        const functionName = call.function.name;
        const functionArgs = call.function.arguments; // JSON string
        const toolCallId = call.id;

        // Add the model's call to history
        updatedHistory.push({
          role: 'model',
          name: functionName,
          content: functionArgs,
          toolCallId: toolCallId
        });

        console.log(`Executing ${functionName}...`);

        let resultStr = '';
        try {
          const result = await executeTool(functionName, JSON.parse(functionArgs), adminUserId, adminUserEmail);
          resultStr = typeof result === 'string' ? result : JSON.stringify(result);
        } catch (err: any) {
          resultStr = `Error: ${err.message}`;
        }

        // Add tool response to history
        updatedHistory.push({
          role: 'function',
          name: functionName,
          content: resultStr,
          toolCallId: toolCallId
        });
      }

      // Fetch the next turn from AI
      try {
        aiData = await callNvidiaApi(NVIDIA_API_KEY, 'meta/llama-3.1-70b-instruct', SYSTEM_PROMPT, updatedHistory, tools);
        aiMessage = aiData?.choices?.[0]?.message;
        if (!aiMessage) break;
      } catch (aiError: any) {
        console.error('Nvidia NIM API Error after tool execution:', aiError);
        updatedHistory.push({
          role: 'model',
          content: `I executed the action successfully, but encountered an API error generating my response: ${aiError.message}`
        });
        break;
      }
    }

    if (aiMessage?.content) {
      const text = aiMessage.content;
      updatedHistory.push({ role: 'model', content: text });
      
      await prisma.chatHistory.upsert({
        where: { userId: adminUserId },
        update: { messages: updatedHistory as any },
        create: {
          userId: adminUserId,
          messages: updatedHistory as any,
        },
      });

      return res.json({ success: true, text, updatedHistory });
    }

    return res.status(500).json({ success: false, error: 'Unexpected AI response format.' });
  } catch (error: any) {
    console.error('Agent Action Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
