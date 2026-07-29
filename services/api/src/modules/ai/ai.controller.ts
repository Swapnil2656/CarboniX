import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth.middleware';
import { prisma } from '../../lib/prisma';

export type Role = 'user' | 'model' | 'function';

export interface ChatMessage {
  role: Role;
  content: string;
  name?: string;
  toolCallId?: string;
}

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

const SYSTEM_PROMPT = `
You are CarboniX AI, a helpful and expert assistant for the CarboniX platform.
CarboniX is an industrial-grade cloud infrastructure optimization platform. It helps users quantify, monitor, and reduce the carbon footprint and cost of their cloud deployments (like AWS, GCP, Azure).

You MUST ALWAYS use a tool to respond.
1. If the user asks about their projects, use listProjects, switchProjectRegion, etc. Use the data from the tools to give detailed answers about their infrastructure.
2. If the user asks a general question (like "what is CarboniX?", "hi", "who are you?"), use the "respondToUser" tool to answer them accurately based on your knowledge of CarboniX.

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
          model: 'mistralai/mistral-nemotron',
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

async function executeTool(name: string, args: any, adminUserId: string) {
  switch (name) {
    case 'listProjects': {
      const projects = await prisma.project.findMany({
        where: { userId: adminUserId },
        select: { id: true, name: true, region: true, isDeployed: true }
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
          ip: 'AI Agent (Mobile)',
          userAgent: 'CarboniX Mobile',
        }
      });

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

      // Removed redis cache invalidation as redis is not available in the API utils
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
      return `Project '${project.name}' is currently deployed in region '${project.region}'. It is active and tracking carbon emissions.`;
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
    const { message, history } = req.body;
    
    if (!message || !history) {
      return res.status(400).json({ success: false, error: 'Message and history are required.' });
    }

    const updatedHistory: ChatMessage[] = [...history, { role: 'user', content: message }];
    
    let aiData = await callNvidiaApi(updatedHistory);
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
