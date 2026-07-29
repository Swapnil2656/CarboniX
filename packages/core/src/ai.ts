export type Role = 'user' | 'model' | 'function' | 'system' | 'assistant' | 'tool';

export interface ChatMessage {
  role: Role;
  content: string;
  name?: string;
  toolCallId?: string;
  tool_calls?: any[];
}

export async function callNvidiaApi(
  apiKey: string,
  model: string,
  systemPrompt: string,
  history: ChatMessage[],
  tools?: any[]
) {
  if (!apiKey) {
    throw new Error("API Key is missing for AI calls.");
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map((msg) => {
      if (msg.role === 'function' || msg.role === 'tool') {
        return {
          role: 'tool',
          tool_call_id: msg.toolCallId,
          name: msg.name,
          content: msg.content
        };
      }
      
      if ((msg.role === 'model' || msg.role === 'assistant') && msg.name && msg.toolCallId) {
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
      
      if ((msg.role === 'model' || msg.role === 'assistant') && msg.tool_calls) {
        return {
          role: 'assistant',
          tool_calls: msg.tool_calls
        };
      }

      return {
        role: (msg.role === 'user' ? 'user' : 'assistant'),
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
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          ...(tools && tools.length > 0 ? { tools } : {}),
          temperature: 0.2,
        }),
        signal: controller.signal as any
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
