'use server';

import { prisma } from '@/lib/carbonix-auth/prisma';
import * as crypto from 'crypto';

export type Role = 'user' | 'model' | 'function';

export interface ChatMessage {
  role: Role;
  content: string;
  name?: string; // used for function call name
  toolCallId?: string;
}

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

// System instructions for the CarboniX agent
const SYSTEM_PROMPT = `
You are CarboniX AI, a helpful and expert assistant for the CarboniX platform.
CarboniX is an industrial-grade cloud infrastructure optimization platform. It helps users quantify, monitor, and reduce the carbon footprint and cost of their cloud deployments (like AWS, GCP, Azure).

You MUST ALWAYS use a tool to respond.
1. If the user asks about their projects, use listProjects, switchProjectRegion, etc. Use the data from the tools to give detailed answers about their infrastructure.
2. If the user asks to generate, create, or make an API key for a self-hosted agent or server, ALWAYS use the generateApiKey tool. Return the generated key back to the user clearly.
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
      description: 'Generates a new API key for the user to use with self-hosted agents or integrations.',
      parameters: {
        type: 'object',
        properties: {
          projectName: { type: 'string', description: 'The name of the project this key is for.' },
          permissions: { type: 'array', items: { type: 'string' }, description: 'Permissions for the key (e.g. agent_control)' },
        },
        required: ['projectName'],
      }
    }
  },
];

async function callNvidiaApi(history: ChatMessage[]) {
  if (!NVIDIA_API_KEY) {
    return {
      choices: [{
        message: {
          role: 'assistant',
          content: "AI features are currently disabled. Please configure NVIDIA_API_KEY on the server to enable CarboniX Assistant."
        }
      }]
    };
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((msg) => {
      if (msg.role === 'function') {
        return {
          role: 'tool',
          tool_call_id: msg.toolCallId,
          name: msg.name,
          content: msg.content
        };
      }
      
      if (msg.role === 'model' && msg.name) {
        return {
          role: 'assistant',
          tool_calls: [{
            id: msg.toolCallId,
            type: 'function',
            function: {
              name: msg.name,
              arguments: msg.content
            }
          }]
        };
      }

      return {
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content || "",
      };
    })
  ];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

  let response;
  try {
    response = await fetch(
      `https://integrate.api.nvidia.com/v1/chat/completions`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NVIDIA_API_KEY}`
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-70b-instruct',
          messages,
          tools,
          temperature: 0.2,
        }),
        signal: controller.signal
      }
    );
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Nvidia NIM API Error: Request timed out after 60 seconds.');
    }
    throw err;
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    const errText = await response.text();
    console.error('Nvidia NIM API Error details:', errText);
    
    let detailedMsg = 'Failed to generate response from Nvidia NIM. See console.';
    try {
      const errJson = JSON.parse(errText);
      if (errJson.error && errJson.error.message) {
        detailedMsg = errJson.error.message;
      }
    } catch(e) {}
    
    throw new Error(`Nvidia NIM API Error: ${detailedMsg}`);
  }

  return response.json();
}

// Tool implementations
import { redis } from '@/lib/redis';

async function executeTool(name: string, args: any, adminUserId: string) {
  switch (name) {
    case 'listProjects': {
      const projects = await prisma.project.findMany({
        where: { userId: adminUserId },
        select: { id: true, name: true, region: true, sdkConnected: true }
      });
      if (projects.length === 0) return 'No projects found.';
      return JSON.stringify(projects);
    }
    case 'switchProjectRegion': {
      const { projectId, region } = args;
      
      const oldProject = await prisma.project.findUnique({ where: { id: projectId } });
      if (!oldProject) throw new Error('Project not found');

      const project = await prisma.project.update({
        where: { id: projectId },
        data: { region },
      });

      // Audit Log
      await prisma.auditLog.create({
        data: {
          actorId: adminUserId,
          actorEmail: 'system@carbonix.ai',
          actorRole: 'SYSTEM',
          action: 'PROJECT_REGION_SWITCH',
          resource: 'project',
          resourceId: projectId,
          before: { region: oldProject.region },
          after: { region },
          ip: 'AI Agent',
          userAgent: 'CarboniX Copilot',
        }
      });

      // Notification
      await prisma.notification.create({
        data: {
          title: 'Project Region Changed',
          body: `Project '${project.name}' was switched from ${oldProject.region || 'unknown'} to ${region} to optimize carbon emissions.`,
          type: 'BROADCAST',
          status: 'SENT',
          targetAudience: 'ALL',
          createdBy: adminUserId,
        }
      });

      // Invalidate the cache to immediately show the new region
      try {
        await redis.del('dashboard:projects_list');
      } catch (e) {
        console.warn('Redis cache invalidation failed:', e);
      }
      return `Successfully switched project '${project.name}' to region '${region}'.`;
    }
    case 'pushMobileNotification': {
      const { userId, title, body } = args;
      await prisma.notification.create({
        data: {
          title,
          body,
          type: 'TARGETED',
          status: 'SENDING',
          targetAudience: 'CUSTOM',
          targetUserIds: [userId],
          createdBy: adminUserId,
          totalRecipients: 1,
        },
      });
      return `Notification '${title}' sent successfully.`;
    }
    case 'getProjectStatus': {
      const { projectId } = args;
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) return 'Project not found.';
      
      // We can also fetch recent emissions if needed
      return `Project '${project.name}' is currently deployed in region '${project.region}'. It is active and tracking carbon emissions.`;
    }
    case 'generateApiKey': {
      const { projectName, permissions } = args;
      const rawKey = crypto.randomBytes(24).toString('hex');
      const prefix = 'cx_' + rawKey.substring(0, 8);
      const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');

      let project = await prisma.project.findFirst({
        where: { name: projectName, userId: adminUserId }
      });

      if (!project) {
        project = await prisma.project.findFirst({
          where: { userId: adminUserId }
        });
      }

      if (!project) return "You don't have any projects to attach this key to.";

      const keyRecord = await prisma.apiKey.create({
        data: {
          name: `Agent Key for ${project.name}`,
          prefix,
          hashedKey,
          projectId: project.id,
          permissions: permissions || ['agent_control'],
          createdBy: adminUserId,
        }
      });

      return `Success! I have generated a new API Key for project '${project.name}'. The key is: cx_${rawKey}  (Please copy this, it will not be shown again).`;
    }
    default:
      return `Unknown tool: ${name}`;
  }
}

export async function getChatHistory(adminUserId: string) {
  try {
    const history = await prisma.chatHistory.findUnique({
      where: { userId: adminUserId },
    });

    if (history) {
      // Check if history is older than 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (history.updatedAt < thirtyDaysAgo) {
        // Clear history if older than 30 days
        await prisma.chatHistory.delete({ where: { userId: adminUserId } });
        return { success: true, messages: [] };
      }

      return { success: true, messages: history.messages as any as ChatMessage[] };
    }

    return { success: true, messages: [] };
  } catch (error: any) {
    console.error('Failed to get chat history:', error);
    return { success: false, error: error.message };
  }
}

export async function clearChatHistory(adminUserId: string) {
  try {
    await prisma.chatHistory.delete({ where: { userId: adminUserId } });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Record to delete does not exist, which is fine
      return { success: true };
    }
    console.error('Failed to clear chat history:', error);
    return { success: false, error: error.message };
  }
}

export async function chatWithAgent(message: string, history: ChatMessage[], adminUserId: string) {
  try {
    const updatedHistory: ChatMessage[] = [...history, { role: 'user', content: message }];
    
    let aiData = await callNvidiaApi(updatedHistory);
    let aiMessage = aiData?.choices?.[0]?.message;
    
    if (!aiMessage) {
      return { success: false, error: 'No response from AI.' };
    }

    // Process tool calls if requested
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

      // Check if the AI generated an API key (we want to output it exactly as is without a second LLM pass)
      if (toolCalls.length === 1 && toolCalls[0].function.name === 'generateApiKey') {
        try {
          const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
          const resultStr = await executeTool('generateApiKey', parsedArgs, adminUserId);
          aiMessage.content = typeof resultStr === 'string' ? resultStr : JSON.stringify(resultStr);
          break; // Exit tool loop, return exactly what executeTool returned
        } catch (err: any) {
          aiMessage.content = `Error: ${err.message}`;
          break;
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
          const result = await executeTool(functionName, JSON.parse(functionArgs), adminUserId);
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
        aiData = await callNvidiaApi(updatedHistory);
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

    // Return the final text if any
    if (aiMessage?.content) {
      const text = aiMessage.content;
      updatedHistory.push({ role: 'model', content: text });
      
      // Save history to database
      await prisma.chatHistory.upsert({
        where: { userId: adminUserId },
        update: { messages: updatedHistory as any },
        create: {
          userId: adminUserId,
          messages: updatedHistory as any,
        },
      });

      return { success: true, text, updatedHistory };
    }

    return { success: false, error: 'Unexpected AI response format.' };
  } catch (error: any) {
    console.error('Agent Action Error:', error);
    return { success: false, error: error.message };
  }
}
