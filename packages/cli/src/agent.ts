#!/usr/bin/env node
import os from 'os';
import fs from 'fs';

/**
 * CarboniX Local Agent (Tier 3)
 * 
 * Runs on a user's VPS/Docker container/Bare-metal server.
 * Collects telemetry and reports it directly to the CarboniX API using a scoped API Key.
 * Can optionally execute local scripts if configured to do so.
 */

const API_KEY = process.env.CARBONIX_API_KEY;
const API_URL = process.env.CARBONIX_API_URL || 'http://localhost:4000/api/v1';
const REPORT_INTERVAL_MS = parseInt(process.env.CARBONIX_INTERVAL || '3600000', 10); // Default 1 hour

if (!API_KEY) {
  console.error('[CarboniX Agent] ERROR: CARBONIX_API_KEY environment variable is required.');
  process.exit(1);
}

// ─── Telemetry Collection ───────────────────────────────────────────────────

function getCpuUtilization(): number {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      totalTick += (cpu.times as any)[type];
    }
    totalIdle += cpu.times.idle;
  }

  const idlePercent = totalIdle / totalTick;
  return 1 - idlePercent;
}

function getMemoryUtilization(): number {
  const total = os.totalmem();
  const free = os.freemem();
  return (total - free) / total;
}

async function reportTelemetry() {
  const cpu = getCpuUtilization();
  const mem = getMemoryUtilization();

  const payload = {
    instanceId: os.hostname(),
    instanceType: process.env.CARBONIX_INSTANCE_TYPE || 'self-hosted',
    provider: process.env.CARBONIX_PROVIDER || 'UNKNOWN',
    region: process.env.CARBONIX_REGION || 'unknown',
    cpuUtilization: cpu,
    memoryUtilization: mem,
  };

  try {
    const res = await fetch(`${API_URL}/agent/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      console.log(`[CarboniX Agent] Telemetry reported successfully. CPU: ${(cpu * 100).toFixed(1)}%, Mem: ${(mem * 100).toFixed(1)}%`);
    } else {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      console.error(`[CarboniX Agent] Failed to report telemetry: ${res.status} ${err.error || err}`);
    }
  } catch (e: any) {
    console.error(`[CarboniX Agent] Exception reporting telemetry: ${e.message}`);
  }
}

// ─── Execution ──────────────────────────────────────────────────────────────

console.log(`[CarboniX Agent] Starting agent for ${os.hostname()}...`);
console.log(`[CarboniX Agent] Reporting every ${REPORT_INTERVAL_MS / 1000} seconds to ${API_URL}`);

// Initial report
reportTelemetry();

// Schedule
setInterval(reportTelemetry, REPORT_INTERVAL_MS);
