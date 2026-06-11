# CARBONIX — COMPLETE MASTER DOCUMENT
### For LLM-Assisted Development

> **Version:** 3.0 — Final Consolidated  
> **Date:** June 11, 2026  
> **Team:** Swapnil Sen — Team Carbonix  
> **Hackathon:** HackHazards '26 (Namespace Community)  
> **Deadline:** June 30, 2026  
> **Tracks:** Expo Track + Climate & Sustainability + Infrastructure & Smart Systems + Developer Tools  

---

## TABLE OF CONTENTS

1. [Project Identity & Elevator Pitch](#1-project-identity--elevator-pitch)
2. [The Real-World Problem](#2-the-real-world-problem)
3. [Competitive Landscape & Differentiation](#3-competitive-landscape--differentiation)
4. [The Carbon Calculation Engine](#4-the-carbon-calculation-engine)
5. [Three Mechanisms That Actually Reduce Carbon](#5-three-mechanisms-that-actually-reduce-carbon)
6. [What Carbonix Actually Is — Three Layers](#6-what-carbonix-actually-is--three-layers)
7. [Agentic Architecture](#7-agentic-architecture)
8. [CI/CD Carbon Gate Pipeline](#8-cicd-carbon-gate-pipeline)
9. [Technology Stack](#9-technology-stack)
10. [Monorepo Structure](#10-monorepo-structure)
11. [Database Schema](#11-database-schema)
12. [Backend API Architecture](#12-backend-api-architecture)
13. [Mobile Application](#13-mobile-application)
14. [Website & Admin Panel](#14-website--admin-panel)
15. [SDK Package](#15-sdk-package)
16. [UI/UX Design System](#16-uiux-design-system)
17. [Application Flow](#17-application-flow)
18. [Implementation Plan](#18-implementation-plan)
19. [Demo Flow for Judges](#19-demo-flow-for-judges)
20. [Environment Variables](#20-environment-variables)
21. [Future Scope](#21-future-scope)

---

## 1. PROJECT IDENTITY & ELEVATOR PITCH

### 1.1 One-Line Description

**Carbonix** is a developer-first carbon intelligence platform that makes cloud infrastructure emissions measurable, reportable, and reducible — exposed as a programmable API that any developer can integrate in 5 lines of code.

### 1.2 The Tagline

> *"Infrastructure has a financial cost and a carbon cost. Carbonix makes both measurable."*

### 1.3 The Postman Analogy

Carbonix is **Postman for sustainability APIs** — a mobile-first developer tool that tells you the carbon cost of your cloud infrastructure and exposes it as an open API any developer can build on.

### 1.4 The Three-Layer Mental Model

```
Layer 3 → Expo Mobile App       (The showcase: what judges see)
Layer 2 → carbonix npm SDK      (The product: what developers use)
Layer 1 → Node.js + Express API (The engine: where the math happens)
```

The Expo app is not the underlying product. It is the SDK's live demo environment. The product is the API + SDK. The app proves it works.

---

## 2. THE REAL-WORLD PROBLEM

### 2.1 The Problem Statement (Final Version — Use This Verbatim)

> India's $250B IT services sector manages cloud infrastructure for hundreds of global enterprise clients — clients who now face mandatory Scope 3 carbon disclosure under the EU's CSRD (Corporate Sustainability Reporting Directive) and similar frameworks. Yet there is no automated pipeline to produce per-client cloud emission data. Indian IT companies are manually computing these numbers with spreadsheets and sustainability consultants, months after the fact. Meanwhile, every Indian developer defaults to `ap-south-1` — one of the world's highest-carbon cloud regions — with no tooling that surfaces this decision before infrastructure is deployed. Carbonix shifts carbon intelligence left: from quarterly reports to pre-deployment gates, from spreadsheet audits to automated compliance pipelines, built specifically for the Indian cloud ecosystem.

### 2.2 The Four Supporting Facts

**Fact 1 — The ap-south-1 Default Problem:**
Every Indian startup defaults to `ap-south-1` (Mumbai) because it is closest. `ap-south-1` runs on India's coal-dominated electricity grid at approximately 750 gCO₂/kWh — one of the highest carbon intensities of any major cloud region on earth. This is the default choice for the fastest-growing cloud market in APAC. No tooling surfaces this problem.

**Fact 2 — The BRSR Mandate (India):**
India's SEBI-mandated BRSR (Business Responsibility and Sustainability Reporting) framework now requires top-1000 listed companies to disclose Scope 2 carbon emissions, which includes cloud and data center workloads. There is zero automated pipeline to get this data. Companies are hiring consultants who compute it manually from spreadsheets. The deadline is now.

**Fact 3 — The CSRD Supply Chain (Global):**
Under the EU's CSRD (effective 2024), European companies must report Scope 3 emissions — including emissions from their IT service providers. Indian companies like TCS, Infosys, Wipro, and HCL manage cloud infrastructure for hundreds of European enterprise clients. These Indian companies have no automated way to produce per-client cloud carbon data for CSRD compliance. Nobody has built tooling for this specific supply chain.

**Fact 4 — The Scale of Wasted Carbon:**
Studies show 30–40% of cloud resources are idle or over-provisioned. A VM running 24/7 at 5% CPU burns full idle power — energy wasted entirely. For Indian cloud workloads running on `ap-south-1`, this waste translates to significant and measurable carbon emissions.

### 2.3 The Key Paradigm Shift

Every existing tool answers: *"How much did we emit last month?"* — they are **retrospective**.

Carbonix answers: *"What are you about to emit, and can we stop it?"* — it is **prospective**.

The CI/CD gate is the proof point: a Terraform plan review that blocks a high-carbon deployment before it happens is fundamentally different from a monthly PDF report. You are not auditing the past — you are protecting the future.

### 2.4 Theme Alignment (HackHazards '26)

| Theme | Alignment |
| :--- | :--- |
| **02 — Climate & Sustainability** | Every feature directly measures or reduces cloud infrastructure carbon emissions |
| **06 — Infrastructure & Smart Systems** | Cloud infrastructure treated as large-scale system requiring real-time carbon monitoring — same as IoT dashboards or smart city systems |
| **10 — Developer Tools & Software Infrastructure** | An API + SDK that developers build on top of is pure software infrastructure |

---

## 3. COMPETITIVE LANDSCAPE & DIFFERENTIATION

### 3.1 Competitor Map

| Tool | What It Does | Why It Is Not Enough |
| :--- | :--- | :--- |
| **AWS Carbon Footprint Tool** | Monthly aggregate cloud emissions estimate | 3-month data lag, no API, aggregate only, AWS-only, no CI/CD integration |
| **Google Cloud Carbon Footprint** | GCP emissions reporting | GCP-only, no developer API for programmatic access |
| **Azure Emissions Impact Dashboard** | Azure emissions reporting | Azure-only, enterprise-focused, no real-time |
| **Cloud Carbon Footprint (ThoughtWorks OSS)** | Same calculation methodology as Carbonix | Self-hosted, complex multi-day setup, no npm SDK, no CI/CD integration, no Indian context |
| **Climatiq** | Carbon intelligence API, developer-focused | No CI/CD gate, no temporal shifting, no Indian market/BRSR focus, European-only |
| **Watershed / Persefoni** | Enterprise ESG platforms | $50k–$500k/year, not developer tools, not real-time, not API-first |
| **Electricity Maps** | Live grid intensity data API | Data source only — does not connect to cloud usage data |
| **Green Software Foundation Carbon Aware SDK** | Temporal shifting library | Library only, not a hosted service, no npm package, no CI/CD, no mobile app |

### 3.2 The Gap Carbonix Occupies

There is no tool that is simultaneously:
- An npm package (`npm install carbonix`) — 5-line integration
- Real-time, not months delayed
- Per-deployment granular, not just company-wide totals
- Embedded in CI/CD pipelines as a blocking gate
- Accessible without DevOps overhead or enterprise contracts
- Built specifically for the Indian cloud market (BRSR + CSRD supply chain)
- Includes temporal shifting as a developer API

### 3.3 Smart Build Strategy: Use Climatiq as Data Layer

Instead of rebuilding the carbon calculation engine from scratch, Carbonix uses Climatiq's free community API as one optional data source, and the open Cloud Carbon Footprint coefficient dataset as the primary data source. Carbonix adds the layers Climatiq does not have:

```javascript
// Climatiq handles: carbon calculation API
const emission = await climatiqClient.calculate({ ... })

// Carbonix adds what Climatiq does NOT have:
await carbonix.gate.evaluate(emission, budget)     // CI/CD gate
await carbonix.schedule(job, 'ap-south-1', 6)      // Temporal shifting
await carbonix.report.brsr(monthlyData)             // BRSR compliance
```

---

## 4. THE CARBON CALCULATION ENGINE

### 4.1 The Master Formula

```
Carbon Emissions (gCO₂) = Energy Consumed (kWh) × Grid Carbon Intensity (gCO₂/kWh)
```

Breaking down energy consumed:

```
Energy (kWh) = (CPU Energy + Memory Energy + Storage Energy) × PUE

CPU Energy    = CPU TDP (Watts) × utilization% × hours × instance_count / 1000
Memory Energy = RAM (GB) × 0.38 W/GB × hours × instance_count / 1000
Storage Energy = Disk (GB) × 0.0016 W/GB × hours × instance_count / 1000

PUE (Power Usage Effectiveness):
  → AWS average: 1.2
  → GCP average: 1.1
  → Azure average: 1.18
  → EU North data centers: 1.07 (Stockholm specifically)
```

### 4.2 Grid Carbon Intensity by Region (Static Seed Data)

| Region Code | Location | Grid Intensity (gCO₂/kWh) | Notes |
| :--- | :--- | :--- | :--- |
| `ap-south-1` | Mumbai, India | **750** | Coal-heavy Indian grid — highest of all major regions |
| `us-east-1` | Virginia, USA | 415 | Coal + gas heavy |
| `eu-west-1` | Ireland | 316 | Renewables mix |
| `ap-southeast-1` | Singapore | 408 | Mixed grid |
| `us-west-2` | Oregon, USA | 130 | Hydro-heavy |
| `eu-north-1` | Stockholm, Sweden | **8** | Near-100% hydro + nuclear — lowest of all major regions |
| `eu-central-1` | Frankfurt | 338 | Mixed European |

**The 98% stat:** The same workload in `ap-south-1` vs `eu-north-1` produces 98% more carbon. Same servers, same code, 50× more carbon just from region choice.

### 4.3 Live Example Calculation (4× t3.medium, AWS us-east-1, 40% CPU, 720h)

```
Instance: t3.medium
vCPU: 2, RAM: 4GB, TDP: 55W

CPU Energy    = (55W × 0.40 × 720h × 4 instances) / 1000 = 63.36 kWh
Memory Energy = (4GB × 0.000392 × 720h × 4 instances)    =  4.51 kWh
Storage (20GB)= (20GB × 0.0000002 × 720h × 4 instances)  =  0.01 kWh
Total IT Power = 67.88 kWh
With PUE 1.2   = 81.46 kWh/month

Virginia grid (415 gCO₂/kWh):   81.46 × 415  = 33,806 g = 33.8 kg CO₂/month
Stockholm grid (8 gCO₂/kWh):    81.46 × 8    =    652 g =  0.65 kg CO₂/month

Reduction by switching region: 98%
```

### 4.4 Data Sources (Open and Free)

| Data | Source | How to Use |
| :--- | :--- | :--- |
| CPU TDP + RAM coefficients per instance type | Cloud Carbon Footprint GitHub (`/packages/aws/src/lib/AWSInstanceTypes.json`) | Download once, ship as static JSON in `packages/core/data/` |
| Live grid carbon intensity | Electricity Maps API (free tier: 50 calls/day) | Cached per region, refreshed hourly |
| Static grid fallback values | Built into codebase | Used when Electricity Maps API call fails or rate limit hit |

### 4.5 Caching Strategy (Kills 95% of API Calls)

Grid intensity changes slowly. Cache aggressively:

```typescript
// Refresh every 1 hour maximum per region
// If Electricity Maps fails → use static fallback — never crash
// Cache structure: { zone: { value: number, timestamp: number } }
```

### 4.6 Rating Engine

```
CO₂ kg/month thresholds (admin-configurable via Remote Config):
LOW:      < 5 kg/month     → #50FA7B (Green)
MEDIUM:   5–20 kg/month    → #FFB86C (Orange)
HIGH:     20–50 kg/month   → #FF5555 (Red)
CRITICAL: > 50 kg/month    → #FF5555 pulsing (Red, animated)
```

### 4.7 Real-World Equivalents Engine

```
1 kg CO₂ = driving 4.3 km in average car
1 kg CO₂ = 121 smartphone full charges
1 kg CO₂ = streaming 600 hours of Netflix (4K)

→ Append equivalent string to every calculation result:
  "≈ driving 145 km" or "≈ charging your phone 2,590 times"
```

---

## 5. THREE MECHANISMS THAT ACTUALLY REDUCE CARBON

This section answers the mentor's challenge: **"Does it really reduce carbon?"**

### 5.1 Mechanism 1: Right-Sizing (Reduces Energy Consumed)

**What it is:** Detecting over-provisioned or idle cloud resources and recommending (or executing) downsizing.

**How it works:** Pull CloudWatch CPU/memory utilization over 30 days. If actual usage is consistently below 20% of provisioned capacity, flag the resource.

```
Example:
m5.xlarge   → 4 vCPU, 16GB RAM → running at 4% CPU
Recommendation: downgrade to t3.medium (2 vCPU, 4GB RAM)
Energy reduction: ~65%
Cost reduction: ~70%
Carbon reduction: ~65% — actual energy saved, not shifted
```

**Why this is real reduction:** You are consuming less electricity, period. 30–40% of enterprise cloud resources are idle or underutilized (verified industry stat). This is genuine, measurable carbon elimination.

### 5.2 Mechanism 2: Temporal Shifting (Same Energy, Cleaner Grid)

**What it is:** Delaying flexible workloads to run when the grid is powered by cleaner energy sources.

**How it works:** Grid carbon intensity varies by the hour. Solar peaks at midday in some regions, wind is unpredictable. For workloads that are flexible in time — ML training, database backups, batch processing, video transcoding, test suite runs, data pipeline jobs — you run them when the grid is cleanest, not when scheduled by default.

**The open-source foundation:** The Green Software Foundation's [Carbon Aware SDK](https://github.com/Green-Software-Foundation/carbon-aware-sdk) already implements this. Carbonix wraps it as a developer-friendly npm API. Google and Microsoft already use temporal shifting internally at scale. This is not experimental.

```typescript
// Before: runs ML job immediately
await runMLTraining()

// After: runs it when ap-south-1 grid is cleanest within 6 hours
await carbonix.schedule(runMLTraining, 'ap-south-1', { windowHours: 6 })
// → Carbonix checks Electricity Maps forecast
// → Finds that 2am grid = 540 gCO₂/kWh vs 9pm = 820 gCO₂/kWh
// → Delays job 5 hours → 34% carbon reduction
```

**What kinds of workloads can be shifted:**
- ML training jobs ✅
- Database backups ✅
- Batch processing ✅
- CI/CD pipeline runs ✅
- Data pipeline jobs ✅
- Dev/staging environment start times ✅

**What cannot be shifted:**
- Real-time production API servers ❌
- User-facing interactive applications ❌

### 5.3 Mechanism 3: Pre-Deployment Architecture Scanning (Prevents Emissions)

**What it is:** CI/CD gate that scans infrastructure code before deployment and blocks or warns about high-carbon architecture decisions.

**How it works:** On every PR that touches Terraform, Dockerfiles, or k8s manifests, Carbonix:
- Parses the infrastructure changes
- Calculates projected carbon delta for new resources
- Compares against configured budget threshold
- Posts a detailed comment on the PR
- Optionally blocks the merge if budget is exceeded

**What gets flagged:**
```
⚠️ api-worker: EC2 t3.large (always-on) — Lambda migration viable → 78% energy reduction
⚠️ Region: ap-south-1 — No data residency constraint detected → eu-north-1 available at 98% lower carbon
⚠️ dev-server: No auto-shutdown configured — Running 24/7 including weekends → save 29% carbon
⚠️ New instance: m5.2xlarge — No existing equivalent to compare utilization history
```

**Why this is the strongest mechanism:** The cheapest carbon is the carbon you never emit. Stopping a bad architecture decision before it deploys prevents months or years of emissions from that infrastructure.

### 5.4 Honest Position on Reduction

Carbonix does not promise universal carbon reduction. The honest positioning is:

- **For compliance teams:** Measurement and BRSR/CSRD reporting — guaranteed value regardless of reduction
- **For flexible workloads** (batch, ML, backups, dev environments): All three reduction mechanisms apply
- **For production servers with data residency constraints:** Measurement + right-sizing applies; temporal shifting may not apply

This is defensible. Every claim can be backed by real data and proven methodology.

---

## 6. WHAT CARBONIX ACTUALLY IS — THREE LAYERS

### Layer 1 — The Backend API

A Node.js + Express REST server with real endpoints. POST your infrastructure config and receive CO₂ data.

Core endpoints:
- `POST /api/v1/calculate` — Calculate emissions for one config
- `POST /api/v1/compare` — Compare all 3 providers simultaneously
- `POST /api/v1/recommend` — Get the greenest alternative deployment
- `GET /api/v1/history` — Paginated history of calculations
- `DELETE /api/v1/history/:id` — Delete a history entry
- `GET /api/v1/regions` — Reference data: all regions with grid intensities
- `GET /api/v1/instances` — Reference data: all instance types with TDP
- `GET /api/v1/providers` — Reference data: supported cloud providers
- `GET /api/v1/health` — Health check
- `GET /api/v1/docs` — Swagger/OpenAPI UI

Admin endpoints (JWT + RBAC protected):
- `GET /api/v1/admin/dashboard` — Overview stats
- `GET /api/v1/admin/analytics` — Charts data
- `GET/PUT /api/v1/admin/feature-flags` — Remote config for mobile app
- `GET/PUT /api/v1/admin/config` — Thresholds and recommendation strings
- `GET /api/v1/admin/users` — Mobile user management
- `POST /api/v1/admin/users/:id/ban` — Ban a user
- `CRUD /api/v1/admin/api-keys` — SDK key management
- `CRUD /api/v1/admin/team` — Admin team management
- `POST /api/v1/admin/notifications` — Send push broadcasts
- `GET /api/v1/admin/audit` — Audit log

### Layer 2 — The SDK (npm package: `carbonix`)

A JavaScript/TypeScript package wrapping the API. Developers `npm install carbonix` and get a CO₂ number in 5 lines without knowing anything about the carbon math underneath.

```typescript
import { Carbonix } from 'carbonix'

const sdk = new Carbonix({ apiKey: 'your-key' })

const result = await sdk.calculateCarbon({
  provider: 'aws',
  region: 'us-east-1',
  instanceType: 't3.medium',
  count: 4,
  hoursPerMonth: 720
})

console.log(result.co2_kg_month)   // → 33.8
console.log(result.rating)         // → "HIGH"
console.log(result.recommendation) // → "Switch to eu-north-1 to reduce by ~98%"
```

Goal: Stripe/Supabase level developer experience. Minimal setup, strong TypeScript types, Promise-based API.

### Layer 3 — The Expo Mobile App

A touch-optimized developer console — like Postman but built in Expo React Native. You build API requests inside the app, fire them at the API, and visualize the results with interactive charts. This is what judges see and interact with on demo day.

**Key mental model:** The mobile app is the SDK's live demo environment, not the core product.

---

## 7. AGENTIC ARCHITECTURE

### 7.1 Why Agentic

The mobile app is the **command center** for the agent system — not a passive dashboard. Agentic means the system acts on carbon data, not just reports it.

| Platform | Role |
| :--- | :--- |
| SDK + API | Developers integrate carbon tracking |
| CI/CD Gate | Automated — no UI needed |
| Web Dashboard | Deep analysis, BRSR generation, agent config |
| **Mobile App** | Real-time alerts + one-tap agent approvals on the go |

### 7.2 The Four Agents

#### Agent 1: Collector Agent
- **Trigger:** Hourly cron job
- **Input:** Cloud provider credentials (AWS CloudWatch API)
- **Actions:** Pulls CPU utilization, memory usage, network I/O per instance via CloudWatch
- **Output:** Raw emission records per instance (cpuUtil, carbonKg, timestamp)
- **Tech:** `@aws-sdk/client-cloudwatch`, core calculation engine

```typescript
// packages/agents/src/collector.ts
// Runs every hour via cron.schedule('0 * * * *', ...)
// Returns EmissionRecord[]
```

#### Agent 2: Analyst Agent (LLM-powered)
- **Trigger:** After each Collector Agent run
- **Input:** EmissionRecord[] from Collector
- **Actions:**
  - Detects idle instances (< 5% CPU for 30 days)
  - Detects over-provisioned instances (< 20% CPU)
  - Calls Claude API (`claude-sonnet-4-20250514`) to generate natural language recommendations
- **Output:** `{ idleInstances[], oversizedInstances[], recommendations: string[], totalKg }`
- **Claude API usage:** System prompt instructs Claude to return ONLY a JSON array of recommendations. No markdown, no preamble.

#### Agent 3: CI/CD Gate Agent
- **Trigger:** GitHub Actions PR event (paths: `*.tf`, `Dockerfile`, `*.yaml`, `k8s/**`)
- **Input:** Git diff of changed infrastructure files
- **Actions:**
  - Parses Terraform resources (regex on `aws_instance` blocks)
  - Calculates projected carbon delta per new resource
  - Generates formatted PR comment (markdown table with region, grid intensity, carbon/day)
  - Returns `{ passed: boolean, deltaKg: number, comment: string }`
- **Output:** PR comment posted via GitHub API + pass/fail check

#### Agent 4: Reporter Agent
- **Trigger:** Monthly cron (first day of month) or on-demand from mobile
- **Input:** Aggregated monthly EmissionRecord[] from database
- **Actions:** Structures data into BRSR Scope 2 format
- **Output:** JSON report (scope2_emissions_kg, breakdown by compute/storage/network, top emitting regions)

### 7.3 Agent Orchestration (Express API)

```typescript
// services/api/src/index.ts
// Cron: collector + analyst every hour
// Routes: /api/gate, /api/dashboard, /api/report/brsr, /api/optimize/:id
// Push notifications: when idle instances detected
```

### 7.4 Mobile App Agent Feed Screen

The mobile app shows a chronological feed of agent activity:

```
🔍 Collector Agent — 2 min ago
   Pulled 847 usage records from AWS ap-south-1

⚠️  Analyst Agent — 14 min ago
   Spike detected: api-server-prod emitting 3.2× baseline

💡 Optimizer Agent — 14 min ago
   Recommendation ready → Tap to review
```

Each recommendation card is expandable. Two action buttons: **Apply** (executes the recommendation) / **Dismiss**.

---

## 8. CI/CD CARBON GATE PIPELINE

### 8.1 GitHub Actions YAML

```yaml
# .github/workflows/carbon-gate.yml
name: Carbonix Carbon Gate

on:
  pull_request:
    paths:
      - '**/*.tf'
      - '**/Dockerfile'
      - '**/docker-compose.yml'
      - '**/k8s/**'
      - '**/*.yaml'
      - '**/*.yml'

permissions:
  pull-requests: write
  contents: read

jobs:
  carbon-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Carbonix CLI
        run: npm install -g @carbonix/cli

      - name: Get infra diff
        run: |
          git diff origin/${{ github.base_ref }}...HEAD \
            -- '*.tf' 'Dockerfile' '*.yaml' > infra.diff

      - name: Run carbon gate
        id: gate
        run: |
          carbonix gate \
            --diff infra.diff \
            --budget ${{ vars.CARBON_BUDGET_KG_DAY || '10' }} \
            --output json > result.json
          echo "passed=$(jq -r '.passed' result.json)" >> $GITHUB_OUTPUT
        env:
          ELECTRICITY_MAPS_KEY: ${{ secrets.ELECTRICITY_MAPS_KEY }}

      - name: Post PR comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs')
            const { comment } = JSON.parse(fs.readFileSync('result.json', 'utf8'))
            await github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            })

      - name: Block if over budget
        if: steps.gate.outputs.passed == 'false'
        run: exit 1
```

### 8.2 Gate Agent Core Logic

```typescript
// packages/agents/src/cicdGate.ts
function parseTerraformDiff(diff: string): Resource[] {
  // Regex: match aws_instance resource blocks
  // Extract: instanceType, region, count
}

async function runGateAgent(diff: string, budgetKgPerDay = 10): Promise<GateResult> {
  const resources = parseTerraformDiff(diff)
  let totalDeltaKg = 0
  const lines: string[] = []

  for (const r of resources) {
    const result = await calculateCarbon(r.instanceType, r.region, 24, 0.5)
    totalDeltaKg += result.carbon_kg
    lines.push(`| ${r.instanceType} | ${r.region} | ${result.grid_intensity} | ${result.carbon_kg} kg/day |`)
  }

  const passed = totalDeltaKg <= budgetKgPerDay

  const comment = `## ${passed ? '✅' : '🚫'} Carbonix Carbon Gate Report
  
**Status:** ${passed ? 'Within budget' : 'BLOCKED — budget exceeded'}
**Projected addition:** ${totalDeltaKg.toFixed(2)} kg CO₂/day
**Budget:** ${budgetKgPerDay} kg CO₂/day

| Instance | Region | Grid Intensity | Daily Carbon |
|----------|--------|----------------|--------------|
${lines.join('\n')}

${!passed ? '> 💡 Move to `eu-north-1` to cut emissions by up to 98%.' : ''}

_Powered by [Carbonix](https://carbonix.dev) — built for the Indian cloud ecosystem_`

  return { passed, deltaKg: totalDeltaKg, comment }
}
```

### 8.3 PR Comment Format (What Judges See)

```markdown
## 🚫 Carbonix Carbon Gate Report

**Status:** BLOCKED — budget exceeded
**Projected addition:** 18.7 kg CO₂/day
**Budget:** 10 kg CO₂/day

| Instance | Region | Grid Intensity | Daily Carbon |
|----------|--------|----------------|--------------|
| `m5.xlarge` | `ap-south-1` | 750 gCO₂/kWh | **14.1 kg/day** |
| `t3.large` | `ap-south-1` | 750 gCO₂/kWh | **4.6 kg/day** |

> 💡 Move `m5.xlarge` to `eu-north-1` to reduce emissions by 98% (0.28 kg/day).

_Powered by Carbonix — built for the Indian cloud ecosystem_
```

---

## 9. TECHNOLOGY STACK

### 9.1 Full Stack

| Layer | Technology |
| :--- | :--- |
| **Mobile App** | Expo SDK, React Native, TypeScript, Expo Router |
| **Mobile State** | Zustand (global), TanStack React Query v5 (server state) |
| **Mobile HTTP** | Axios with JWT interceptors |
| **Mobile Charts** | Victory Native, React Native SVG |
| **Mobile Auth** | Expo Secure Store (JWT), expo-notifications |
| **Website Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Admin UI** | shadcn/ui components |
| **Backend API** | Node.js, Express.js, TypeScript |
| **ORM** | Prisma 6.x |
| **Database** | PostgreSQL (two separate instances: api + web) |
| **Auth — Mobile** | JWT + bcrypt, role-based Express middleware |
| **Auth — Web Admin** | NextAuth.js, vyana-auth-universal adapted as carbonix-auth |
| **Push Notifications** | Expo Push Notifications API |
| **Remote Config** | PostgreSQL feature flags, polled every 60s by mobile app |
| **SDK Package** | TypeScript-first npm package, wraps REST API |
| **Monorepo** | Turborepo with npm workspaces |
| **CI/CD** | GitHub Actions |
| **Mobile Build** | EAS Build, EAS Update, EAS Workflows |
| **Backend Deploy** | Railway |
| **Website Deploy** | Vercel |
| **Analytics** | Custom (PostgreSQL aggregations) or PostHog free tier |
| **Carbon Data** | Electricity Maps API (grid intensity) + CCF open dataset (instance coefficients) |

### 9.2 Mandatory Expo Features (Track Requirements)

| Feature | Module | Purpose |
| :--- | :--- | :--- |
| EAS Build | `eas-cli` | Cloud APK generation for demo day |
| EAS Update | `expo-updates` | OTA updates post-demo |
| Push Notifications | `expo-notifications` | Carbon threshold alerts, agent action notifications |
| Secure Storage | `expo-secure-store` | JWT token persistence |
| File System | `expo-file-system` | JSON export of calculation history |
| Deep Linking | `expo-linking` | Share result as URL opening directly in app |
| Splash Screen | `expo-splash-screen` | Branded loading experience |
| Constants | `expo-constants` | Environment config access |
| Animations | `react-native-reanimated` | Smooth UI transitions, agent feed card animations |
| Gesture Handler | `react-native-gesture-handler` | Swipe-to-delete history, pull-to-refresh |

---

## 10. MONOREPO STRUCTURE

```
CarbonSDK/                                  ← Root (Turborepo)
│
├── context/                                ← Project documentation (.md files)
│
├── apps/
│   ├── mobile/                             ← Expo React Native app
│   │   ├── app/                            ← Expo Router file-based routes
│   │   │   ├── (auth)/
│   │   │   │   ├── login.tsx
│   │   │   │   └── signup.tsx
│   │   │   ├── (tabs)/
│   │   │   │   ├── _layout.tsx             ← Bottom tab navigator
│   │   │   │   ├── config.tsx              ← Config Builder (P0)
│   │   │   │   ├── compare.tsx             ← Compare Screen (P0)
│   │   │   │   ├── console.tsx             ← API Console (P0)
│   │   │   │   └── history.tsx             ← History Screen (P1)
│   │   │   ├── results/[id].tsx            ← Results Screen (push from Config)
│   │   │   ├── docs.tsx                    ← SDK Docs Screen (P1)
│   │   │   ├── settings.tsx                ← Settings Screen (P2)
│   │   │   └── _layout.tsx                 ← Root layout
│   │   ├── components/                     ← Reusable components
│   │   │   ├── ui/                         ← Base UI primitives
│   │   │   ├── carbon/                     ← Carbon-specific components
│   │   │   │   ├── CarbonRatingBadge.tsx
│   │   │   │   ├── BreakdownChart.tsx
│   │   │   │   ├── EquivalentString.tsx
│   │   │   │   └── RecommendationCard.tsx
│   │   │   └── layout/
│   │   ├── stores/                         ← Zustand stores
│   │   │   ├── authStore.ts
│   │   │   ├── configStore.ts
│   │   │   └── featureFlagStore.ts
│   │   ├── hooks/                          ← Custom hooks
│   │   ├── lib/                            ← Axios instance, utilities
│   │   ├── constants/                      ← Colors, typography, spacing
│   │   ├── assets/                         ← Images, fonts
│   │   ├── app.json                        ← Expo app config
│   │   └── eas.json                        ← EAS build config
│   │
│   └── web/                                ← Next.js 14 website + admin panel
│       ├── src/
│       │   ├── app/
│       │   │   ├── (auth)/                 ← Login, signup, verify (vyana-auth)
│       │   │   ├── (public)/               ← Landing page, docs, playground
│       │   │   ├── admin/                  ← Protected admin panel
│       │   │   │   ├── dashboard/
│       │   │   │   ├── analytics/
│       │   │   │   ├── features/
│       │   │   │   ├── content/
│       │   │   │   ├── users/
│       │   │   │   ├── api-keys/
│       │   │   │   ├── team/
│       │   │   │   ├── notifications/
│       │   │   │   └── audit/
│       │   │   └── api/                    ← Next.js API routes (NextAuth)
│       │   ├── components/
│       │   ├── lib/
│       │   │   └── carbonix-auth/          ← Adapted vyana-auth-universal
│       │   └── styles/
│       ├── prisma/
│       │   └── schema.prisma               ← Web auth schema (User, Profile, VerificationToken)
│       └── carbonix-auth.config.ts         ← Auth config (only file needing major edits)
│
├── packages/
│   ├── sdk/                                ← carbonix npm package
│   │   ├── src/
│   │   │   ├── index.ts                    ← Main export
│   │   │   ├── client.ts                   ← Carbonix class
│   │   │   ├── calculate.ts                ← calculateCarbon method
│   │   │   ├── compare.ts                  ← compareProviders method
│   │   │   ├── recommend.ts                ← getRecommendation method
│   │   │   └── types.ts                    ← All TypeScript types
│   │   └── package.json
│   │
│   ├── agents/                             ← Agentic layer (NEW)
│   │   ├── src/
│   │   │   ├── collector.ts                ← CloudWatch agent
│   │   │   ├── analyst.ts                  ← LLM-powered analysis agent
│   │   │   ├── cicdGate.ts                 ← CI/CD gate agent
│   │   │   ├── reporter.ts                 ← BRSR report agent
│   │   │   └── temporal.ts                 ← Temporal shifting agent
│   │   └── package.json
│   │
│   ├── core/                               ← Calculation engine (no external API dependency)
│   │   ├── src/
│   │   │   ├── calculator.ts               ← Master formula implementation
│   │   │   ├── gridCache.ts                ← Electricity Maps cache layer
│   │   │   ├── rating.ts                   ← CO₂ → rating mapper
│   │   │   ├── equivalents.ts              ← CO₂ → real-world equivalents
│   │   │   └── recommendations.ts          ← Greenest region finder
│   │   ├── data/
│   │   │   └── instance-coefficients.json  ← CCF open dataset (CPU TDP, RAM coefficients)
│   │   └── package.json
│   │
│   ├── types/                              ← Shared TypeScript interfaces
│   └── config/                             ← Shared ESLint, Prettier, TSConfig
│
├── services/
│   └── api/                                ← Express REST API
│       ├── prisma/
│       │   ├── schema.prisma               ← Full API database schema
│       │   └── seed/
│       │       ├── index.ts
│       │       ├── regions.ts              ← 130+ cloud regions
│       │       ├── instance-types.ts       ← 200+ instance specs
│       │       ├── providers.ts
│       │       ├── feature-flags.ts
│       │       └── remote-config.ts
│       └── src/
│           ├── index.ts
│           ├── app.ts
│           ├── config/
│           ├── lib/
│           ├── middleware/
│           └── modules/
│               ├── auth/
│               ├── carbon/
│               ├── history/
│               ├── reference/
│               └── admin/
│
├── infrastructure/
│   ├── docker/
│   └── github/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                          ← Lint + type check + test
│       ├── deploy-api.yml                  ← Railway deploy
│       ├── deploy-web.yml                  ← Vercel deploy
│       ├── eas-build.yml                   ← EAS Build trigger
│       └── carbon-gate.yml                 ← Carbon gate for Carbonix's own infra
│
├── turbo.json
├── package.json                            ← Root workspace config
├── tsconfig.base.json
└── .env.example
```

---

## 11. DATABASE SCHEMA

### 11.1 Two Separate Database Instances

| Instance | Used By | Purpose |
| :--- | :--- | :--- |
| `carbonix_api` | `services/api` | All application data: calculations, users, agents, flags |
| `carbonix_web` | `apps/web` | Admin authentication (vyana-auth-universal) |

### 11.2 Complete Prisma Schema — Backend API (`services/api/prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ───────────────────────────────────────────────────────────────────

enum CloudProvider { AWS GCP AZURE }
enum CarbonRating { LOW MEDIUM HIGH CRITICAL }
enum CalculationSource { MOBILE_APP SDK WEB_PLAYGROUND API_DIRECT }
enum ApiKeyStatus { ACTIVE REVOKED }
enum FlagCategory { SCREEN FEATURE EXPERIMENT MAINTENANCE }
enum ConfigCategory { THRESHOLDS RECOMMENDATIONS CONTENT MAINTENANCE }
enum ConfigValueType { NUMBER STRING BOOLEAN JSON }
enum NotificationType { BROADCAST TARGETED THRESHOLD_ALERT }
enum NotificationStatus { DRAFT SCHEDULED SENDING SENT FAILED }
enum TargetAudience { ALL PROVIDER_AWS PROVIDER_GCP PROVIDER_AZURE CUSTOM }
enum MobileUserStatus { ACTIVE BANNED }
enum InstanceCategory { GENERAL COMPUTE MEMORY STORAGE GPU }
enum StorageType { EBS SSD HDD NVME }
enum GridIntensitySource { ELECTRICITY_MAPS CCF_DEFAULT }

// ─── Mobile Users ─────────────────────────────────────────────────────────────

model MobileUser {
  id                   String           @id @default(cuid())
  email                String           @unique
  passwordHash         String
  name                 String
  deviceId             String?
  pushToken            String?
  country              String?          @db.Char(2)
  lastActiveAt         DateTime         @default(now())
  calculationCount     Int              @default(0)
  totalCO2Tracked      Float            @default(0)
  carbonAlertThreshold Float            @default(50)
  theme                String           @default("dark")
  notificationsEnabled Boolean          @default(true)
  defaultProvider      CloudProvider?
  status               MobileUserStatus @default(ACTIVE)
  banReason            String?
  bannedAt             DateTime?
  bannedBy             String?
  calculations         Calculation[]
  sessions             Session[]
  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt
  @@index([email])
  @@index([status, lastActiveAt(sort: Desc)])
}

// ─── Calculations ─────────────────────────────────────────────────────────────

model Calculation {
  id                   String            @id @default(cuid())
  userId               String
  user                 MobileUser        @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider             CloudProvider
  region               String
  regionName           String
  instanceType         String
  instanceCount        Int
  hoursPerMonth        Float
  cpuUtilization       Float
  storageGb            Float
  ramGb                Float
  cpuEnergyKwh         Float
  memoryEnergyKwh      Float
  storageEnergyKwh     Float
  totalEnergyKwh       Float
  gridIntensity        Float
  co2GramsHour         Float
  co2KgMonth           Float
  co2KgYear            Float
  rating               CarbonRating
  equivalentString     String?
  recommendedRegion    String?
  recommendedCo2Kg     Float?
  reductionPercent     Float?
  recommendation       String?
  source               CalculationSource @default(MOBILE_APP)
  apiKeyId             String?
  responseTimeMs       Int?
  createdAt            DateTime          @default(now())
  @@index([userId, createdAt(sort: Desc)])
  @@index([provider, createdAt(sort: Desc)])
  @@index([region])
  @@index([rating])
}

// ─── Reference Data (Seed) ─────────────────────────────────────────────────

model Region {
  id              String              @id @default(cuid())
  provider        CloudProvider
  code            String
  name            String
  country         String              @db.Char(2)
  continent       String
  gridIntensity   Float               // gCO₂/kWh
  pue             Float               @default(1.2)
  intensitySource GridIntensitySource @default(CCF_DEFAULT)
  isPopular       Boolean             @default(false)
  lat             Float?
  lng             Float?
  updatedAt       DateTime            @updatedAt
  @@unique([provider, code])
  @@index([provider, gridIntensity])
}

model InstanceType {
  id            String            @id @default(cuid())
  provider      CloudProvider
  name          String
  category      InstanceCategory  @default(GENERAL)
  vcpu          Int
  memoryGb      Float
  cpuTdpWatts   Float
  storageGb     Float?
  storageType   StorageType?
  isPopular     Boolean           @default(false)
  @@unique([provider, name])
  @@index([provider, category])
}

model Provider {
  id          String        @id @default(cuid())
  key         String        @unique
  name        String
  logo        String?
  description String?
  defaultPue  Float         @default(1.2)
}

// ─── API Keys ─────────────────────────────────────────────────────────────────

model ApiKey {
  id                String       @id @default(cuid())
  name              String
  hashedKey         String       @unique
  keyPrefix         String       @db.Char(8)
  status            ApiKeyStatus @default(ACTIVE)
  createdBy         String
  revokedBy         String?
  revokedAt         DateTime?
  requestsPerMinute Int          @default(60)
  requestsPerDay    Int          @default(10000)
  totalRequests     Int          @default(0)
  lastUsedAt        DateTime?
  permissions       String[]     @default(["calculate", "compare", "recommend", "history"])
  createdAt         DateTime     @default(now())
  @@index([hashedKey])
  @@index([status])
}

// ─── Feature Flags & Remote Config ──────────────────────────────────────────

model FeatureFlag {
  id              String       @id @default(cuid())
  key             String       @unique
  displayName     String
  description     String?
  enabled         Boolean      @default(true)
  category        FlagCategory @default(FEATURE)
  value           Json?
  lastToggledBy   String?
  lastToggledAt   DateTime?
  version         Int          @default(1)
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

model RemoteConfig {
  id              String            @id @default(cuid())
  key             String            @unique
  displayName     String
  description     String?
  category        ConfigCategory
  valueType       ConfigValueType
  value           Json
  previousValue   Json?
  lastUpdatedBy   String?
  version         Int               @default(1)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}

// ─── Notifications & Push Tokens ─────────────────────────────────────────────

model Notification {
  id           String             @id @default(cuid())
  type         NotificationType   @default(BROADCAST)
  status       NotificationStatus @default(DRAFT)
  title        String
  body         String
  data         Json?
  targetAudience TargetAudience   @default(ALL)
  targetIds    String[]           @default([])
  scheduledFor DateTime?
  sentAt       DateTime?
  sentCount    Int                @default(0)
  openedCount  Int                @default(0)
  failedCount  Int                @default(0)
  createdBy    String
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt
}

model PushToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  platform  String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@index([userId])
}

// ─── Sessions & Audit ─────────────────────────────────────────────────────────

model Session {
  id           String     @id @default(cuid())
  userId       String
  user         MobileUser @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken String     @unique
  deviceInfo   Json?
  ipAddress    String?
  expiresAt    DateTime
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  @@index([userId])
  @@index([refreshToken])
}

model AuditLog {
  id         String   @id @default(cuid())
  actorId    String
  actorEmail String
  action     String
  resource   String
  resourceId String?
  oldValue   Json?
  newValue   Json?
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())
  @@index([actorId, createdAt(sort: Desc)])
  @@index([resource, resourceId])
}
```

### 11.3 Web Auth Schema (`apps/web/prisma/schema.prisma`)

```prisma
enum userType { SUPER_ADMIN ADMIN ANALYST CONTENT_EDITOR USER }

model User {
  id                 String              @id @default(cuid())
  userName           String              @unique
  email              String              @unique
  password           String
  isVerified         Boolean             @default(false)
  type               userType            @default(USER)
  profile            Profile?
  verificationTokens VerificationToken[]
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
}

model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName    String?
  avatarUrl   String?
  phoneNumber String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model VerificationToken {
  id      String   @id @default(cuid())
  token   String   @unique
  expires DateTime
  userId  String
  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 11.4 Default Seed Data

**Feature Flags (12 defaults):**
```typescript
const defaultFlags = [
  { key: 'config_builder_screen',  displayName: 'Config Builder Screen',  category: 'SCREEN',      enabled: true },
  { key: 'results_screen',         displayName: 'Results Screen',          category: 'SCREEN',      enabled: true },
  { key: 'compare_screen',         displayName: 'Compare Screen',          category: 'SCREEN',      enabled: true },
  { key: 'api_console_screen',     displayName: 'API Console Screen',      category: 'SCREEN',      enabled: true },
  { key: 'history_screen',         displayName: 'History Screen',          category: 'SCREEN',      enabled: true },
  { key: 'sdk_docs_screen',        displayName: 'SDK Docs Screen',         category: 'SCREEN',      enabled: true },
  { key: 'settings_screen',        displayName: 'Settings Screen',         category: 'SCREEN',      enabled: true },
  { key: 'push_notifications',     displayName: 'Push Notifications',      category: 'FEATURE',     enabled: true },
  { key: 'offline_mode',           displayName: 'Offline Mode',            category: 'FEATURE',     enabled: true },
  { key: 'deep_linking',           displayName: 'Deep Linking',            category: 'FEATURE',     enabled: true },
  { key: 'maintenance_mode',       displayName: 'Maintenance Mode',        category: 'MAINTENANCE', enabled: false },
  { key: 'maintenance_message',    displayName: 'Maintenance Message',     category: 'MAINTENANCE', enabled: false },
]
```

**Carbon Rating Thresholds (Remote Config):**
```typescript
LOW      → < 5 kg CO₂/month
MEDIUM   → 5–20 kg CO₂/month
HIGH     → 20–50 kg CO₂/month
CRITICAL → > 50 kg CO₂/month
```

---

## 12. BACKEND API ARCHITECTURE

### 12.1 Module Structure

```
services/api/src/modules/
├── auth/
│   ├── auth.routes.ts          POST /register, /login, /refresh, /logout, /me
│   ├── auth.controller.ts
│   ├── auth.service.ts         hash, JWT, email verify
│   ├── auth.schema.ts          Zod validation
│   └── auth.types.ts
│
├── carbon/
│   ├── carbon.routes.ts        POST /calculate, /compare, /recommend
│   ├── carbon.controller.ts
│   ├── carbon.service.ts       orchestration
│   ├── carbon.engine.ts        formula: energy_kwh → co2_grams (THE CORE)
│   ├── carbon.rating.ts        CO₂ → LOW/MEDIUM/HIGH/CRITICAL
│   ├── carbon.equivalents.ts   CO₂ → "driving 73 km"
│   ├── carbon.recommendations.ts   find greenest region
│   ├── carbon.schema.ts        Zod input validation
│   └── carbon.types.ts
│
├── history/
│   GET /history, /history/:id, DELETE /history/:id
│
├── reference/
│   GET /regions, /instances, /providers
│
└── admin/
    ├── dashboard/              GET /admin/dashboard
    ├── analytics/              GET /admin/analytics
    ├── feature-flags/          GET (public) + PUT (admin)
    ├── remote-config/          GET (public) + PUT (admin)
    ├── users/                  GET /admin/users, /:id, POST /:id/ban
    ├── api-keys/               CRUD /admin/api-keys
    ├── team/                   GET /admin/team, POST /invite, DELETE /:id
    ├── notifications/          POST /admin/notifications
    └── audit/                  GET /admin/audit
```

### 12.2 Carbon Engine — Core Implementation

```typescript
// services/api/src/modules/carbon/carbon.engine.ts

interface CarbonEngineInput {
  provider: 'aws' | 'gcp' | 'azure'
  region: string
  instanceType: string
  instanceCount: number
  hoursPerMonth: number
  cpuUtilization: number    // 0–1
  storageGb: number
  ramGb?: number            // override, else from instance spec
}

interface CarbonEngineOutput {
  cpuEnergyKwh: number
  memoryEnergyKwh: number
  storageEnergyKwh: number
  totalEnergyKwh: number
  gridIntensity: number
  co2GramsHour: number
  co2KgMonth: number
  co2KgYear: number
  rating: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  equivalentString: string
  recommendedRegion: string
  recommendedCo2Kg: number
  reductionPercent: number
  recommendation: string
}

async function calculateCarbon(input: CarbonEngineInput): Promise<CarbonEngineOutput> {
  const instance = await getInstanceSpec(input.provider, input.instanceType)
  const pue = await getProviderPUE(input.provider)
  const gridIntensity = await getGridIntensity(input.region)

  const cpuEnergy = (instance.cpuTdpWatts * input.cpuUtilization * input.hoursPerMonth * input.instanceCount) / 1000
  const memEnergy  = (instance.memoryGb * 0.000392 * input.hoursPerMonth * input.instanceCount)
  const diskEnergy = (input.storageGb * 0.0000002 * input.hoursPerMonth * input.instanceCount)

  const totalIT    = cpuEnergy + memEnergy + diskEnergy
  const totalFinal = totalIT * pue

  const co2GramsMonth = totalFinal * gridIntensity
  const co2KgMonth    = co2GramsMonth / 1000

  const rating = getRating(co2KgMonth)
  const equiv  = getEquivalent(co2KgMonth)
  const rec    = await getRecommendation(input, co2KgMonth)

  return { cpuEnergyKwh: cpuEnergy, memoryEnergyKwh: memEnergy, storageEnergyKwh: diskEnergy,
           totalEnergyKwh: totalFinal, gridIntensity, co2GramsHour: co2GramsMonth / input.hoursPerMonth,
           co2KgMonth, co2KgYear: co2KgMonth * 12, rating, equivalentString: equiv, ...rec }
}
```

### 12.3 Middleware Chain

```
Request
  → Helmet (security headers)
  → CORS (whitelist)
  → Rate Limiter (per endpoint group)
  → Body Parser
  → Request Logger (Winston)
  → Route Handler
    → Zod Validation
    → Auth Middleware (JWT verify) [if protected]
    → RBAC Middleware (role check) [if admin]
    → API Key Middleware (SDK routes)
    → Controller
      → Service
        → Engine / Prisma
      → Response Builder
  → Error Handler (global)
```

### 12.4 Rate Limiting Strategy

```
Public endpoints (/calculate, /compare, /recommend):  30 req/min per IP
Auth endpoints (/login, /register):                   10 req/min per IP
SDK endpoints (API key):                              60 req/min per key
Admin endpoints:                                      100 req/min per user
History endpoints:                                    50 req/min per user
```

---

## 13. MOBILE APPLICATION

### 13.1 Screens — Priority & Offline Support

| Screen | Route | Priority | Offline Support |
| :--- | :--- | :--- | :--- |
| Config Builder | `/(tabs)/config` | P0 | No |
| Results | `/results/[id]` | P0 | Yes (cached) |
| Compare | `/(tabs)/compare` | P0 | No |
| API Console | `/(tabs)/console` | P0 | No |
| History | `/(tabs)/history` | P1 | Yes (local cache) |
| SDK Docs | `/docs` | P1 | Partial (static) |
| Settings | `/settings` | P2 | Yes |
| Login | `/auth/login` | P0 | No |
| Signup | `/auth/signup` | P0 | No |

### 13.2 Screen Specifications

#### Screen 1: Config Builder (Home, P0)

The entry point of the entire app. The main demo screen for judges.

**Fields:**
- Provider selector: AWS / GCP / Azure (segmented control / toggle buttons)
- Region dropdown: filtered by selected provider, shows region name + code
- Instance type picker: searchable list, shows vCPU + RAM + category
- Server count: numeric input with +/- stepper
- Hours/month slider: 1–744 (default 720)
- CPU utilization slider: 0–100% (default 40%)
- Storage GB: numeric input
- RAM GB: numeric input (optional override)

**Behavior:**
- Full Zod validation before submit
- Loading animation on Calculate button while API call is in progress
- Navigates to Results screen on success
- Inline error toast on validation failure

#### Screen 2: Results (P0)

Pushed from Config Builder after calculation.

**Components:**
- Animated CO₂ result card: large JetBrains Mono number (kg/month + grams/hour)
- Carbon rating badge: color-coded (LOW=green, MEDIUM=orange, HIGH=red, CRITICAL=red pulsing)
- Breakdown bar chart (Victory Native): compute vs memory vs storage
- Real-world equivalent string: "≈ driving 145 km"
- Recommendation card: "Switch to eu-north-1 to reduce by 98%"
- Share button (Expo Sharing): shareable URL via deep link

#### Screen 3: Compare (P0)

Fires same config at all 3 providers simultaneously.

**Components:**
- Three parallel API calls using Promise.all
- Side-by-side provider cards (AWS / GCP / Azure)
- Each card: provider name, CO₂ kg/month, rating badge
- Winner badge on lowest-carbon card
- Percentage diff labels between cards
- Bar chart comparing all three
- Tap any card → push to detailed Results screen for that provider

#### Screen 4: API Console (P0)

The "Postman" feature. The key differentiator proving developer tool angle to judges.

**Components:**
- Endpoint selector dropdown: `/calculate`, `/compare`, `/recommend`, `/history`
- Editable JSON parameter editor (multiline text input with monospace font)
- Fire button
- Live JSON response view with syntax highlighting (JetBrains Mono)
- Response time indicator in ms
- Copy response button

**Why this matters:** This screen proves the API exists as a real service, demonstrates the response format, and shows judges the developer tool angle in a way no desktop app can replicate on demo day.

#### Screen 5: History (P1)

**Components:**
- List of past calculations with timestamps
- Each entry: provider + region + CO₂ kg/month + rating badge
- Swipe left to delete (Gesture Handler)
- Pull to refresh (React Query)
- Filter chips: by provider (AWS/GCP/Azure) or by rating
- Share individual entry (Expo Sharing)
- Export all as JSON (Expo File System)

#### Screen 6: SDK Docs (P1)

In-app documentation proving the SDK is real.

**Components:**
- SDK method list: `calculateCarbon()`, `compareProviders()`, `getRecommendation()`
- For each method: parameters, return type, copyable TypeScript snippet
- Links to full docs website
- `npm install carbonix` snippet with copy button

#### Screen 7: Settings (P2)

**Components:**
- API base URL toggle (staging vs production)
- Light/dark theme toggle
- Push notification preferences toggle
- Carbon alert threshold slider (kg/month)
- App version info
- Clear history button

### 13.3 State Management Architecture

```
Zustand Stores:
├── authStore        → { user, token, isAuthenticated, login(), logout() }
├── configStore      → { lastConfig, lastResult, saveConfig() }
└── featureFlagStore → { flags, fetchFlags(), isEnabled(key) }

React Query:
├── useCalculation   → POST /calculate, cached by config hash
├── useCompare       → POST /compare, cached by config hash
├── useHistory       → GET /history, paginated, background refetch
└── useReferenceData → GET /regions + /instances, stale 24h
```

### 13.4 Push Notification Setup

```
Triggers:
├── Carbon budget threshold exceeded (user's custom threshold)
├── Agent recommendation available (idle/oversized instances found)
├── Monthly BRSR report ready
└── Admin broadcast messages

Flow:
App launch → expo-notifications.registerForPushNotificationsAsync()
           → POST /api/v1/notifications/token with Expo push token
           → Token stored in PushToken table
           → Admin panel or agent sends via Expo Push API
```

### 13.5 Offline Mode

```
NetInfo detects offline:
  → Show banner: "You're offline — showing cached data"
  → Disable: Calculate button, Compare tab, API Console
  → Enable: Last results (AsyncStorage cache), History list, Settings
```

### 13.6 Deep Linking

```
Scheme: carbonix://
Result deep link: carbonix://results/[calculationId]
SDK install link: carbonix://docs/sdk
```

### 13.7 Performance Targets

| Metric | Target |
| :--- | :--- |
| Cold start | < 2 seconds |
| Screen transition | < 300ms |
| API response render | < 500ms after response received |
| JS bundle size | < 5 MB |
| Idle memory | < 150 MB |
| Frame rate | ≥ 58 FPS |

---

## 14. WEBSITE & ADMIN PANEL

### 14.1 Public Landing Page Sections

1. **Hero:** Headline: *"The carbon cost of your cloud infrastructure. In 5 lines of code."* + SDK code snippet + CTAs: "Get the SDK" and "Open the Docs" + animated carbon counter

2. **Problem Section (general audience):** Visuals of data center emissions, grid intensity map, "50× Virginia vs Stockholm" stat

3. **How It Works (technical):** 3-step flow: enter config → API calculates → get result + embedded live demo

4. **SDK Install Section:** `npm install carbonix` + copy button + JS/TS toggle + full snippet with syntax highlighting

5. **Provider Comparison:** Static visual of AWS vs GCP vs Azure carbon intensity by region

6. **Footer:** GitHub, npm, docs, contact

### 14.2 Docs Portal Pages

- Install (`npm install carbonix`)
- Authentication
- Quick Start
- API Reference (all endpoints)
- SDK Reference (all methods)
- Region Comparisons
- Methodology (the carbon formula)
- CI/CD Integration

### 14.3 Admin Panel — Role System

| Role | Permissions |
| :--- | :--- |
| **SUPER_ADMIN** | Full access including team management, delete members |
| **ADMIN** | Full access except cannot manage other admins |
| **ANALYST** | Read-only: analytics, dashboard, user list |
| **CONTENT_EDITOR** | Edit only: thresholds, recommendation strings, maintenance banner |

### 14.4 Admin Panel — Screens

**Dashboard:**
- Overview cards: total API calls (today/week/month), unique mobile sessions, most used endpoint, average CO₂ result, SDK npm installs, realtime active users
- Live feed: last 20 API calls in real time (endpoint, response time, status)

**Analytics:**
- Charts: API calls over time, region popularity, provider pie chart, SDK vs mobile usage, top instance types
- Exportable as PNG/CSV

**Feature Flags:**
- Table of app screens/features with on/off toggles
- Change reflected in mobile app within 60 seconds (polling)
- Confirmation modal before disabling any screen

**Content Management:**
- Edit carbon rating thresholds (what kg = LOW/MEDIUM/HIGH/CRITICAL)
- Edit recommendation strings per rating level
- Toggle/edit maintenance mode banner with custom message

**User Management:**
- Global list of mobile app users: device ID, timestamps, country, calculation count
- Per-user history and carbon trend
- Ban/unban device with reason
- Bulk actions

**API Key Management:**
- List active SDK keys: name, creator, timestamps, usage count, limits
- Generate new key (shows once)
- Revoke key instantly
- Set rate limits per key

**Team Management (Super Admin only):**
- Invite members via email
- Assign roles
- Revoke access
- View activity timestamps
- Audit log: every admin action logged with actorId, action, resource, timestamp

**Notifications:**
- Compose push notification (title, body)
- Target: ALL / by provider / custom device IDs
- Schedule for future time
- View open rates

---

## 15. SDK PACKAGE

### 15.1 Package Identity

```
Package name: carbonix
npm: npm install carbonix
TypeScript: first-class, strict types
API: Promise-based, async/await
Philosophy: Stripe/Supabase level DX — minimal setup, maximum clarity
```

### 15.2 Full SDK Interface

```typescript
import { Carbonix } from 'carbonix'

const sdk = new Carbonix({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.carbonix.dev/v1',  // optional, defaults to production
})

// Method 1: Calculate carbon for one config
const result = await sdk.calculateCarbon({
  provider: 'aws',               // 'aws' | 'gcp' | 'azure'
  region: 'ap-south-1',
  instanceType: 't3.medium',
  count: 4,
  hoursPerMonth: 720,
  cpuUtilization: 0.4,           // 0–1
  storageGb: 100
})
// Returns:
// result.co2_kg_month       → 33.8
// result.co2_grams_hour     → 46.9
// result.rating             → "HIGH"
// result.equivalent_string  → "≈ driving 145 km"
// result.recommendation     → "Switch to eu-north-1 to reduce by 98%"
// result.breakdown.compute  → 63.4 kWh
// result.breakdown.memory   → 4.5 kWh
// result.breakdown.storage  → 0.01 kWh

// Method 2: Compare all providers for same config
const comparison = await sdk.compareProviders({
  region_aws:   'us-east-1',
  region_gcp:   'us-central1',
  region_azure: 'eastus',
  instanceClass: 'medium',
  count: 4,
  hoursPerMonth: 720
})
// Returns array of 3 results, sorted by co2_kg_month ascending
// comparison[0].provider → 'gcp' (winner if GCP is lowest)

// Method 3: Temporal shifting — schedule job at lowest-carbon time
await sdk.schedule(yourJob, {
  region: 'ap-south-1',
  windowHours: 6,         // allow up to 6 hours delay
})
// Calls Electricity Maps → finds cleanest window → delays execution

// Method 4: Scan Terraform file for carbon impact before deploy
const scanResult = await sdk.scanInfra('./infra/main.tf', {
  budgetKgPerDay: 10
})
// scanResult.passed        → false
// scanResult.deltaKg       → 18.7
// scanResult.comment       → formatted markdown for PR comment

// Method 5: Generate BRSR report
const report = await sdk.generateBRSRReport({
  period: '2026-05',    // YYYY-MM
  source: 'database'    // pulls from Carbonix history
})
// report.scope2_emissions_tonne → 2.4
// report.breakdown.compute      → 1.8 tonnes
// report.top_emitting_regions   → [{ region: 'ap-south-1', carbon_kg: 1200 }]
```

### 15.3 SDK Internal Structure

```typescript
// packages/sdk/src/client.ts
export class Carbonix {
  private apiKey: string
  private baseUrl: string
  private http: AxiosInstance

  constructor(config: CarbonixConfig) { ... }

  async calculateCarbon(params: CalculateParams): Promise<CalculationResult> { ... }
  async compareProviders(params: CompareParams): Promise<ComparisonResult[]> { ... }
  async schedule(job: Function, options: ScheduleOptions): Promise<void> { ... }
  async scanInfra(filePath: string, options: GateOptions): Promise<GateResult> { ... }
  async generateBRSRReport(options: ReportOptions): Promise<BRSRReport> { ... }
}
```

---

## 16. UI/UX DESIGN SYSTEM

### 16.1 Design Philosophy

**Creative North Star: "The Programmable Console"**

Carbonix's UI evokes the precision of a code editor, the authority of a cloud console (AWS/GCP dashboards), and the clarity of data visualization tools (Grafana/Datadog). Sustainability is treated as **programmable infrastructure data**, not a vague corporate goal.

Design principles:
1. Dark mode by default
2. Data clarity first — complex carbon math distilled through crisp typography
3. Programmable aesthetic — UI elements belong in a sophisticated code editor
4. Tactile depth — subtle glass effects, layered surfaces
5. Information density — maximize useful info per screen

### 16.2 Design System Tokens

```css
:root {
  /* ── Surfaces ──────────────────────────────────────── */
  --surface:                   #101417;
  --surface-dim:               #101417;
  --surface-bright:            #363a3d;
  --surface-container-lowest:  #0b0f11;
  --surface-container-low:     #191c1f;
  --surface-container:         #1d2023;
  --surface-container-high:    #272a2d;
  --surface-container-highest: #323538;
  --background:                #121212;
  --surface-elevated:          #1E1E1E;
  --border-subtle:             #2D2D2D;

  /* ── Brand Colors ─────────────────────────────────── */
  --primary:            #d7baff;       /* Light purple (text on dark) */
  --primary-container:  #BD93F9;       /* Electric Purple (buttons, CTA, focus) */
  --on-primary:         #411478;       /* Dark purple (text on primary button) */
  --secondary:          #75d4e8;       /* Neon Cyan */
  --secondary-container: #008092;

  /* ── Text ─────────────────────────────────────────── */
  --text-header:    #E5E7EB;
  --text-body:      #D1D5DB;
  --text-muted:     #9CA3AF;
  --on-surface:     #e0e2e6;

  /* ── Semantic Colors ──────────────────────────────── */
  --success: #50FA7B;    /* LOW carbon, success states */
  --warning: #FFB86C;    /* MEDIUM carbon, warnings */
  --error:   #FF5555;    /* HIGH/CRITICAL carbon, errors */
  --info:    #8BE9FD;    /* Neon Cyan, info badges */

  /* ── Spacing (4px base unit) ──────────────────────── */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;     /* Default */
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;

  /* ── Borders ──────────────────────────────────────── */
  --rounded-sm:   0.125rem;
  --rounded:      0.25rem;
  --rounded-md:   0.375rem;
  --rounded-lg:   0.5rem;
  --rounded-xl:   0.75rem;
  --rounded-full: 9999px;
}
```

### 16.3 Dark Mode Surface Hierarchy

```
Level 0 — App Background:     #121212  (deepest)
Level 1 — Cards/Containers:   #1E1E1E  (elevated surface)
Level 2 — Nested Elements:    #272A2D  (inputs, code blocks)
Level 3 — Hover States:       #323538  (interactive highlight)
Level 4 — Active/Selected:    #4A4451  (outline variant)
```

### 16.4 Typography System

```
Font 1: Inter          → All UI text, navigation, buttons, body copy
Font 2: JetBrains Mono → ALL numbers, CO₂ values, JSON, code, metric labels

RULE: Every CO₂ value must use JetBrains Mono. No exceptions.
RULE: All numbers (kg, kWh, %, ms) use JetBrains Mono.
RULE: Form labels use JetBrains Mono uppercase.

Typography Scale:
headline-lg:      Inter 32px Bold    → Page titles
headline-md:      Inter 24px SemiBold → Screen titles
body-lg:          Inter 18px Regular → Section headers
body-md:          Inter 16px Regular → Body content
body-sm:          Inter 14px Regular → Metadata
code-md:          JetBrains Mono 14px → JSON, code blocks, form values
code-sm:          JetBrains Mono 12px → Timestamps, metadata
label-caps:       JetBrains Mono 11px Bold UPPERCASE 0.1em tracking → All labels
```

### 16.5 Carbon Rating Color System

| Rating | Background | Border | Text | Badge |
| :--- | :--- | :--- | :--- | :--- |
| LOW | rgba(80, 250, 123, 0.2) | #50FA7B | #50FA7B | `● LOW` |
| MEDIUM | rgba(255, 184, 108, 0.2) | #FFB86C | #FFB86C | `● MEDIUM` |
| HIGH | rgba(255, 85, 85, 0.2) | #FF5555 | #FF5555 | `● HIGH` |
| CRITICAL | rgba(255, 85, 85, 0.35) | #FF5555 | #FF5555 | `◉ CRITICAL` (pulsing) |

### 16.6 60-30-10 Color Distribution

```
60% → Backgrounds, surfaces: #121212, #1E1E1E, #101417
30% → Text, borders, secondary UI: #E5E7EB, #D1D5DB, #2D2D2D
10% → Accents, actions: #BD93F9, #8BE9FD, #50FA7B
```

### 16.7 Component Specifications

**Carbon Result Card:**
```
Background:  var(--surface-elevated) = #1E1E1E
Border:      1px solid rating-color at 40% opacity
Border-left: 4px solid rating-color at 100%
Border-radius: 12px
Padding:     24px
CO₂ number: JetBrains Mono 48px Bold, rating-color
Unit (kg/month): JetBrains Mono 16px, --text-muted
```

**Rating Badge:**
```
Background:  rating-bg (20% opacity)
Border:      1px solid rating-color
Border-radius: 4px (pill with full round)
Padding:     4px 10px
Text:        JetBrains Mono 11px Bold uppercase, rating-color
```

**Primary Button:**
```
Background:  #BD93F9 (Electric Purple)
Text color:  #411478 (Dark purple)
Font:        Inter 14px SemiBold
Border-radius: 8px
Padding:     12px 24px
Hover:       #C9A4FF
Active:      scale(0.97)
```

**Code Block / JSON View:**
```
Background:  #0b0f11 (surface-container-lowest)
Border:      1px solid #2D2D2D
Font:        JetBrains Mono 13px
Line-height: 1.6
Padding:     16px
Border-radius: 8px
```

---

## 17. APPLICATION FLOW

### 17.1 App Launch Flow

```
App Launch
  → Splash Screen (expo-splash-screen)
  → Initialize Services:
      • Load cached config
      • Check auth token (Expo Secure Store)
      • Fetch feature flags (GET /admin/feature-flags)
      • Register push token (expo-notifications)
  → Token exists? → Validate JWT
      • Valid → Home (Config Builder)
      • Invalid/expired → Auth Screen
  → No token → Auth Screen (Login/Signup)
```

### 17.2 Core Calculation Flow

```
Config Builder
  → User fills all fields
  → Tap "Calculate Carbon Cost"
  → Zod validation
      • Fail → inline error toast
      • Pass → show loading animation
  → POST /api/v1/calculate
      • Error (4xx/5xx) → error toast + retry button
      • Success → navigate to Results screen
  → Results Screen renders:
      • Animated CO₂ card (Reanimated spring animation)
      • Breakdown chart
      • Recommendation card
      • Share button
```

### 17.3 Compare Flow

```
Compare Tab
  → Inherits last config from Config Builder (Zustand)
  → User can modify region per provider
  → Tap "Compare All"
  → 3 parallel API calls (Promise.all)
  → Show loading skeleton on all 3 cards
  → All resolve → animate cards in
  → Winner badge on lowest CO₂ card
  → Tap any card → push to Results screen
```

### 17.4 Error Handling Pattern

```
Any API Call
  → 200 → Success flow
  → 401 → Refresh JWT → retry → if fail → navigate to Login
  → 429 → Toast: "Slow down — rate limited"
  → 500 → Toast: "Something went wrong" + Retry button
  → Offline → Banner + disabled buttons
```

### 17.5 Feature Flag Polling

```
App polls GET /api/v1/admin/feature-flags every 60 seconds
  → Updates featureFlagStore in Zustand
  → React component rerenders based on flag value
  → If config_builder_screen disabled → hide tab from bottom navigation
  → If maintenance_mode enabled → show maintenance banner
```

---

## 18. IMPLEMENTATION PLAN

### 18.1 Phase Overview (21-Day Sprint)

```
Week 1
Day 1-2  → Phase 1: Monorepo setup + PostgreSQL + Auth
Day 3-4  → Phase 1: Carbon Engine + /calculate endpoint
Day 5-6  → Phase 2: /compare, /recommend, /history APIs
Day 7    → Phase 2: Admin API + Feature Flags

Week 2
Day 8-9  → Phase 3: Expo App scaffold + Auth screens
Day 10   → Phase 3: Config Builder + Results screens
Day 11   → Phase 3: Compare + API Console screens
Day 12   → Phase 3: History + Settings + SDK Docs
Day 13   → Phase 3: Push notifications + Offline + Deep links
Day 14   → Phase 5: SDK npm package (parallel)
         → Phase 4: Website landing page (parallel)

Week 3
Day 15   → Phase 4: Docs portal + Interactive playground
Day 16   → Phase 4: Admin panel Dashboard + Analytics
Day 17   → Phase 4: Admin panel Features + Users
Day 18   → Phase 6: Integration testing + bug fixes
Day 19   → Phase 6: Polish + performance
Day 20   → Phase 7: EAS Build + Deploy all services
Day 21   → Phase 7: Demo rehearsal + final QA
```

### 18.2 Build Order (Most Critical Path)

```
1. packages/core      → calculator.ts, gridCache.ts  (no external deps)
2. services/api       → carbon engine, /calculate endpoint
3. packages/agents    → cicdGate.ts                  (CI/CD gate for demo)
4. .github/workflows  → carbon-gate.yml              (hook to test repo)
5. services/api       → /compare, /recommend, /history, admin endpoints
6. apps/mobile        → auth → config builder → results → compare → console
7. packages/sdk       → wrap the API
8. apps/web           → landing page → docs → admin panel
9. packages/agents    → collector.ts (needs AWS creds, do last)
10. packages/agents   → analyst.ts (needs collector working)
```

### 18.3 Day 1 Checklist

- [ ] `npx create-turbo@latest` — Turborepo init
- [ ] Create `apps/mobile`, `apps/web`, `packages/sdk`, `packages/core`, `packages/agents`, `services/api`
- [ ] Base `tsconfig.json` + workspace TSConfigs
- [ ] Shared ESLint + Prettier config
- [ ] Root `.gitignore` + `.env.example`
- [ ] Initialize Git, create `main` + `dev` branches
- [ ] Setup Railway project for API
- [ ] Setup Neon PostgreSQL for both databases
- [ ] Express app scaffold with middleware chain
- [ ] First Prisma migration + seed

### 18.4 Build Sequence for Carbon Engine (Days 3-4)

```
1. Create packages/core/data/instance-coefficients.json
   (Download from: github.com/cloud-carbon-footprint/cloud-carbon-footprint)

2. Implement packages/core/src/gridCache.ts
   (Static fallback map + Electricity Maps API call + 1h cache)

3. Implement packages/core/src/calculator.ts
   (The master formula — see Section 4)

4. Implement services/api/src/modules/carbon/carbon.engine.ts
   (Wraps core calculator, adds DB lookups for instance specs)

5. Implement carbon.rating.ts, carbon.equivalents.ts, carbon.recommendations.ts

6. Implement carbon.controller.ts + carbon.routes.ts

7. Test with known values:
   4× t3.medium, ap-south-1, 40% CPU, 720h → should return ~33.8 kg CO₂/month
   Same config, eu-north-1 → should return ~0.65 kg CO₂/month
```

### 18.5 Risk Mitigation

| Risk | Mitigation |
| :--- | :--- |
| Electricity Maps free tier exhausted | Static fallback values ship with code — app never crashes |
| CloudWatch API not available in demo | Collector Agent has full mock mode via `USE_MOCK_CARBON=true` env var |
| EAS Build fails on demo day | Pre-build APK ready 48h before demo |
| Railway goes down | Backup deployment on Render prepared |
| Claude API rate limit | Analyst Agent has hardcoded fallback recommendations |

---

## 19. DEMO FLOW FOR JUDGES

### 19.1 The 4-Minute Demo Sequence

1. **Open Expo app** → Config Builder screen
2. **Select:** AWS, `ap-south-1` (Mumbai), `t3.medium` × 4, 720h, 40% CPU
3. **Tap "Calculate Carbon Cost"** → show loading animation
4. **Results screen:** 33.8 kg CO₂/month — CRITICAL (red) → "≈ driving 145 km per month"
5. **Show recommendation:** *"Switch to eu-north-1 to reduce emissions by 98%"*
6. **Navigate to Compare tab** → show all 3 providers side-by-side
7. **Switch to eu-north-1** on Config Builder → recalculate → **0.65 kg CO₂/month — LOW (green)**
8. **Open API Console** → show raw JSON response → prove this is a real API
9. **Switch to GitHub** → open a PR with a Terraform file → show CI/CD carbon gate blocking it
10. **Show the PR comment** with the carbon breakdown table
11. **Back to app** → Settings → show push notification for carbon budget exceeded
12. **Open laptop** → `npm install carbonix` → 5 lines → `console.log(result.co2_kg_month)` → 33.8

**Pitch conclusion:** *"Infrastructure has a financial cost and a carbon cost. Carbonix makes both measurable — and gives developers the tools to act on it."*

### 19.2 The Story Arc for Judges

**Hook:** "Every Indian developer defaults to ap-south-1. Nobody tells them it's one of the worst grids on earth for carbon."

**Problem:** BRSR mandate requires Scope 2 reporting. Indian IT companies manage cloud for European clients who need CSRD compliance. Zero automated tooling for this. Manually computed with spreadsheets.

**Gap:** Every existing tool is retrospective. Carbonix is prospective — it stops carbon debt before it's created.

**Solution:** API + SDK + mobile console. The CI/CD gate blocks bad infrastructure decisions before they deploy. Temporal shifting runs flexible jobs when the grid is clean. Right-sizing eliminates carbon waste from idle machines.

**Proof:** Live numbers. Real API. Real GitHub Actions block. `npm install carbonix` working on screen.

**Scale:** Every Indian startup on `ap-south-1`. Every IT services company needing CSRD data. Every DevOps team that cares about their cloud bill also cares about this — once it's visible.

---

## 20. ENVIRONMENT VARIABLES

### 20.1 Backend API (`services/api/.env`)

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/carbonix_api"

# JWT
JWT_SECRET="generate-with-openssl-rand-base64-64"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="generate-with-openssl-rand-base64-64"
JWT_REFRESH_EXPIRES_IN="7d"

# Electricity Maps API
ELECTRICITY_MAPS_KEY="your-free-tier-key-from-electricitymaps-api"

# Claude API (for Analyst Agent)
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Server
PORT=3001
NODE_ENV="production"

# CORS
ALLOWED_ORIGINS="https://carbonix.dev,https://www.carbonix.dev,exp://localhost:8081"

# Carbon Budget (for CI/CD gate)
DEFAULT_CARBON_BUDGET_KG_DAY=10

# Mock mode (set true in development to avoid API costs)
USE_MOCK_CARBON=false
```

### 20.2 Website (`apps/web/.env.local`)

```bash
# Database (separate instance for web auth)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/carbonix_web"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://carbonix.dev"

# Email
MAIL_USER="carbonix.dev@gmail.com"
MAIL_PASS="gmail-app-password"
MAIL_FROM_NAME="Carbonix"

# Branding
BRAND_COLOR="#BD93F9"

# Backend API
NEXT_PUBLIC_API_URL="https://api.carbonix.dev/api/v1"
```

### 20.3 Mobile App (`apps/mobile/.env`)

```bash
EXPO_PUBLIC_API_URL="https://api.carbonix.dev/api/v1"
EXPO_PUBLIC_APP_VERSION="1.0.0"
EXPO_PUBLIC_ENVIRONMENT="production"
```

### 20.4 GitHub Actions Secrets Required

```bash
ELECTRICITY_MAPS_KEY     # For CI/CD carbon gate
CARBON_BUDGET_KG_DAY     # Variable, default 10
```

---

## 21. FUTURE SCOPE

Beyond the hackathon build, in order of priority:

1. **GitHub Actions marketplace action** — `carbonix/carbon-gate-action@v1` — one line to add carbon gate to any repo
2. **Kubernetes monitoring** — carbon metrics for pod-level workloads via kube-state-metrics
3. **Terraform provider plugin** — `terraform plan --carbon-estimate` native in the IaC workflow
4. **VS Code extension** — carbon estimate in the editor tooltip when writing infrastructure files
5. **Grafana/Datadog plugin** — carbon as an ops metric alongside CPU and memory
6. **Slack integration** — weekly carbon report + budget alerts in team channels
7. **Neo4j integration** — model infrastructure as a graph to query: *"Show all workloads connected to coal-heavy grids that have a low-carbon equivalent region available"*
8. **Carbon certificates** — signed artifact per deployment: `deployment-2026-06-11.carbon-cert.json`
9. **B2B API** — serve Indian IT companies as the carbon data provider for their CSRD-bound European clients

---

## APPENDIX A: CORE CALCULATION IMPLEMENTATION

```typescript
// packages/core/src/calculator.ts — Complete Implementation

import instanceCoefficients from './data/instance-coefficients.json'
import { getGridIntensity } from './gridCache'

export interface CalculationInput {
  instanceType: string
  region: string
  instanceCount: number
  hoursPerMonth: number
  cpuUtilization: number    // 0–1
  storageGb: number
  provider: 'aws' | 'gcp' | 'azure'
}

export interface CalculationResult {
  energy_kwh: number
  carbon_grams: number
  carbon_kg: number
  carbon_kg_year: number
  grid_intensity: number
  region: string
  instance: string
  breakdown: { compute: number; memory: number; storage: number }
}

export async function calculateCarbon(input: CalculationInput): Promise<CalculationResult> {
  const instance = (instanceCoefficients as any)[input.instanceType]
    ?? (instanceCoefficients as any)['t3.medium']

  const PUE_MAP: Record<string, number> = {
    aws: 1.2, gcp: 1.1, azure: 1.18
  }
  const pue = PUE_MAP[input.provider] ?? 1.2

  const cpuEnergy  = (instance.tdp_per_vcpu * instance.vcpu * input.cpuUtilization
                      * input.hoursPerMonth * input.instanceCount) / 1000
  const memEnergy  = instance.memory_gb * 0.000392 * input.hoursPerMonth * input.instanceCount
  const diskEnergy = input.storageGb * 0.0000002 * input.hoursPerMonth * input.instanceCount

  const totalIT    = cpuEnergy + memEnergy + diskEnergy
  const withPUE    = totalIT * pue

  const gridIntensity = await getGridIntensity(input.region)
  const carbonGrams   = withPUE * gridIntensity

  return {
    energy_kwh:       Math.round(withPUE * 1000) / 1000,
    carbon_grams:     Math.round(carbonGrams),
    carbon_kg:        Math.round(carbonGrams / 100) / 10,
    carbon_kg_year:   Math.round(carbonGrams / 100 * 12) / 10,
    grid_intensity:   gridIntensity,
    region:           input.region,
    instance:         input.instanceType,
    breakdown: {
      compute: Math.round(cpuEnergy * 1000) / 1000,
      memory:  Math.round(memEnergy * 1000) / 1000,
      storage: Math.round(diskEnergy * 1000) / 1000
    }
  }
}
```

```typescript
// packages/core/src/gridCache.ts — Complete Implementation

const STATIC_FALLBACK: Record<string, number> = {
  'ap-south-1':    750,   // Mumbai — India coal grid
  'us-east-1':     415,   // Virginia
  'eu-west-1':     316,   // Ireland
  'eu-north-1':      8,   // Stockholm — hydro/nuclear
  'us-west-2':     130,   // Oregon — hydro heavy
  'ap-southeast-1': 408,  // Singapore
  'ap-northeast-1': 450,  // Tokyo
  'eu-central-1':  338,   // Frankfurt
  'us-east-2':     390,   // Ohio
  'sa-east-1':     120,   // São Paulo (Brazil has low carbon grid)
}

const ZONE_MAP: Record<string, string> = {
  'ap-south-1':    'IN-SO',
  'us-east-1':     'US-MIDA-PJM',
  'eu-north-1':    'SE',
  'us-west-2':     'US-NW-PACW',
  'eu-west-1':     'IE',
  'eu-central-1':  'DE',
}

const cache: Record<string, { value: number; timestamp: number }> = {}

export async function getGridIntensity(region: string): Promise<number> {
  const zone = ZONE_MAP[region]
  if (!zone) return STATIC_FALLBACK[region] ?? 500

  if (cache[zone] && Date.now() - cache[zone].timestamp < 3_600_000) {
    return cache[zone].value
  }

  try {
    const res = await fetch(
      `https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${zone}`,
      { headers: { 'auth-token': process.env.ELECTRICITY_MAPS_KEY! } }
    )
    const data = await res.json()
    cache[zone] = { value: data.carbonIntensity, timestamp: Date.now() }
    return data.carbonIntensity
  } catch {
    return STATIC_FALLBACK[region] ?? 500  // Never crash
  }
}
```

---

## APPENDIX B: AUTH CONFIG FOR WEB ADMIN

```typescript
// apps/web/carbonix-auth.config.ts

export const authConfig = {
  app: {
    name: "Carbonix",
    tagline: "The carbon cost of your cloud infrastructure",
    description: "Admin panel for the Carbonix developer platform.",
  },
  heroImage: "/images/carbonix-og.png",
  heroImageAlt: "Carbonix — Carbon footprint calculation platform",
  roleRedirects: {
    SUPER_ADMIN:    "/admin/dashboard",
    ADMIN:          "/admin/dashboard",
    ANALYST:        "/admin/analytics",
    CONTENT_EDITOR: "/admin/content",
    USER:           "/",
  },
  defaultRedirect: "/",
  routes: {
    signIn:     "/login",
    afterSignOut: "/login",
    afterSignUp:  "/login",
    verify:     "/verify",
  },
  publicRoutes: [
    "/", "/login", "/signup", "/verify",
    "/docs", "/docs/api-reference", "/docs/sdk-reference",
    "/docs/regions", "/docs/methodology", "/docs/ci-cd",
    "/playground",
    "/analyst/signup", "/content_editor/signup",
  ],
  adminPrefix: "/admin",
}
```

---

*End of Carbonix Master Document — Version 3.0*

*This document is the single source of truth for all LLM-assisted development of Carbonix.*
*Feed it in full at the start of every coding session.*

---

## APPENDIX C: COMPLETE API REQUEST/RESPONSE SCHEMAS

### C.1 POST /api/v1/calculate

**Request:**
```typescript
{
  provider: 'aws' | 'gcp' | 'azure'       // required
  region: string                            // required, e.g. 'ap-south-1'
  instanceType: string                      // required, e.g. 't3.medium'
  instanceCount: number                     // required, min: 1, max: 1000
  hoursPerMonth: number                     // required, min: 1, max: 744
  cpuUtilization: number                    // required, 0–1 (e.g. 0.4 = 40%)
  storageGb: number                         // required, min: 0
  ramGb?: number                            // optional override
}
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    id: 'clxyz123...',
    provider: 'aws',
    region: 'ap-south-1',
    regionName: 'Asia Pacific (Mumbai)',
    instanceType: 't3.medium',
    instanceCount: 4,
    hoursPerMonth: 720,
    cpuUtilization: 0.4,
    storageGb: 100,
    ramGb: 4,
    energy_kwh_month: 81.46,
    co2_grams_month: 61095,
    co2_kg_month: 33.8,
    co2_grams_hour: 84.9,
    co2_kg_year: 405.6,
    breakdown: {
      compute_kwh: 63.36,
      memory_kwh: 13.60,
      storage_kwh: 0.20,
      compute_percentage: 77.8,
      memory_percentage: 16.7,
      storage_percentage: 0.2
    },
    rating: 'HIGH',
    ratingColor: '#FF5555',
    realWorldEquivalent: '≈ driving 145 km',
    gridIntensity: 750,
    gridIntensityUnit: 'gCO₂/kWh',
    recommendation: 'Switch to eu-north-1 to reduce emissions by 98%',
    recommendedRegion: 'eu-north-1',
    potentialReduction: 98.1,
    recommendedCo2Kg: 0.65,
    timestamp: '2026-06-11T10:30:00.000Z'
  }
}
```

**Error (400):**
```typescript
{
  success: false,
  error: {
    code: 'INVALID_PARAMS',
    message: 'cpuUtilization must be between 0 and 1',
    details: { field: 'cpuUtilization', received: 1.5, expected: '0–1' }
  }
}
```

---

### C.2 POST /api/v1/compare

**Request:**
```typescript
{
  configs: [
    { provider: 'aws',   region: 'us-east-1',     instanceType: 't3.medium', instanceCount: 4, hoursPerMonth: 720, cpuUtilization: 0.4, storageGb: 100 },
    { provider: 'gcp',   region: 'us-central1',   instanceType: 'n2-standard-2', instanceCount: 4, hoursPerMonth: 720, cpuUtilization: 0.4, storageGb: 100 },
    { provider: 'azure', region: 'eastus',         instanceType: 'Standard_D2s_v3', instanceCount: 4, hoursPerMonth: 720, cpuUtilization: 0.4, storageGb: 100 }
  ]
}
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    results: [
      { provider: 'gcp', co2_kg_month: 30.2, rating: 'HIGH', ...full result },
      { provider: 'aws', co2_kg_month: 33.8, rating: 'HIGH', ...full result },
      { provider: 'azure', co2_kg_month: 34.1, rating: 'HIGH', ...full result }
    ],
    winner: 'gcp',
    winner_co2_kg_month: 30.2,
    largest_co2_kg_month: 34.1,
    comparison_note: 'GCP emits 11% less than Azure for this configuration'
  }
}
```

---

### C.3 POST /api/v1/recommend

**Request:**
```typescript
{
  provider: 'aws',
  region: 'ap-south-1',
  instanceType: 't3.medium',
  instanceCount: 4,
  hoursPerMonth: 720,
  cpuUtilization: 0.4,
  storageGb: 100,
  constraint?: 'same_provider' | 'same_continent' | 'none'  // optional
}
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    current: { region: 'ap-south-1', co2_kg_month: 33.8, gridIntensity: 750 },
    recommendations: [
      {
        rank: 1,
        region: 'eu-north-1',
        regionName: 'EU (Stockholm)',
        co2_kg_month: 0.65,
        gridIntensity: 8,
        reduction_percent: 98.1,
        reduction_kg: 33.15,
        note: 'Near-100% hydro + nuclear. Best option globally.',
        latency_concern: true,
        latency_note: 'High latency from India (~150ms). Consider for batch/non-interactive workloads.'
      },
      {
        rank: 2,
        region: 'us-west-2',
        regionName: 'US West (Oregon)',
        co2_kg_month: 4.2,
        gridIntensity: 130,
        reduction_percent: 87.6,
        reduction_kg: 29.6,
        note: 'Hydro-heavy Pacific Northwest grid. Suitable for global workloads.'
      }
    ]
  }
}
```

---

### C.4 GET /api/v1/history

**Request (query params):**
```
?page=0&limit=20&provider=aws&rating=HIGH&sortBy=createdAt&order=desc
```

**Response (200):**
```typescript
{
  success: true,
  data: {
    calculations: [ ...CalculationResult[] ],
    pagination: {
      total: 156,
      page: 0,
      limit: 20,
      hasMore: true
    }
  }
}
```

---

### C.5 GET /api/v1/admin/feature-flags (Public Endpoint)

**Response (200):**
```typescript
{
  success: true,
  data: {
    flags: {
      config_builder_screen: true,
      results_screen: true,
      compare_screen: true,
      api_console_screen: true,
      history_screen: true,
      sdk_docs_screen: true,
      settings_screen: true,
      push_notifications: true,
      offline_mode: true,
      deep_linking: true,
      maintenance_mode: false,
      maintenance_message: false
    },
    content: {
      maintenance_message: 'We are performing scheduled maintenance.',
    },
    version: 14,
    updatedAt: '2026-06-11T08:00:00.000Z'
  }
}
```

Mobile app polls this every 60 seconds. If `version` changes, re-render the navigation tabs.

---

## APPENDIX D: COMPLETE AGENT IMPLEMENTATIONS

### D.1 Temporal Shifting Agent (Complete)

```typescript
// packages/agents/src/temporal.ts
import { getGridIntensity } from '@carbonix/core'

interface ScheduleOptions {
  region: string
  windowHours: number       // max delay in hours (e.g. 6)
  checkIntervalHours?: number  // how often to sample grid (default: 1)
}

interface ScheduleResult {
  scheduledAt: Date
  estimatedIntensity: number
  delayHours: number
  savingPercent: number
}

export async function scheduleAtLowCarbon(
  job: () => Promise<void>,
  options: ScheduleOptions
): Promise<ScheduleResult> {
  const { region, windowHours, checkIntervalHours = 1 } = options
  const samples: { hour: number; intensity: number }[] = []

  // Sample grid intensity at each hour in the window
  // In production: use Electricity Maps forecast API for future hours
  // For hackathon: use current + static variation based on time-of-day pattern
  const currentIntensity = await getGridIntensity(region)

  // Time-of-day adjustment pattern (ap-south-1 example)
  // Morning 6am-10am: +15% (peak demand)
  // Midday 11am-3pm: -10% (solar contribution)
  // Evening 6pm-10pm: +20% (peak demand)
  // Night 11pm-5am: -20% (low demand, relatively cleaner)
  const now = new Date()
  for (let h = 0; h < windowHours; h += checkIntervalHours) {
    const futureHour = (now.getHours() + h) % 24
    let adjustment = 0
    if (futureHour >= 6 && futureHour <= 10) adjustment = 0.15
    else if (futureHour >= 11 && futureHour <= 15) adjustment = -0.10
    else if (futureHour >= 18 && futureHour <= 22) adjustment = 0.20
    else adjustment = -0.20

    samples.push({
      hour: h,
      intensity: Math.round(currentIntensity * (1 + adjustment))
    })
  }

  // Find lowest-carbon window
  const best = samples.reduce((min, s) => s.intensity < min.intensity ? s : min)
  const delayMs = best.hour * 3_600_000
  const scheduledAt = new Date(Date.now() + delayMs)
  const savingPercent = Math.round((1 - best.intensity / currentIntensity) * 100)

  console.log(
    `[Temporal] Scheduling in ${best.hour}h (${scheduledAt.toISOString()})`,
    `Grid: ${best.intensity} gCO₂/kWh vs current ${currentIntensity} → ${savingPercent}% saving`
  )

  // Execute after delay
  setTimeout(async () => {
    try {
      await job()
      console.log(`[Temporal] Job completed at ${new Date().toISOString()}`)
    } catch (err) {
      console.error('[Temporal] Job failed:', err)
    }
  }, delayMs)

  return {
    scheduledAt,
    estimatedIntensity: best.intensity,
    delayHours: best.hour,
    savingPercent: Math.max(0, savingPercent)
  }
}
```

---

### D.2 Reporter Agent — BRSR Report (Complete)

```typescript
// packages/agents/src/reporter.ts

interface EmissionRecord {
  instanceId: string
  instanceType: string
  region: string
  timestamp: Date
  cpuUtil: number
  carbonKg: number
}

interface BRSRReport {
  reportId: string
  period: string                // YYYY-MM
  generatedAt: string
  scope2_emissions_kg: number
  scope2_emissions_tonne: number
  scope2_emissions_mtco2e: number
  breakdown: {
    compute_kg: number
    storage_kg: number
    network_kg: number
    compute_percent: number
    storage_percent: number
    network_percent: number
  }
  top_emitting_regions: { region: string; carbon_kg: number; percent: number }[]
  top_emitting_instances: { instanceType: string; carbon_kg: number; count: number }[]
  methodology: string
  data_sources: string[]
  disclaimer: string
}

export function generateBRSRReport(monthlyRecords: EmissionRecord[]): BRSRReport {
  const totalKg = monthlyRecords.reduce((sum, r) => sum + r.carbonKg, 0)

  // Region breakdown
  const regionTotals: Record<string, number> = {}
  const instanceTotals: Record<string, { kg: number; count: number }> = {}

  for (const r of monthlyRecords) {
    regionTotals[r.region] = (regionTotals[r.region] || 0) + r.carbonKg
    if (!instanceTotals[r.instanceType]) instanceTotals[r.instanceType] = { kg: 0, count: 0 }
    instanceTotals[r.instanceType].kg += r.carbonKg
    instanceTotals[r.instanceType].count++
  }

  const topRegions = Object.entries(regionTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([region, carbon_kg]) => ({
      region,
      carbon_kg: Math.round(carbon_kg * 100) / 100,
      percent: Math.round((carbon_kg / totalKg) * 1000) / 10
    }))

  const topInstances = Object.entries(instanceTotals)
    .sort(([, a], [, b]) => b.kg - a.kg)
    .slice(0, 5)
    .map(([instanceType, data]) => ({
      instanceType,
      carbon_kg: Math.round(data.kg * 100) / 100,
      count: data.count
    }))

  return {
    reportId: `BRSR-${new Date().toISOString().slice(0, 7)}-${Date.now()}`,
    period: new Date().toISOString().slice(0, 7),
    generatedAt: new Date().toISOString(),
    scope2_emissions_kg: Math.round(totalKg * 100) / 100,
    scope2_emissions_tonne: Math.round(totalKg / 10) / 100,
    scope2_emissions_mtco2e: Math.round(totalKg / 1000000 * 1000) / 1000,
    breakdown: {
      compute_kg: Math.round(totalKg * 0.75 * 100) / 100,
      storage_kg: Math.round(totalKg * 0.15 * 100) / 100,
      network_kg: Math.round(totalKg * 0.10 * 100) / 100,
      compute_percent: 75,
      storage_percent: 15,
      network_percent: 10
    },
    top_emitting_regions: topRegions,
    top_emitting_instances: topInstances,
    methodology: 'Cloud Carbon Footprint methodology using CPU TDP × utilization × PUE × grid carbon intensity (gCO₂/kWh). Grid intensity sourced from Electricity Maps API with CCF defaults as fallback.',
    data_sources: [
      'Cloud Carbon Footprint dataset (github.com/cloud-carbon-footprint)',
      'Electricity Maps API (electricitymaps.com)',
      'AWS CloudWatch Metrics'
    ],
    disclaimer: 'Scope 2 location-based emissions. Market-based accounting not included. Data represents compute workloads monitored by Carbonix agents only.'
  }
}
```

---

## APPENDIX E: EAS & APP CONFIGURATION FILES

### E.1 `apps/mobile/eas.json`

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleDebug",
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "staging",
        "EXPO_PUBLIC_API_URL": "https://staging-api.carbonix.dev/api/v1"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_ENVIRONMENT": "production",
        "EXPO_PUBLIC_API_URL": "https://api.carbonix.dev/api/v1"
      }
    }
  },
  "submit": {}
}
```

### E.2 `apps/mobile/app.json`

```json
{
  "expo": {
    "name": "Carbonix",
    "slug": "carbonix",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "carbonix",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#121212"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "dev.carbonix.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#121212"
      },
      "package": "dev.carbonix.app"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      [
        "expo-notifications",
        {
          "icon": "./assets/images/notification-icon.png",
          "color": "#BD93F9"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    },
    "updates": {
      "url": "https://u.expo.dev/your-eas-project-id"
    },
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

---

## APPENDIX F: ZUSTAND STORES (COMPLETE IMPLEMENTATION)

### F.1 Auth Store

```typescript
// apps/mobile/stores/authStore.ts
import { create } from 'zustand'
import * as SecureStore from 'expo-secure-store'
import { apiClient } from '../lib/apiClient'

interface User {
  id: string
  email: string
  name: string
  theme: 'dark' | 'light' | 'system'
  notificationsEnabled: boolean
  carbonAlertThreshold: number
  defaultProvider?: 'aws' | 'gcp' | 'azure'
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loadFromStorage: () => Promise<void>
  refreshToken: () => Promise<boolean>
}

const TOKEN_KEY = 'carbonix_jwt'
const REFRESH_KEY = 'carbonix_refresh'

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  loadFromStorage: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const res = await apiClient.get('/auth/me')
        set({ user: res.data.data, token, isAuthenticated: true })
      }
    } catch {
      await SecureStore.deleteItemAsync(TOKEN_KEY)
      await SecureStore.deleteItemAsync(REFRESH_KEY)
    } finally {
      set({ isLoading: false })
    }
  },

  login: async (email, password) => {
    const res = await apiClient.post('/auth/login', { email, password })
    const { user, accessToken, refreshToken } = res.data.data
    await SecureStore.setItemAsync(TOKEN_KEY, accessToken)
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    set({ user, token: accessToken, isAuthenticated: true })
  },

  signup: async (name, email, password) => {
    const res = await apiClient.post('/auth/register', { name, email, password })
    const { user, accessToken, refreshToken } = res.data.data
    await SecureStore.setItemAsync(TOKEN_KEY, accessToken)
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    set({ user, token: accessToken, isAuthenticated: true })
  },

  logout: async () => {
    await apiClient.post('/auth/logout').catch(() => {})
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    await SecureStore.deleteItemAsync(REFRESH_KEY)
    delete apiClient.defaults.headers.common['Authorization']
    set({ user: null, token: null, isAuthenticated: false })
  },

  refreshToken: async () => {
    try {
      const refresh = await SecureStore.getItemAsync(REFRESH_KEY)
      if (!refresh) return false
      const res = await apiClient.post('/auth/refresh', { refreshToken: refresh })
      const { accessToken } = res.data.data
      await SecureStore.setItemAsync(TOKEN_KEY, accessToken)
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      set({ token: accessToken })
      return true
    } catch {
      return false
    }
  }
}))
```

### F.2 Feature Flag Store

```typescript
// apps/mobile/stores/featureFlagStore.ts
import { create } from 'zustand'
import { apiClient } from '../lib/apiClient'

interface FeatureFlags {
  config_builder_screen: boolean
  results_screen: boolean
  compare_screen: boolean
  api_console_screen: boolean
  history_screen: boolean
  sdk_docs_screen: boolean
  settings_screen: boolean
  push_notifications: boolean
  offline_mode: boolean
  deep_linking: boolean
  maintenance_mode: boolean
  maintenance_message: boolean
}

interface FeatureFlagStore {
  flags: FeatureFlags
  maintenanceMessage: string
  version: number
  lastFetched: number | null
  fetchFlags: () => Promise<void>
  isEnabled: (key: keyof FeatureFlags) => boolean
  startPolling: () => () => void  // returns cleanup function
}

const DEFAULT_FLAGS: FeatureFlags = {
  config_builder_screen: true,
  results_screen: true,
  compare_screen: true,
  api_console_screen: true,
  history_screen: true,
  sdk_docs_screen: true,
  settings_screen: true,
  push_notifications: true,
  offline_mode: true,
  deep_linking: true,
  maintenance_mode: false,
  maintenance_message: false,
}

export const useFeatureFlagStore = create<FeatureFlagStore>((set, get) => ({
  flags: DEFAULT_FLAGS,
  maintenanceMessage: '',
  version: 0,
  lastFetched: null,

  fetchFlags: async () => {
    try {
      const res = await apiClient.get('/admin/feature-flags')
      const { flags, content, version } = res.data.data
      set({
        flags: { ...DEFAULT_FLAGS, ...flags },
        maintenanceMessage: content?.maintenance_message || '',
        version,
        lastFetched: Date.now()
      })
    } catch {
      // Keep existing flags on error
    }
  },

  isEnabled: (key) => get().flags[key] ?? true,

  startPolling: () => {
    const interval = setInterval(() => {
      get().fetchFlags()
    }, 60_000)  // every 60 seconds
    get().fetchFlags() // immediate first fetch
    return () => clearInterval(interval)
  }
}))
```

### F.3 Config Store

```typescript
// apps/mobile/stores/configStore.ts
import { create } from 'zustand'

interface CalcConfig {
  provider: 'aws' | 'gcp' | 'azure'
  region: string
  instanceType: string
  instanceCount: number
  hoursPerMonth: number
  cpuUtilization: number
  storageGb: number
  ramGb: number
}

interface ConfigStore {
  lastConfig: CalcConfig | null
  lastResultId: string | null
  setLastConfig: (config: CalcConfig) => void
  setLastResultId: (id: string) => void
  resetConfig: () => void
}

const DEFAULT_CONFIG: CalcConfig = {
  provider: 'aws',
  region: 'ap-south-1',
  instanceType: 't3.medium',
  instanceCount: 1,
  hoursPerMonth: 720,
  cpuUtilization: 0.4,
  storageGb: 20,
  ramGb: 4,
}

export const useConfigStore = create<ConfigStore>((set) => ({
  lastConfig: DEFAULT_CONFIG,
  lastResultId: null,
  setLastConfig: (config) => set({ lastConfig: config }),
  setLastResultId: (id) => set({ lastResultId: id }),
  resetConfig: () => set({ lastConfig: DEFAULT_CONFIG, lastResultId: null }),
}))
```

---

## APPENDIX G: AXIOS INSTANCE & INTERCEPTORS

```typescript
// apps/mobile/lib/apiClient.ts
import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Request interceptor — attach timing
apiClient.interceptors.request.use((config) => {
  (config as any).metadata = { startTime: Date.now() }
  return config
})

// Response interceptor — handle 401 with token refresh
let isRefreshing = false
let failedQueue: Array<{ resolve: (value: any) => void; reject: (error: any) => void }> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => {
    // Attach response time
    const duration = Date.now() - (response.config as any).metadata?.startTime
    response.headers['x-response-time-ms'] = duration
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      const success = await useAuthStore.getState().refreshToken()

      if (success) {
        const token = useAuthStore.getState().token
        processQueue(null, token)
        isRefreshing = false
        originalRequest.headers['Authorization'] = `Bearer ${token}`
        return apiClient(originalRequest)
      } else {
        processQueue(error, null)
        isRefreshing = false
        await useAuthStore.getState().logout()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)
```

---

## APPENDIX H: EXPRESS APP SETUP (COMPLETE MIDDLEWARE CHAIN)

```typescript
// services/api/src/app.ts
import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import compression from 'compression'
import { json } from 'express'
import { requestLogger } from './lib/logger'
import { errorHandler } from './middleware/error.middleware'
import { setupSwagger } from './config/swagger'

// Routes
import authRoutes      from './modules/auth/auth.routes'
import carbonRoutes    from './modules/carbon/carbon.routes'
import historyRoutes   from './modules/history/history.routes'
import referenceRoutes from './modules/reference/reference.routes'
import adminRoutes     from './modules/admin/admin.routes'

export function createApp(): Application {
  const app = express()

  // ── Security ──────────────────────────────────────────────────────────────
  app.use(helmet())
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
  }))

  // ── Body Parsing ──────────────────────────────────────────────────────────
  app.use(json({ limit: '10kb' }))
  app.use(compression())

  // ── Logging ───────────────────────────────────────────────────────────────
  app.use(requestLogger)

  // ── Global Rate Limiter ───────────────────────────────────────────────────
  app.use('/api/v1', rateLimit({
    windowMs: 60_000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' } }
  }))

  // ── Health Check ──────────────────────────────────────────────────────────
  app.get('/api/v1/health', (req, res) => {
    res.json({ success: true, status: 'healthy', timestamp: new Date().toISOString() })
  })

  // ── API Routes ────────────────────────────────────────────────────────────
  app.use('/api/v1/auth',       authRoutes)
  app.use('/api/v1',            carbonRoutes)
  app.use('/api/v1/history',    historyRoutes)
  app.use('/api/v1',            referenceRoutes)
  app.use('/api/v1/admin',      adminRoutes)

  // ── Swagger Docs ──────────────────────────────────────────────────────────
  setupSwagger(app)

  // ── Global Error Handler (must be last) ───────────────────────────────────
  app.use(errorHandler)

  return app
}
```

---

## APPENDIX I: TECHNICAL REQUIREMENTS SUMMARY

### I.1 API Performance Targets

| Metric | Target |
| :--- | :--- |
| `/calculate` response (p95) | < 200ms |
| `/compare` response (p95) | < 500ms (3 parallel calculations) |
| Concurrent connections | 500+ |
| Uptime SLA | 99.5% |
| Database query time (p95) | < 50ms |

### I.2 Mobile Performance Targets

| Metric | Target |
| :--- | :--- |
| Cold start | < 2 seconds |
| Screen transition | < 300ms |
| API response render | < 500ms after response |
| JS bundle size | < 5 MB |
| Idle memory | < 150 MB |
| Frame rate | ≥ 58 FPS |

### I.3 Website Performance Targets

| Metric | Target |
| :--- | :--- |
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| FID / INP | < 200ms |
| CLS | < 0.1 |

### I.4 JWT Configuration

| Parameter | Value |
| :--- | :--- |
| Algorithm | HS256 |
| Access Token Expiry | 15 minutes |
| Refresh Token Expiry | 7 days |
| Token Storage (Mobile) | Expo Secure Store |
| Token Storage (Web) | HttpOnly Cookie |
| Password Hashing | bcrypt (12 salt rounds) |

### I.5 SDK Package Spec

| Attribute | Value |
| :--- | :--- |
| Package Name | `carbonix` |
| Registry | npm |
| Module System | ESM + CJS dual build |
| Bundle Target | ES2020 |
| Type Definitions | Included (.d.ts) |
| Bundle Size | < 15 KB gzipped |
| Dependencies | Minimal (axios or native fetch) |

### I.6 SDK Error Codes

```
'INVALID_API_KEY'          → 401: Bad or missing API key
'RATE_LIMIT_EXCEEDED'      → 429: Too many requests
'INVALID_PARAMS'           → 400: Bad input parameters
'PROVIDER_NOT_SUPPORTED'   → 400: Unknown cloud provider
'REGION_NOT_FOUND'         → 404: Unknown region code
'INSTANCE_TYPE_NOT_FOUND'  → 404: Unknown instance type
'SERVER_ERROR'             → 500: Internal API error
'NETWORK_ERROR'            → N/A: Client-side network failure
```

### I.7 Testing Requirements

| Layer | Framework | Coverage Target |
| :--- | :--- | :--- |
| API | Jest + Supertest | ≥ 80% |
| SDK | Jest | ≥ 90% |
| Mobile | Jest + RNTL | ≥ 60% |
| Website | Jest + RTL | ≥ 60% |
| E2E | Detox (Mobile) / Playwright (Web) | Critical paths only |

**Critical Path Tests:**
1. Config → Calculate → Display result (33.8 kg for ap-south-1 4×t3.medium)
2. Compare all providers → winner shown
3. Register → Login → Refresh token → Logout
4. `new Carbonix()` → `calculateCarbon()` → structured response
5. Admin login → Feature flag toggle → Mobile app reflects change within 60s

---

## APPENDIX J: DEPLOYMENT TOPOLOGY

```
carbonix.dev         → Vercel (Next.js 14 website + admin panel)
api.carbonix.dev     → Railway (Express API, Node.js 18)
carbonix_api DB      → Neon PostgreSQL (or Railway PostgreSQL)
carbonix_web DB      → Neon PostgreSQL (separate instance)
Mobile APK           → EAS Build → distributed via internal link on demo day
SDK                  → npmjs.com/package/carbonix
```

### J.1 Railway Service Config

```
Service: carbonix-api
Build Command: npm run build
Start Command: npm run start:prod
Health Check: GET /api/v1/health
Port: 3001
Memory: 512 MB (free tier)
```

### J.2 Deployment Checklist Before Demo Day

- [ ] EAS production build APK generated and installed on demo device
- [ ] `api.carbonix.dev` live and `/health` returning 200
- [ ] `carbonix.dev` live and landing page loading
- [ ] Database seeded with all regions, instances, providers
- [ ] Default feature flags seeded
- [ ] Super admin account created
- [ ] SDK published to npm (`npm install carbonix` works)
- [ ] CI/CD carbon gate tested on a real GitHub PR
- [ ] Push notification tested end-to-end
- [ ] Offline mode tested (airplane mode on device)
- [ ] Deep link tested (carbonix://results/[id] opens app)
- [ ] All 4 tabs on mobile app functional
- [ ] Admin panel: feature flag toggle tested (mobile app reflects in 60s)

---

## APPENDIX K: STITCH MCP DESIGN REFERENCE

The following screens were designed in the Stitch MCP "Midnight Developer Interface" project and should be used as visual reference during development.

**Design System Source:**
```
Design Tool: Stitch MCP (Google)
Project ID: projects/18234059665191599873
Color Mode: DARK
Font Family: Inter (UI) + JetBrains Mono (Data)
Roundness: ROUND_FOUR (4px base)
Custom Primary: #BD93F9 (Electric Purple)
```

**Mobile Screen IDs:**

| Screen | Stitch Screen ID |
| :--- | :--- |
| Config Builder | `a357580dc3874936b739316f497b8696` |
| Calculation Results | `8e88b6de0938434a8283d31436aec98c` |
| Compare Providers | `cf19a951b4a6436cb0d2a3744cfcdac4` |
| API Console | `50249fa314c5439a9645024f970447e7` |
| Calculation History | `224cf81a123a4e3fadeab4a8f816df77` |
| History with Trends | `5959139084b341c98598a5edffb41c47` |
| Settings | `10de0fdae7a34091a5ab3ff1bce2754e` |
| SDK Documentation | `cfd34e9a00db41348d61b6dfbad12081` |
| Logo | `b9fe31f9b4e9488a9f6336b0986015d6` |

**Website Screen IDs:**

| Screen | Stitch Screen ID |
| :--- | :--- |
| Landing Page | `de1913d6c4614b4e96e09f390e2c8f43` |
| Developer Documentation | `788a8b05ce3b4d7e80dc97f22dfd86c4` |
| Admin Panel Dashboard | `dec2ff342db44ad298deaf266352de43` |
| Feature Control Panel | `eda47494d36a44c3b25d0488a94237bb` |

---

## APPENDIX L: GLASSMORPHISM & ANIMATION SPECS

### L.1 Glass Effects

```css
/* Modal / Bottom Sheet */
.glass-overlay {
  background: rgba(30, 30, 30, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

/* Premium card (result card, recommendation card) */
.glass-card {
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

/* Sticky navbar */
.glass-nav {
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #2D2D2D;
}

/* Data glow — live metrics */
.glow-live     { box-shadow: 0 0 20px rgba(139, 233, 253, 0.15); }
.glow-critical { box-shadow: 0 0 20px rgba(255, 85, 85, 0.2); }
.glow-success  { box-shadow: 0 0 20px rgba(80, 250, 123, 0.15); }
.glow-primary  { box-shadow: 0 0 20px rgba(189, 147, 249, 0.15); }
```

### L.2 Animation Patterns (React Native Reanimated)

```typescript
// CO₂ result card — spring entrance animation
const resultCardAnim = useSharedValue(0)
useEffect(() => {
  resultCardAnim.value = withSpring(1, { damping: 15, stiffness: 100 })
}, [])
const animatedStyle = useAnimatedStyle(() => ({
  opacity: resultCardAnim.value,
  transform: [{ translateY: interpolate(resultCardAnim.value, [0, 1], [30, 0]) }]
}))

// CRITICAL badge — pulse animation
const pulseAnim = useSharedValue(1)
useEffect(() => {
  pulseAnim.value = withRepeat(
    withSequence(withTiming(1.1, { duration: 600 }), withTiming(1.0, { duration: 600 })),
    -1, true
  )
}, [])

// Loading bar on Calculate button
const loadingAnim = useSharedValue(0)
// Animate from 0 → 85% in 1.5s (stays until API responds)
// Then jump to 100% and fade out on success
```

### L.3 Chart Colors (Victory Native)

```typescript
const CHART_COLORS = {
  compute:     '#BD93F9',   // Purple
  memory:      '#8BE9FD',   // Cyan
  storage:     '#50FA7B',   // Green
  gridLines:   'rgba(255, 255, 255, 0.06)',
  axisLabels:  '#9CA3AF',
  dataValues:  '#E5E7EB',
}

// Breakdown bar chart
const breakdownData = [
  { x: 'Compute', y: result.breakdown.compute_kwh,  fill: CHART_COLORS.compute  },
  { x: 'Memory',  y: result.breakdown.memory_kwh,   fill: CHART_COLORS.memory   },
  { x: 'Storage', y: result.breakdown.storage_kwh,  fill: CHART_COLORS.storage  },
]
```

---

*End of Carbonix Master Document — Version 3.0 (Complete)*

*Document stats: ~2800 lines, ~105KB*
*This is the single source of truth. Feed in full at the start of every LLM coding session.*
*Last updated: June 11, 2026*
