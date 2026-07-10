#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");
var import_picocolors = __toESM(require("picocolors"));
var import_axios = __toESM(require("axios"));
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var program = new import_commander.Command();
var CONFIG_PATH = import_path.default.join(process.cwd(), ".carbonixrc");
var API_URL = process.env.CARBONIX_API_URL || "http://localhost:4000/api/v1";
program.name("carbonix").description("CarboniX Command Line Interface").version("0.1.0");
program.command("init").description("Initialize a new CarboniX deployment from your project").option("-k, --key <key>", "Your project API key").action(async (options) => {
  if (!options.key) {
    console.error(import_picocolors.default.red("Error: --key is required to initialize a project."));
    process.exit(1);
  }
  console.log(import_picocolors.default.cyan(`
Verifying API Key...`));
  try {
    const res = await import_axios.default.post(`${API_URL}/carbon/verify-key`, {}, {
      headers: {
        "Authorization": `Bearer ${options.key}`
      }
    });
    if (res.data.success) {
      let provider = "aws";
      if (process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT) provider = "gcp";
      if (process.env.ARM_REGION || process.env.AZURE_REGION) provider = "azure";
      if (process.env.VERCEL || process.env.VERCEL_ENV) provider = "vercel";
      if (process.env.NETLIFY) provider = "netlify";
      if (process.env.RAILWAY_ENVIRONMENT) provider = "railway";
      if (process.env.RENDER) provider = "render";
      let region = process.env.VERCEL_REGION || process.env.AWS_REGION || process.env.GOOGLE_CLOUD_REGION || process.env.ARM_REGION || "us-east-1";
      const configPayload = {
        apiKey: options.key,
        provider,
        region
      };
      await import_promises.default.writeFile(CONFIG_PATH, JSON.stringify(configPayload, null, 2));
      console.log(import_picocolors.default.green("\u2705 Project linked successfully!"));
      console.log(import_picocolors.default.gray(`Detected environment: ${provider.toUpperCase()} (${region})`));
      console.log(import_picocolors.default.gray("You can now use `carbonix app deploy` to deploy your changes.\n"));
    } else {
      console.error(import_picocolors.default.red("Error: API Key verification failed."));
    }
  } catch (err) {
    console.error(import_picocolors.default.red(`Error connecting to CarboniX: ${err.response?.data?.error || err.message}`));
  }
});
var authCmd = program.command("auth").description("Authentication commands");
authCmd.command("login").description("Log into your CarboniX account").action(() => {
  console.log(import_picocolors.default.cyan("\nTo authenticate, please visit your dashboard and generate an API key:"));
  console.log(import_picocolors.default.white("http://localhost:3000/admin/dashboard\n"));
  console.log(import_picocolors.default.gray("Then run: carbonix init --key <your-api-key>\n"));
});
var appCmd = program.command("app").description("App management commands");
appCmd.command("analyze").description("Analyze local codebase and get Agentic AI region recommendations without deploying").option("-p, --project <project>", "Target project name").action(async (options) => {
  try {
    let config = {};
    try {
      const configData = await import_promises.default.readFile(CONFIG_PATH, "utf-8");
      config = JSON.parse(configData);
    } catch (e) {
      console.error(import_picocolors.default.red("Error: Project not initialized. Run `carbonix init --key <your-api-key>` first."));
      process.exit(1);
    }
    if (!config.apiKey) {
      console.error(import_picocolors.default.red("Error: API Key not found in .carbonixrc."));
      process.exit(1);
    }
    console.log(import_picocolors.default.cyan(`
\u{1F50D} CarboniX Agentic AI: Analyzing Local Environment...`));
    let currentRegion = config.region || "us-east-1";
    let currentProvider = config.provider || "aws";
    const baseTelemetry = {
      projectName: options.project || "local-analysis",
      instanceType: "t3.medium",
      provider: currentProvider,
      region: currentRegion,
      cpuUtilization: 0.2,
      // typical baseline
      storageGb: 20
    };
    try {
      const recRes = await import_axios.default.post(`${API_URL}/carbon/recommend`, baseTelemetry, {
        headers: {
          "Authorization": `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        }
      });
      if (recRes.data.success) {
        if (recRes.data.data.recommended) {
          const rec = recRes.data.data.recommended;
          console.log(import_picocolors.default.yellow(`
\u26A0\uFE0F  Optimization Found!`));
          console.log(import_picocolors.default.white(`Current Target : ${currentProvider.toUpperCase()} (${currentRegion})`));
          console.log(import_picocolors.default.white(`Current Carbon : ${(rec.co2KgMonth + rec.savingsKg).toFixed(2)} kg CO2e / month`));
          console.log(import_picocolors.default.green(`Recommended    : ${currentProvider.toUpperCase()} (${rec.region})`));
          console.log(import_picocolors.default.green(`New Carbon     : ${rec.co2KgMonth.toFixed(2)} kg CO2e / month`));
          console.log(import_picocolors.default.cyan(`
\u2728 Potential Savings: ~${Math.round(rec.reductionPercent)}% carbon reduction (${rec.savingsKg.toFixed(2)} kg)`));
          console.log(import_picocolors.default.gray(`
Run \`carbonix app deploy\` and the Agentic AI will automatically apply this optimization!`));
        } else {
          console.log(import_picocolors.default.green(`
\u2713 Your environment is already fully optimized!`));
          console.log(import_picocolors.default.gray(`Current Target : ${currentProvider.toUpperCase()} (${currentRegion})`));
          console.log(import_picocolors.default.gray(`You are running in the greenest available region for your provider.`));
        }
      }
    } catch (e) {
      console.error(import_picocolors.default.red(`Error fetching analysis: ${e.message}`));
    }
  } catch (err) {
    console.error(import_picocolors.default.red(`Error: ${err.message}`));
  }
});
appCmd.command("deploy").description("Deploy the current codebase and send telemetry to CarboniX").option("-p, --project <project>", "Target project name").action(async (options) => {
  try {
    let config = {};
    try {
      const configData = await import_promises.default.readFile(CONFIG_PATH, "utf-8");
      config = JSON.parse(configData);
    } catch (e) {
      console.error(import_picocolors.default.red("Error: Project not initialized. Run `carbonix init --key <your-api-key>` first."));
      process.exit(1);
    }
    if (!config.apiKey) {
      console.error(import_picocolors.default.red("Error: API Key not found in .carbonixrc."));
      process.exit(1);
    }
    let projectName = options.project;
    if (!projectName) {
      try {
        const pkgData = await import_promises.default.readFile(import_path.default.join(process.cwd(), "package.json"), "utf-8");
        projectName = JSON.parse(pkgData).name;
      } catch (e) {
        projectName = "unknown-project";
      }
    }
    console.log(import_picocolors.default.cyan(`
\u{1F4E6} Packaging codebase for deployment...`));
    let currentRegion = config.region || "us-east-1";
    let currentProvider = config.provider || "aws";
    const baseTelemetry = {
      projectName,
      instanceType: "t3.medium",
      // typical node environment
      provider: currentProvider,
      region: currentRegion,
      cpuUtilization: Math.random() * 0.4 + 0.1,
      // simulated CPU usage 10-50%
      storageGb: 20
    };
    console.log(import_picocolors.default.cyan(`
\u{1F916} Agentic AI analyzing deployment plan...`));
    try {
      const recRes = await import_axios.default.post(`${API_URL}/carbon/recommend`, baseTelemetry, {
        headers: {
          "Authorization": `Bearer ${config.apiKey}`,
          "Content-Type": "application/json"
        }
      });
      if (recRes.data.success && recRes.data.data.recommended) {
        const rec = recRes.data.data.recommended;
        if (rec.reductionPercent > 10 && rec.region !== currentRegion) {
          console.log(import_picocolors.default.green(`
\u2728 Agentic AI Intercepting Deployment \u2728`));
          console.log(import_picocolors.default.green(`Switching region from ${currentRegion} to ${rec.region} (within ${currentProvider.toUpperCase()})`));
          console.log(import_picocolors.default.gray(`Expected savings: ~${Math.round(rec.reductionPercent)}% carbon reduction`));
          currentRegion = rec.region;
          baseTelemetry.region = currentRegion;
          if (currentProvider.toLowerCase() === "vercel") {
            try {
              const vercelConfigPath = import_path.default.join(process.cwd(), "vercel.json");
              const vercelData = await import_promises.default.readFile(vercelConfigPath, "utf-8");
              const vercelJson = JSON.parse(vercelData);
              if (vercelJson.regions && Array.isArray(vercelJson.regions)) {
                vercelJson.regions = [rec.region];
                await import_promises.default.writeFile(vercelConfigPath, JSON.stringify(vercelJson, null, 2));
                console.log(import_picocolors.default.yellow(`\u{1F4DD} Agentic AI automatically updated vercel.json to use region: ${rec.region}`));
              }
            } catch (err) {
              console.log(import_picocolors.default.gray(`(Note: No local vercel.json found to rewrite, skipping file update)`));
            }
          }
        } else {
          console.log(import_picocolors.default.gray(`\u2713 Deployment plan optimized. Staying in ${currentRegion}.`));
        }
      }
    } catch (e) {
      console.log(import_picocolors.default.gray(`Could not fetch AI recommendation, proceeding with default region...`));
    }
    console.log(import_picocolors.default.yellow(`
\u2601\uFE0F  Deploying and uploading telemetry to CarboniX edge (project: ${projectName}, region: ${currentRegion})...`));
    const res = await import_axios.default.post(`${API_URL}/carbon/telemetry/ingest`, baseTelemetry, {
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      }
    });
    if (res.data.success) {
      console.log(import_picocolors.default.green("\u{1F680} Deployment successful!"));
      console.log(import_picocolors.default.gray(`Carbon calculation generated: ${res.data.data.carbonKg.toFixed(2)} kg CO2e`));
    } else {
      console.error(import_picocolors.default.red("Error: Deployment failed."));
    }
  } catch (err) {
    console.error(import_picocolors.default.red(`Error connecting to CarboniX: ${err.response?.data?.error || err.message}`));
  }
});
var teamCmd = program.command("team").description("Team management commands");
teamCmd.command("sync").description("Automatically discover and sync codebase contributors to CarboniX").action(async () => {
  try {
    let config = {};
    try {
      const configData = await import_promises.default.readFile(CONFIG_PATH, "utf-8");
      config = JSON.parse(configData);
    } catch (e) {
      console.error(import_picocolors.default.red("Error: Project not initialized. Run `carbonix init --key <your-api-key>` first."));
      process.exit(1);
    }
    if (!config.apiKey) {
      console.error(import_picocolors.default.red("Error: API Key not found in .carbonixrc."));
      process.exit(1);
    }
    let projectName = "unknown-project";
    try {
      const pkgData = await import_promises.default.readFile(import_path.default.join(process.cwd(), "package.json"), "utf-8");
      projectName = JSON.parse(pkgData).name;
    } catch (e) {
    }
    console.log(import_picocolors.default.cyan(`
\u{1F50D} Analyzing local git history for contributors...`));
    const { execSync } = require("child_process");
    let gitOutput = "";
    try {
      gitOutput = execSync('git log --format="%an|%ae" | sort -u', { encoding: "utf-8" });
    } catch (e) {
      console.log(import_picocolors.default.yellow(`Warning: Not a git repository or git not installed. Could not extract authors.`));
      process.exit(0);
    }
    const rawAuthors = gitOutput.split("\n").filter((l) => l.trim() !== "");
    const members = rawAuthors.map((line) => {
      const [name, email] = line.split("|");
      return { name, email };
    }).filter((m) => {
      const email = m.email?.toLowerCase() || "";
      return m.name && email && !email.includes("dependabot") && !email.includes("bot@");
    });
    if (members.length === 0) {
      console.log(import_picocolors.default.yellow(`No human contributors found.`));
      return;
    }
    console.log(import_picocolors.default.cyan(`Found ${members.length} contributors. Syncing to CarboniX...`));
    const res = await import_axios.default.post(`${API_URL}/admin/users/sync`, { members, projectName }, {
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      }
    });
    if (res.data.success) {
      console.log(import_picocolors.default.green(`\u2705 Successfully synced ${res.data.count} team members!`));
      console.log(import_picocolors.default.gray(`Visit your CarboniX dashboard to view their emission ratings.`));
    } else {
      console.error(import_picocolors.default.red("Error: Sync failed."));
    }
  } catch (err) {
    console.error(import_picocolors.default.red(`Error connecting to CarboniX: ${err.response?.data?.error || err.message}`));
  }
});
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
