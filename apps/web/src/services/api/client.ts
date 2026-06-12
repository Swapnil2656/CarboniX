// 1. Fetch wrapper for API calls to the Express backend (services/api)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

/**
 * Standard fetch client that automatically attaches headers and handles errors.
 */
export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // If you need to attach a JWT token for the backend, you can pull it from cookies/session here.
  // const session = await getSession(); // Example NextAuth session
  // if (session?.accessToken) defaultHeaders['Authorization'] = `Bearer ${session.accessToken}`;

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  // Some endpoints might return empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}
