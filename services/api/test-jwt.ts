import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const JWT_SECRET = process.env.JWT_SECRET || '';
const token = jwt.sign({ id: 'test-user', email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1d' });
console.log('Generated token:', token);

try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('Decoded successfully:', decoded);
} catch (err: any) {
  console.error('Verify failed:', err.message);
}
