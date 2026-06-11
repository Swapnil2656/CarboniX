<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# FEATURES - Context from Master Document

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