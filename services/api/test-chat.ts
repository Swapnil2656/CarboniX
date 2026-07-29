import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });


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
      parameters: { type: 'object', properties: {} }
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
          projectId: { type: 'string' },
          region: { type: 'string' },
        },
        required: ['projectId', 'region'],
      }
    }
  }
];

async function callNvidiaApi(history: any[]) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map((msg) => {
      if (msg.role === 'tool') {
        return { role: 'tool', tool_call_id: msg.tool_call_id, name: msg.name, content: msg.content };
      }
      if (msg.role === 'assistant' && msg.tool_calls) {
        return { role: 'assistant', content: '', tool_calls: msg.tool_calls };
      }
      return { role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content || "" };
    })
  ];

  const response = await fetch(`https://integrate.api.nvidia.com/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${NVIDIA_API_KEY}` },
    body: JSON.stringify({
      model: 'mistralai/mistral-nemotron',
      messages,
      tools,
      temperature: 0.2,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`API failed: ${await response.text()}`);
  }
  return response.json();
}

async function simulateChat(prompt: string) {
  console.log(`\n--- User: ${prompt} ---`);
  const history: any[] = [{ role: 'user', content: prompt }];
  let aiData = await callNvidiaApi(history);
  let aiMessage = aiData.choices[0].message;
  console.log('[API Raw Response]:', JSON.stringify(aiMessage, null, 2));

  let iterations = 0;
  while (aiMessage.tool_calls && aiMessage.tool_calls.length > 0 && iterations < 5) {
    iterations++;
    
    // Create assistant message with all tool calls
    history.push({ 
      role: 'assistant', 
      content: '', 
      tool_calls: aiMessage.tool_calls 
    });

    for (const call of aiMessage.tool_calls) {
      const functionName = call.function.name;
      const functionArgs = call.function.arguments;
      const toolCallId = call.id;

      console.log(`[Tool Call]: ${functionName}(${functionArgs})`);

      let resultStr = '';
      if (functionName === 'respondToUser') {
        try {
          const parsed = JSON.parse(functionArgs);
          console.log(`[AI Answer]: ${parsed.response}`);
          return; // End the chat turn early
        } catch(e) {
          resultStr = 'Error parsing response';
        }
      } else if (functionName === 'listProjects') {
        resultStr = '[{"id":"1","name":"Project Alpha","region":"us-east-1","isDeployed":true}, {"id":"2","name":"Project Beta","region":"eu-west-1","isDeployed":true}]';
      } else if (functionName === 'switchProjectRegion') {
        resultStr = 'Successfully switched project to new region.';
      } else {
        resultStr = 'Success';
      }

      history.push({ role: 'tool', name: functionName, content: resultStr, tool_call_id: toolCallId });
    }

    aiData = await callNvidiaApi(history);
    aiMessage = aiData.choices[0].message;
  }
  
  console.log(`[AI Response]: ${aiMessage.content}`);
}

async function runTests() {
  await simulateChat('hi');
  await simulateChat('who is the president of india');
  await simulateChat('tell me about all the connected projects');
  await simulateChat('switch project alpha to eu-west-1');
}

runTests();
