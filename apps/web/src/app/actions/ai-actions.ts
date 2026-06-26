'use server';

import { prisma } from '@/lib/carbonix-auth/prisma';

export type Role = 'user' | 'model' | 'function';

export interface ChatMessage {
  role: Role;
  content: string;
  name?: string; // used for function call name
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// System instructions for the CarboniX agent
const SYSTEM_PROMPT = `
You are CarboniX AI, an agentic AI assistant integrated into the CarboniX dashboard.
You help users track their codebase deployments, manage cloud regions, and send notifications.

You have access to the following tools:
1. switchProjectRegion: Switch the cloud region for a deployed project to optimize carbon emissions.
2. pushMobileNotification: Send a push notification to a user's mobile app.
3. getProjectStatus: Retrieve real-time data about a project's current deployment.

When a user asks you to perform an action, use the tools provided.
Be concise and helpful. Use a professional but friendly tone.
`;

const tools = [
  {
    name: 'switchProjectRegion',
    description: 'Switch the region of a deployed project to a new cloud region.',
    parameters: {
      type: 'OBJECT',
      properties: {
        projectId: { type: 'STRING', description: 'The ID of the project to update.' },
        region: { type: 'STRING', description: 'The new region code (e.g., us-east-1, eu-west-1).' },
      },
      required: ['projectId', 'region'],
    },
  },
  {
    name: 'pushMobileNotification',
    description: 'Send a push notification to the user on their mobile device.',
    parameters: {
      type: 'OBJECT',
      properties: {
        userId: { type: 'STRING', description: 'The ID of the user to notify.' },
        title: { type: 'STRING', description: 'The title of the notification.' },
        body: { type: 'STRING', description: 'The main content of the notification.' },
      },
      required: ['userId', 'title', 'body'],
    },
  },
  {
    name: 'getProjectStatus',
    description: 'Get the current status, region, and emission metrics of a project.',
    parameters: {
      type: 'OBJECT',
      properties: {
        projectId: { type: 'STRING', description: 'The ID of the project.' },
      },
      required: ['projectId'],
    },
  },
];

async function callGeminiApi(history: ChatMessage[]) {
  if (!GEMINI_API_KEY) {
    return {
      candidates: [{
        content: {
          parts: [{ text: "AI features are currently disabled. Please configure GEMINI_API_KEY on the server to enable CarboniX Assistant." }]
        }
      }]
    };
  }

  // Format history for Gemini
  const contents = history.map((msg) => {
    if (msg.role === 'function') {
      return {
        role: 'user', // Gemini requires function responses to be from 'user' role but we use 'function' as a concept, wait. Gemini functionResponse actually has a specific format.
        parts: [{
          functionResponse: {
            name: msg.name,
            response: { result: msg.content }
          }
        }]
      };
    }
    
    // For assistant tool calls
    if (msg.role === 'model' && msg.name) {
      return {
        role: 'model',
        parts: [{
          functionCall: {
            name: msg.name,
            args: JSON.parse(msg.content)
          }
        }]
      };
    }

    return {
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    };
  });

  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    tools: [{ functionDeclarations: tools }],
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error('Gemini API Error:', err);
    throw new Error('Failed to generate response from Gemini.');
  }

  const data = await response.json();
  return data;
}

// Tool implementations
import { redis } from '@/lib/redis';

async function executeTool(name: string, args: any, adminUserId: string) {
  switch (name) {
    case 'switchProjectRegion': {
      const { projectId, region } = args;
      const project = await prisma.project.update({
        where: { id: projectId },
        data: { region },
      });
      // Invalidate the cache to immediately show the new region
      await redis.del('dashboard:projects_list');
      
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
    default:
      return `Unknown tool: ${name}`;
  }
}

export async function chatWithAgent(message: string, history: ChatMessage[], adminUserId: string) {
  try {
    const updatedHistory: ChatMessage[] = [...history, { role: 'user', content: message }];
    
    let aiData = await callGeminiApi(updatedHistory);
    let candidate = aiData?.candidates?.[0];
    
    if (!candidate) {
      return { success: false, error: 'No response from AI.' };
    }

    const newMessages: ChatMessage[] = [];

    // Loop to handle tool calls automatically on the server
    while (candidate.content?.parts?.[0]?.functionCall) {
      const call = candidate.content.parts[0].functionCall;
      const functionName = call.name;
      const functionArgs = call.args;

      // Add model's tool call to history
      updatedHistory.push({
        role: 'model',
        name: functionName,
        content: JSON.stringify(functionArgs),
      });

      // Execute tool
      let resultStr = '';
      try {
        resultStr = await executeTool(functionName, functionArgs, adminUserId);
      } catch (e: any) {
        resultStr = `Error executing ${functionName}: ${e.message}`;
      }

      // Add tool response to history
      updatedHistory.push({
        role: 'function',
        name: functionName,
        content: resultStr,
      });

      // Call Gemini again with the tool result
      aiData = await callGeminiApi(updatedHistory);
      candidate = aiData?.candidates?.[0];
      
      if (!candidate) break;
    }

    // Final text response
    if (candidate?.content?.parts?.[0]?.text) {
      const text = candidate.content.parts[0].text;
      updatedHistory.push({ role: 'model', content: text });
      return { success: true, text, updatedHistory };
    }

    return { success: false, error: 'Unexpected AI response format.' };
  } catch (error: any) {
    console.error('Agent Action Error:', error);
    return { success: false, error: error.message };
  }
}
