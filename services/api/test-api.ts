

async function test() {
  try {
    // Attempt to hit a protected backend route with an invalid token to see if it responds
    const res = await fetch('http://localhost:4000/api/v1/admin/dashboard/stats', {
      headers: {
        'Authorization': 'Bearer bad-token'
      }
    });
    console.log('Status with bad token:', res.status);
    console.log('Body with bad token:', await res.text());
  } catch (err: any) {
    console.error('Fetch error:', err.message);
  }
}
test();
