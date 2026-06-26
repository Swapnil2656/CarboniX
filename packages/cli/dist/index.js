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
  var _a, _b;
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
      await import_promises.default.writeFile(CONFIG_PATH, JSON.stringify({ apiKey: options.key }, null, 2));
      console.log(import_picocolors.default.green("\u2705 Project linked successfully!"));
      console.log(import_picocolors.default.gray("You can now use `carbonix app deploy` to deploy your changes.\n"));
    } else {
      console.error(import_picocolors.default.red("Error: API Key verification failed."));
    }
  } catch (err) {
    console.error(import_picocolors.default.red(`Error connecting to CarboniX: ${((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || err.message}`));
  }
});
var authCmd = program.command("auth").description("Authentication commands");
authCmd.command("login").description("Log into your CarboniX account").action(() => {
  console.log(import_picocolors.default.cyan("\nTo authenticate, please visit your dashboard and generate an API key:"));
  console.log(import_picocolors.default.white("http://localhost:3000/admin/dashboard\n"));
  console.log(import_picocolors.default.gray("Then run: carbonix init --key <your-api-key>\n"));
});
var appCmd = program.command("app").description("App management commands");
appCmd.command("deploy").description("Deploy the current codebase and send telemetry to CarboniX").option("-p, --project <project>", "Target project name").action(async (options) => {
  var _a, _b;
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
    const telemetryPayload = {
      projectName,
      instanceType: "t3.medium",
      // typical node environment
      provider: "aws",
      region: "us-east-1",
      cpuUtilization: Math.random() * 0.4 + 0.1,
      // simulated CPU usage 10-50%
      storageGb: 20
    };
    console.log(import_picocolors.default.yellow(`\u2601\uFE0F  Uploading telemetry to CarboniX edge (project: ${projectName})...`));
    const res = await import_axios.default.post(`${API_URL}/carbon/telemetry/ingest`, telemetryPayload, {
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      }
    });
    if (res.data.success) {
      console.log(import_picocolors.default.green("\u{1F680} Deployment telemetry successful!"));
      console.log(import_picocolors.default.gray(`Carbon calculation generated: ${res.data.data.carbonKg.toFixed(2)} kg CO2e`));
    } else {
      console.error(import_picocolors.default.red("Error: Deployment failed."));
    }
  } catch (err) {
    console.error(import_picocolors.default.red(`Error connecting to CarboniX: ${((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || err.message}`));
  }
});
program.parse(process.argv);
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
