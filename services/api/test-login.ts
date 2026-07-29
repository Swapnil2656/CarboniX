

async function test() {
  try {
    const res = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'alice@carbonix.dev', password: 'password123' })
    });
    
    const data = await res.json();
    console.log('Login Response:', data);

    if (data.success && data.data?.token) {
      const token = data.data.token;
      console.log('Got token, testing protected route...');
      const req = await fetch('http://localhost:4000/api/v1/admin/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('Protected Route Status:', req.status);
      console.log('Protected Route Body:', await req.text());
    }
  } catch (err: any) {
    console.error('Fetch error:', err.message);
  }
}
test();
