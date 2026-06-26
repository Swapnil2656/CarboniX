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
        await fs.writeFile(CONFIG_PATH, JSON.stringify({ apiKey: options.key }, null, 2));
        console.log(pc.green('✅ Project linked successfully!'));
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
      const telemetryPayload = {
        projectName,
        instanceType: 't3.medium', // typical node environment
        provider: 'aws',
        region: 'us-east-1',
        cpuUtilization: Math.random() * 0.4 + 0.1, // simulated CPU usage 10-50%
        storageGb: 20
      };

      console.log(pc.yellow(`☁️  Uploading telemetry to CarboniX edge (project: ${projectName})...`));
      
      const res = await axios.post(`${API_URL}/carbon/telemetry/ingest`, telemetryPayload, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        console.log(pc.green('🚀 Deployment telemetry successful!'));
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
