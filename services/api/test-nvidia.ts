
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

async function test() {
  const response = await fetch(
    `https://integrate.api.nvidia.com/v1/chat/completions`,
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [{ role: 'user', content: 'hello' }]
      }),
    }
  );
  
  if (!response.ok) {
    console.log('Error status:', response.status);
    console.log('Error text:', await response.text());
  } else {
    const data = await response.json();
    console.log('Success:', data.choices[0].message.content);
  }
}

test();
