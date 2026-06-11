<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# PRD - Context from Master Document

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
