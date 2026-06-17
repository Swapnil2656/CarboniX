import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load keys from root and web env files
dotenv.config({ path: '../../.env' });
dotenv.config({ path: './.env' });

async function testKeys() {
  console.log("-----------------------------------------");
  console.log("🧪 TESTING API KEYS & CREDENTIALS...");
  console.log("-----------------------------------------\n");

  // 1. Test Emissions.dev API
  console.log("1️⃣  Testing Emissions.dev API...");
  try {
    const res = await fetch("https://api.emissions.dev/v1/electricity/grid?country=IN", {
      headers: { 'Authorization': `Bearer ${process.env.EMISSIONS_API_KEY}` }
    });
    if (res.ok) {
      console.log("   ✅ SUCCESS: Connected to Emissions.dev successfully.");
    } else {
      console.log(`   ❌ FAILED: Received status ${res.status}`);
      console.log(`   Response: ${await res.text()}`);
    }
  } catch (err) {
    console.log(`   ❌ ERROR: ${err.message}`);
  }
  console.log("");

  // 2. Test Gemini API
  console.log("2️⃣  Testing Gemini API...");
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Explain how AI works in 5 words" }] }]
      })
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`   ✅ SUCCESS: Gemini responded with: "${data.candidates[0].content.parts[0].text.trim()}"`);
    } else {
      console.log(`   ❌ FAILED: Received status ${res.status}`);
      console.log(`   Response: ${await res.text()}`);
    }
  } catch (err) {
    console.log(`   ❌ ERROR: ${err.message}`);
  }
  console.log("");

  // 3. Test SMTP (Nodemailer)
  console.log("3️⃣  Testing Gmail SMTP (Nodemailer)...");
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    await transporter.verify();
    console.log("   ✅ SUCCESS: Connected to Gmail SMTP server securely.");
  } catch (err) {
    console.log(`   ❌ FAILED: ${err.message}`);
  }
  console.log("\n-----------------------------------------");
}

testKeys();
