import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);
console.log('JWT_SECRET char codes:', process.env.JWT_SECRET?.split('').map(c => c.charCodeAt(0)));
