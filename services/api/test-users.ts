import jwt from 'jsonwebtoken';

const token = jwt.sign(
  { id: 'cmrf8i2v1000011zyp45eqedx', email: 'swapnilsen2656@gmail.com', role: 'ADMIN' },
  process.env.JWT_SECRET || 'fallback_secret',
  { expiresIn: '1h' }
);

fetch('http://localhost:4000/api/v1/admin/users', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
