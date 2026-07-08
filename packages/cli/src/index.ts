#!/usr/bin/env node

import { Command } from 'commander';
import pc from 'picocolors';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();
const CONFIG_PATH = path.join(process.cwd(), '.carbonixrc');
const API_URL = process.env.CARBONIX_API_URL || 'http://localhost:4000/api/v1';

program
  .name('carbonix')
  .description('CarboniX Command Line Interface')
  .version('0.1.0');

// init command
program
  .command('init')
  .description('Initialize a new CarboniX deployment from your project')
  .option('-k, --key <key>', 'Your project API key')
  .action(async (options) => {
    if (!options.key) {
      console.error(pc.red('Error: --key is required to initialize a project.'));
      process.exit(1);
    }
    
    console.log(pc.cyan(`\nVerifying API Key...`));
    
    try {
      const res = await axios.post(`${API_URL}/carbon/verify-key`, {}, {
        headers: {
          'Authorization': `Bearer ${options.key}`
        }
      });
      
      if (res.data.success) {
        // Simple provider detection
        let provider = 'aws';
        if (process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT) provider = 'gcp';
        if (process.env.ARM_REGION || process.env.AZURE_REGION) provider = 'azure';
        if (process.env.VERCEL || process.env.VERCEL_ENV) provider = 'vercel';
        if (process.env.NETLIFY) provider = 'netlify';
        if (process.env.RAILWAY_ENVIRONMENT) provider = 'railway';
        if (process.env.RENDER) provider = 'render';
        
        // Let user fallback to 'other' manually in config later if they want
        
        let region = process.env.VERCEL_REGION || process.env.AWS_REGION || process.env.GOOGLE_CLOUD_REGION || process.env.ARM_REGION || 'us-east-1';

        const configPayload = { 
          apiKey: options.key,
          provider,
          region
        };

        await fs.writeFile(CONFIG_PATH, JSON.stringify(configPayload, null, 2));
        console.log(pc.green('✅ Project linked successfully!'));
        console.log(pc.gray(`Detected environment: ${provider.toUpperCase()} (${region})`));
        console.log(pc.gray('You can now use `carbonix app deploy` to deploy your changes.\n'));
      } else {
        console.error(pc.red('Error: API Key verification failed.'));
      }
    } catch (err: any) {
      console.error(pc.red(`Error connecting to CarboniX: ${err.response?.data?.error || err.message}`));
    }
  });

// auth login command
const authCmd = program.command('auth').description('Authentication commands');
authCmd
  .command('login')
  .description('Log into your CarboniX account')
  .action(() => {
    console.log(pc.cyan('\nTo authenticate, please visit your dashboard and generate an API key:'));
    console.log(pc.white('http://localhost:3000/admin/dashboard\n'));
    console.log(pc.gray('Then run: carbonix init --key <your-api-key>\n'));
  });

// app deploy command
const appCmd = program.command('app').description('App management commands');

appCmd
  .command('analyze')
  .description('Analyze local codebase and get Agentic AI region recommendations without deploying')
  .option('-p, --project <project>', 'Target project name')
  .action(async (options) => {
    try {
      // Read config
      let config: any = {};
      try {
        const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
        config = JSON.parse(configData);
      } catch (e) {
        console.error(pc.red('Error: Project not initialized. Run `carbonix init --key <your-api-key>` first.'));
        process.exit(1);
      }

      if (!config.apiKey) {
        console.error(pc.red('Error: API Key not found in .carbonixrc.'));
        process.exit(1);
      }

      console.log(pc.cyan(`\n🔍 CarboniX Agentic AI: Analyzing Local Environment...`));
      
      let currentRegion = config.region || 'us-east-1';
      let currentProvider = config.provider || 'aws';

      const baseTelemetry = {
        projectName: options.project || 'local-analysis',
        instanceType: 't3.medium',
        provider: currentProvider,
        region: currentRegion,
        cpuUtilization: 0.2, // typical baseline
        storageGb: 20
      };

      try {
        const recRes = await axios.post(`${API_URL}/carbon/recommend`, baseTelemetry, {
          headers: {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (recRes.data.success) {
          if (recRes.data.data.recommended) {
            const rec = recRes.data.data.recommended;
            console.log(pc.yellow(`\n⚠️  Optimization Found!`));
            console.log(pc.white(`Current Target : ${currentProvider.toUpperCase()} (${currentRegion})`));
            console.log(pc.white(`Current Carbon : ${(rec.co2KgMonth + rec.savingsKg).toFixed(2)} kg CO2e / month`));
            console.log(pc.green(`Recommended    : ${currentProvider.toUpperCase()} (${rec.region})`));
            console.log(pc.green(`New Carbon     : ${rec.co2KgMonth.toFixed(2)} kg CO2e / month`));
            console.log(pc.cyan(`\n✨ Potential Savings: ~${Math.round(rec.reductionPercent)}% carbon reduction (${rec.savingsKg.toFixed(2)} kg)`));
            
            console.log(pc.gray(`\nRun \`carbonix app deploy\` and the Agentic AI will automatically apply this optimization!`));
          } else {
            console.log(pc.green(`\n✓ Your environment is already fully optimized!`));
            console.log(pc.gray(`Current Target : ${currentProvider.toUpperCase()} (${currentRegion})`));
            console.log(pc.gray(`You are running in the greenest available region for your provider.`));
          }
        }
      } catch (e: any) {
        console.error(pc.red(`Error fetching analysis: ${e.message}`));
      }
    } catch (err: any) {
      console.error(pc.red(`Error: ${err.message}`));
    }
  });

appCmd
  .command('deploy')
  .description('Deploy the current codebase and send telemetry to CarboniX')
  .option('-p, --project <project>', 'Target project name')
  .action(async (options) => {
    try {
      // Read config
      let config: any = {};
      try {
        const configData = await fs.readFile(CONFIG_PATH, 'utf-8');
        config = JSON.parse(configData);
      } catch (e) {
        console.error(pc.red('Error: Project not initialized. Run `carbonix init --key <your-api-key>` first.'));
        process.exit(1);
      }

      if (!config.apiKey) {
        console.error(pc.red('Error: API Key not found in .carbonixrc.'));
        process.exit(1);
      }

      // Try to determine project name from package.json
      let projectName = options.project;
      if (!projectName) {
        try {
          const pkgData = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf-8');
          projectName = JSON.parse(pkgData).name;
        } catch (e) {
          projectName = 'unknown-project';
        }
      }

      console.log(pc.cyan(`\n📦 Packaging codebase for deployment...`));
      
      // Simulate reading telemetry data from the local environment
      let currentRegion = config.region || 'us-east-1';
      let currentProvider = config.provider || 'aws';

      const baseTelemetry = {
        projectName,
        instanceType: 't3.medium', // typical node environment
        provider: currentProvider,
        region: currentRegion,
        cpuUtilization: Math.random() * 0.4 + 0.1, // simulated CPU usage 10-50%
        storageGb: 20
      };

      console.log(pc.cyan(`\n🤖 Agentic AI analyzing deployment plan...`));
      
      try {
        const recRes = await axios.post(`${API_URL}/carbon/recommend`, baseTelemetry, {
          headers: {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (recRes.data.success && recRes.data.data.recommended) {
          const rec = recRes.data.data.recommended;
          if (rec.reductionPercent > 10 && rec.region !== currentRegion) {
            console.log(pc.green(`\n✨ Agentic AI Intercepting Deployment ✨`));
            console.log(pc.green(`Switching region from ${currentRegion} to ${rec.region} (within ${currentProvider.toUpperCase()})`));
            console.log(pc.gray(`Expected savings: ~${Math.round(rec.reductionPercent)}% carbon reduction`));
            
            // Rewrite the region internally for telemetry
            currentRegion = rec.region;
            baseTelemetry.region = currentRegion;

            // PAAS INTERCEPTION: Physically rewrite configuration files if they exist
            if (currentProvider.toLowerCase() === 'vercel') {
              try {
                const vercelConfigPath = path.join(process.cwd(), 'vercel.json');
                const vercelData = await fs.readFile(vercelConfigPath, 'utf-8');
                const vercelJson = JSON.parse(vercelData);
                
                // Only rewrite if regions is an array (standard vercel.json format)
                if (vercelJson.regions && Array.isArray(vercelJson.regions)) {
                  vercelJson.regions = [rec.region];
                  await fs.writeFile(vercelConfigPath, JSON.stringify(vercelJson, null, 2));
                  console.log(pc.yellow(`📝 Agentic AI automatically updated vercel.json to use region: ${rec.region}`));
                }
              } catch (err: any) {
                // Ignore if vercel.json doesn't exist or isn't parseable, we just skip file rewriting
                console.log(pc.gray(`(Note: No local vercel.json found to rewrite, skipping file update)`));
              }
            }
          } else {
            console.log(pc.gray(`✓ Deployment plan optimized. Staying in ${currentRegion}.`));
          }
        }
      } catch (e: any) {
        console.log(pc.gray(`Could not fetch AI recommendation, proceeding with default region...`));
      }

      console.log(pc.yellow(`\n☁️  Deploying and uploading telemetry to CarboniX edge (project: ${projectName}, region: ${currentRegion})...`));
      
      const res = await axios.post(`${API_URL}/carbon/telemetry/ingest`, baseTelemetry, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        console.log(pc.green('🚀 Deployment successful!'));
        console.log(pc.gray(`Carbon calculation generated: ${res.data.data.carbonKg.toFixed(2)} kg CO2e`));
      } else {
        console.error(pc.red('Error: Deployment failed.'));
      }
    } catch (err: any) {
      console.error(pc.red(`Error connecting to CarboniX: ${err.response?.data?.error || err.message}`));
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
