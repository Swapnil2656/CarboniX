const axios = require('axios');

async function verify() {
  console.log("🔍 Verifying Phase 3: Authentication...");
  try {
    // 1. Register a test user
    const email = `testuser_${Date.now()}@example.com`;
    const password = "password123";
    
    console.log(`➡️ Registering user: ${email}`);
    let res = await axios.post('http://localhost:4000/api/v1/auth/register', {
      name: "Test User",
      email,
      password
    });
    
    const token = res.data.data.token;
    console.log(`✅ Registration successful. Received JWT Token: ${token.substring(0, 15)}...`);
    
    // 2. Test Phase 1 & 2 (Math Engine & DB) via authenticated route
    console.log("\n🔍 Verifying Phase 1 & 2: Calculation Engine and DB Persistence...");
    console.log("➡️ Making calculation request to /api/v1/carbon/calculate...");
    
    res = await axios.post('http://localhost:4000/api/v1/carbon/calculate', {
      provider: "AWS",
      region: "us-east-1",
      instanceType: "t3.medium",
      instanceCount: 2,
      hoursPerMonth: 730,
      cpuUtilization: 0.5,
      storageGb: 100,
      ramGb: 4
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log("✅ Calculation successful!");
    console.log("📊 Results:");
    console.log(JSON.stringify(res.data.data, null, 2));
    
    console.log("\n🔍 Verifying History (DB Persistence)...");
    res = await axios.get('http://localhost:4000/api/v1/carbon/history', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log(`✅ History retrieved successfully. Saved calculations count: ${res.data.data.length}`);
    if (res.data.data.length > 0) {
      console.log(`Recent Calculation ID: ${res.data.data[0].id}`);
    }
    
    console.log("\n🎉 ALL 3 PHASES VERIFIED SUCCESSFULLY!");
  } catch (error) {
    console.error("❌ Verification failed!");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

verify();
