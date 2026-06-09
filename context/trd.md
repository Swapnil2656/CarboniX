# Technical Requirements Document (TRD): Carbonix

> **Version:** 1.0  
> **Last Updated:** June 9, 2026  
> **Author:** Team Carbonix  
> **Status:** Draft  

---

## 1. Document Purpose & Scope

This Technical Requirements Document (TRD) defines the complete technical specifications, constraints, and implementation requirements for Carbonix — a developer-first carbon footprint calculation platform. It translates the Product Requirements Document (PRD) and Features specification into actionable engineering specifications.

**Scope:** This document covers the Expo mobile application, Node.js backend API, TypeScript SDK (`carbonix` npm package), Next.js documentation website with admin panel, and all supporting infrastructure.

---

## 2. System Overview

### 2.1 Architecture Pattern

Carbonix follows a **three-layer monorepo architecture** managed by Turborepo:

```
┌──────────────────────────────────────────────────────────────┐
│                     Layer 3: Presentation                     │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Expo Mobile App │  │  Next.js Web  │  │  Admin Panel   │  │
│  │  (React Native)  │  │  (Landing +   │  │  (Protected    │  │
│  │                  │  │   Docs)       │  │   Dashboard)   │  │
│  └────────┬─────────┘  └──────┬───────┘  └───────┬────────┘  │
├───────────┼───────────────────┼───────────────────┼───────────┤
│           │        Layer 2: SDK Abstraction        │          │
│           │  ┌──────────────────────────────┐      │          │
│           │  │   carbonix npm package        │     │          │
│           │  │   (TypeScript SDK)            │     │          │
│           │  └──────────────┬───────────────┘      │          │
├───────────┼─────────────────┼──────────────────────┼──────────┤
│           │        Layer 1: Backend API            │          │
│  ┌────────┴─────────────────┴──────────────────────┴────────┐ │
│  │            Node.js + Express REST API                     │ │
│  │  ┌──────────┐ ┌──────────────┐ ┌─────────────────────┐   │ │
│  │  │  Carbon  │ │ Auth & RBAC  │ │ Feature Flags /     │   │ │
│  │  │  Engine  │ │ Middleware   │ │ Remote Config       │   │ │
│  │  └──────────┘ └──────────────┘ └─────────────────────┘   │ │
│  │  ┌──────────────────────────────────────────────────┐     │ │
│  │  │            MongoDB + Mongoose ODM                │     │ │
│  │  └──────────────────────────────────────────────────┘     │ │
│  └───────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Communication Protocols

| Interface | Protocol | Format | Auth |
| :--- | :--- | :--- | :--- |
| Mobile ↔ API | HTTPS REST | JSON | JWT Bearer Token |
| Website ↔ API | HTTPS REST | JSON | JWT Bearer Token (Admin) / API Key (Public) |
| SDK ↔ API | HTTPS REST | JSON | API Key Header |
| Admin ↔ API | HTTPS REST | JSON | JWT Bearer Token + Role Middleware |
| Mobile ← Push | Expo Push API | JSON | Expo Push Token |

---

## 3. Mobile Application Technical Requirements

### 3.1 Framework & Runtime

| Requirement | Specification |
| :--- | :--- |
| **Framework** | Expo SDK (latest stable) |
| **Language** | TypeScript (strict mode) |
| **Navigation** | Expo Router (file-based routing) |
| **Minimum iOS** | iOS 15.0+ |
| **Minimum Android** | Android API 24 (Android 7.0)+ |
| **Target Platforms** | Android (primary for demo), iOS (secondary) |

### 3.2 Mandatory Expo Features

These Expo-native modules **must** be utilized per hackathon requirements:

| Feature | Expo Module | Purpose |
| :--- | :--- | :--- |
| **EAS Build** | `eas-cli` | Cloud builds, APK generation for demo day |
| **EAS Update** | `expo-updates` | Over-the-air updates post-demo |
| **Push Notifications** | `expo-notifications` | Carbon threshold alerts |
| **Secure Storage** | `expo-secure-store` | JWT token persistence |
| **File System** | `expo-file-system` | JSON export of history |
| **Deep Linking** | `expo-linking` | Share results via URL |
| **Splash Screen** | `expo-splash-screen` | Branded loading experience |
| **Constants** | `expo-constants` | Environment config access |
| **Animations** | `react-native-reanimated` | Smooth UI transitions |
| **Gesture Handling** | `react-native-gesture-handler` | Swipe-to-delete, pull-to-refresh |

### 3.3 State Management & Networking

| Concern | Library | Justification |
| :--- | :--- | :--- |
| Global State | Zustand | Lightweight, minimal boilerplate |
| Server State | TanStack React Query (v5) | Caching, background refetch, optimistic updates |
| HTTP Client | Axios | Interceptors for auth headers, request timing |
| Form State | React Hook Form | Performance-optimized form handling |

### 3.4 Data Visualization

| Library | Usage |
| :--- | :--- |
| Victory Native | Bar charts (carbon breakdown), line charts (history trends) |
| React Native SVG | Custom carbon rating badges, animated gauges |

### 3.5 Mobile Screen Requirements

| Screen | Route | Priority | Offline Support |
| :--- | :--- | :--- | :--- |
| Config Builder | `/(tabs)/config` | P0 | No (requires API) |
| Results | `/results/[id]` | P0 | Yes (cached last result) |
| Compare | `/(tabs)/compare` | P0 | No |
| API Console | `/(tabs)/console` | P0 | No |
| History | `/(tabs)/history` | P1 | Yes (local cache) |
| SDK Docs | `/docs` | P1 | Partial (static content) |
| Settings | `/settings` | P2 | Yes |
| Auth (Login/Signup) | `/auth/login`, `/auth/signup` | P0 | No |

### 3.6 Performance Targets (Mobile)

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| App Launch (cold start) | < 2 seconds | Expo performance monitor |
| Screen transition | < 300ms | React Native performance API |
| API response render | < 500ms after response | Custom timing |
| Bundle size (JS) | < 5 MB | EAS Build report |
| Memory usage (idle) | < 150 MB | Android Profiler |
| Frame rate | ≥ 58 FPS | React Native Perf Monitor |

### 3.7 Expo LLM Documentation Integration

As per [Expo's LLM documentation guidelines](https://docs.expo.dev/llms/), the following resources will be used during development:

| Resource | URL | Purpose |
| :--- | :--- | :--- |
| Per-page Markdown | `https://docs.expo.dev/<path>.md` | AI-assisted development with Expo APIs |
| Full Docs Bundle | `/llms-full.txt` (~1.9 MB) | Complete Expo reference for coding agents |
| EAS Bundle | `/llms-eas.txt` (~1.0 MB) | EAS Build/Update/Workflows reference |
| SDK Bundle | `/llms-sdk.txt` (~2.8 MB) | Latest Expo SDK API reference |

**Implementation approach:** During the build phase, coding agents will consume these markdown endpoints to ensure up-to-date usage of Expo APIs, particularly for:
- `expo-notifications` setup with EAS credentials
- `expo-secure-store` encryption configuration
- `expo-router` file-based routing patterns
- `expo-updates` OTA deployment workflows
- EAS Build configuration (`eas.json`) and workflow YAML definitions

---

## 4. Backend API Technical Requirements

### 4.1 Runtime & Framework

| Requirement | Specification |
| :--- | :--- |
| **Runtime** | Node.js ≥ 18 LTS |
| **Framework** | Express.js 4.x |
| **Language** | TypeScript (strict mode) |
| **API Style** | RESTful with OpenAPI 3.0 spec |
| **Documentation** | Swagger UI at `/docs` |
| **Process Manager** | PM2 (production) |

### 4.2 Core API Endpoints

#### 4.2.1 Carbon Calculation Engine

| Endpoint | Method | Auth | Rate Limit | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/calculate` | POST | API Key / JWT | 100 req/min | Calculate carbon footprint for a config |
| `/api/v1/compare` | POST | API Key / JWT | 50 req/min | Compare emissions across providers/regions |
| `/api/v1/recommend` | POST | API Key / JWT | 50 req/min | Get greener deployment recommendations |
| `/api/v1/history` | GET | JWT | 30 req/min | Retrieve user's calculation history |
| `/api/v1/history/:id` | GET | JWT | 30 req/min | Get a specific calculation |
| `/api/v1/history/:id` | DELETE | JWT | 10 req/min | Delete a calculation |

#### 4.2.2 Authentication

| Endpoint | Method | Auth | Rate Limit | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/auth/register` | POST | None | 5 req/min | User registration |
| `/api/v1/auth/login` | POST | None | 10 req/min | User login, returns JWT |
| `/api/v1/auth/refresh` | POST | Refresh Token | 10 req/min | Refresh access token |
| `/api/v1/auth/logout` | POST | JWT | 10 req/min | Invalidate session |
| `/api/v1/auth/me` | GET | JWT | 30 req/min | Get current user profile |

#### 4.2.3 Admin API

| Endpoint | Method | Auth | Rate Limit | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/api/v1/admin/dashboard` | GET | JWT (Admin+) | 30 req/min | Dashboard overview data |
| `/api/v1/admin/analytics` | GET | JWT (Analyst+) | 20 req/min | Analytics charts data |
| `/api/v1/admin/users` | GET | JWT (Admin+) | 20 req/min | List all mobile users |
| `/api/v1/admin/users/:id` | GET | JWT (Admin+) | 20 req/min | User detail + history |
| `/api/v1/admin/users/:id/ban` | POST | JWT (Admin+) | 5 req/min | Ban a device/user |
| `/api/v1/admin/feature-flags` | GET | Public | 60 req/min | Get active feature flags |
| `/api/v1/admin/feature-flags` | PUT | JWT (Admin+) | 10 req/min | Update feature flags |
| `/api/v1/admin/config` | GET | Public | 60 req/min | Get remote config (thresholds, recommendations) |
| `/api/v1/admin/config` | PUT | JWT (Admin+/Content) | 10 req/min | Update remote config |
| `/api/v1/admin/api-keys` | GET | JWT (Admin+) | 10 req/min | List SDK API keys |
| `/api/v1/admin/api-keys` | POST | JWT (Admin+) | 5 req/min | Generate new API key |
| `/api/v1/admin/api-keys/:id` | DELETE | JWT (Admin+) | 5 req/min | Revoke API key |
| `/api/v1/admin/team` | GET | JWT (Super Admin) | 10 req/min | List team members |
| `/api/v1/admin/team/invite` | POST | JWT (Super Admin) | 5 req/min | Invite team member |
| `/api/v1/admin/team/:id` | DELETE | JWT (Super Admin) | 5 req/min | Remove team member |
| `/api/v1/admin/notifications` | POST | JWT (Admin+) | 5 req/min | Send push notification |
| `/api/v1/admin/audit-log` | GET | JWT (Admin+) | 10 req/min | View audit trail |

#### 4.2.4 SDK / Public

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/v1/docs` | GET | None | OpenAPI/Swagger UI |
| `/api/v1/health` | GET | None | Health check |
| `/api/v1/regions` | GET | None | List supported regions + grid intensities |
| `/api/v1/instances` | GET | None | List supported instance types |
| `/api/v1/providers` | GET | None | List supported cloud providers |

### 4.3 Carbon Calculation Engine Specification

#### 4.3.1 Formula

```
energy_kwh = (cpu_tdp_watts × cpu_utilization × hours × instances) / 1000
           + (ram_gb × 0.000392 × hours × instances)
           + (storage_gb × 0.0000002 × hours × instances)

co2_grams = energy_kwh × grid_intensity_gCO2_per_kWh
co2_kg = co2_grams / 1000
```

#### 4.3.2 Data Sources

| Data | Source | Update Frequency |
| :--- | :--- | :--- |
| CPU TDP (Watts) | Cloud Carbon Footprint Dataset | Static (seeded) |
| Instance Specifications | Cloud Carbon Footprint + provider docs | Quarterly |
| Grid Intensity (gCO₂/kWh) | Electricity Maps API + CCF defaults | Real-time (Electricity Maps) or static fallback |
| Region Mappings | Custom mapping table | As providers add regions |

#### 4.3.3 Supported Providers & Region Sample

| Provider | Region Count | Key Regions |
| :--- | :--- | :--- |
| AWS | 30+ | us-east-1, eu-west-1, eu-north-1, ap-southeast-1 |
| GCP | 35+ | us-central1, europe-west1, europe-north1 |
| Azure | 60+ | eastus, westeurope, northeurope, swedencentral |

#### 4.3.4 Response Shape

```typescript
interface CalculationResult {
  id: string;
  provider: 'aws' | 'gcp' | 'azure';
  region: string;
  instanceType: string;
  instanceCount: number;
  hoursPerMonth: number;
  cpuUtilization: number;
  storageGB: number;
  ramGB: number;
  
  // Results
  energy_kwh_month: number;
  co2_grams_month: number;
  co2_kg_month: number;
  co2_grams_hour: number;
  
  // Breakdown
  breakdown: {
    compute_kwh: number;
    memory_kwh: number;
    storage_kwh: number;
    compute_percentage: number;
    memory_percentage: number;
    storage_percentage: number;
  };
  
  // Rating
  rating: 'low' | 'medium' | 'high' | 'critical';
  ratingColor: string;
  
  // Context
  realWorldEquivalent: string;  // e.g., "≈ driving 73 km"
  gridIntensity: number;
  gridIntensityUnit: string;
  
  // Recommendation
  recommendation: string;
  recommendedRegion?: string;
  potentialReduction?: number;
  
  timestamp: string;
}
```

### 4.4 Authentication & Authorization

#### 4.4.1 JWT Configuration

| Parameter | Value |
| :--- | :--- |
| Algorithm | HS256 |
| Access Token Expiry | 15 minutes |
| Refresh Token Expiry | 7 days |
| Token Storage (Mobile) | Expo Secure Store |
| Token Storage (Web) | HttpOnly Cookie |
| Password Hashing | bcrypt (12 salt rounds) |

#### 4.4.2 Role-Based Access Control (RBAC)

| Role | Level | Permissions Summary |
| :--- | :--- | :--- |
| `super_admin` | 4 | Full system access, team management |
| `admin` | 3 | All except team management |
| `analyst` | 2 | Read-only dashboard + analytics |
| `content_editor` | 1 | Edit thresholds, recommendations, landing page content |
| `user` | 0 | Mobile app user, own data access |

### 4.5 Security Requirements

| Requirement | Implementation |
| :--- | :--- |
| HTTPS | Enforced via deployment platform (Railway) |
| CORS | Whitelist: mobile app, website domain |
| Rate Limiting | `express-rate-limit` per endpoint group |
| Input Validation | `zod` schema validation on all inputs |
| SQL/NoSQL Injection | Mongoose parameterized queries |
| XSS Prevention | `helmet` middleware |
| API Key Hashing | SHA-256 hashed storage, prefix exposed |
| Request Logging | Structured JSON logs (Winston) |
| Audit Trail | All admin actions logged with actor, action, timestamp |

### 4.6 Performance Targets (API)

| Metric | Target |
| :--- | :--- |
| `/calculate` response time (p95) | < 200ms |
| `/compare` response time (p95) | < 500ms (3 parallel calcs) |
| Concurrent connections | 500+ |
| Uptime SLA | 99.5% |
| Database query time (p95) | < 50ms |

---

## 5. SDK Package Technical Requirements

### 5.1 Package Specification

| Attribute | Value |
| :--- | :--- |
| **Package Name** | `carbonix` |
| **Registry** | npm |
| **Language** | TypeScript |
| **Module System** | ESM + CJS dual build |
| **Bundle Target** | ES2020 |
| **Type Definitions** | Included (`.d.ts`) |
| **Dependencies** | Minimal (only `axios` or native `fetch`) |
| **Bundle Size** | < 15 KB gzipped |

### 5.2 Public API Surface

```typescript
// Initialization
class Carbonix {
  constructor(config: CarbonixConfig);
  
  // Core Methods
  calculateCarbon(params: CalculateParams): Promise<CalculationResult>;
  compareProviders(params: CompareParams): Promise<ComparisonResult>;
  getRecommendation(params: RecommendParams): Promise<RecommendationResult>;
  
  // History
  getHistory(options?: HistoryOptions): Promise<HistoryResult>;
  getCalculation(id: string): Promise<CalculationResult>;
  
  // Reference
  getRegions(provider?: Provider): Promise<Region[]>;
  getInstanceTypes(provider: Provider): Promise<InstanceType[]>;
  getProviders(): Promise<Provider[]>;
}

interface CarbonixConfig {
  apiKey: string;
  baseUrl?: string;  // defaults to production
  timeout?: number;  // defaults to 10000ms
  retries?: number;  // defaults to 3
}
```

### 5.3 Error Handling

```typescript
class CarbonixError extends Error {
  code: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

// Error codes
'INVALID_API_KEY'
'RATE_LIMIT_EXCEEDED'
'INVALID_PARAMS'
'PROVIDER_NOT_SUPPORTED'
'REGION_NOT_FOUND'
'INSTANCE_TYPE_NOT_FOUND'
'SERVER_ERROR'
'NETWORK_ERROR'
```

---

## 6. Website Technical Requirements

### 6.1 Technology Stack

| Requirement | Specification |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Charts (Admin)** | Recharts |
| **Code Highlighting** | Prism.js / Shiki |
| **Deployment** | Vercel |

### 6.2 Website Sections

#### 6.2.1 Public Landing Page

| Section | Requirements |
| :--- | :--- |
| Hero | Animated carbon counter, SDK code snippet, dual CTAs |
| Problem | Data center emissions stats, grid intensity map |
| How It Works | 3-step interactive flow with embedded live demo |
| SDK Install | `npm install carbonix`, JS/TS toggle, copy button |
| Provider Comparison | Static chart (editable from admin) |
| Footer | GitHub, npm, docs, contact links |

#### 6.2.2 Documentation Portal

| Page | Content |
| :--- | :--- |
| Quick Start | Install → Auth → First calculation |
| API Reference | All endpoints with request/response examples |
| SDK Reference | All methods with TypeScript examples |
| Region Data | Full grid intensity table by provider/region |
| Methodology | Carbon math explanation with sources |
| CI/CD Guide | GitHub Actions integration examples |

#### 6.2.3 Admin Panel (Protected Routes)

| Feature Area | Screens |
| :--- | :--- |
| Dashboard | Overview cards, live API feed |
| Analytics | Charts (API calls, regions, providers, SDK vs mobile) |
| Feature Flags | Toggle table with sync indicator |
| Content Manager | Threshold editor, recommendation strings |
| User Management | User list, detail view, ban controls |
| API Keys | Key list, generate, revoke, rate limits |
| Team | Invite, assign roles, revoke access |
| Notifications | Compose, schedule, view open rates |
| Audit Log | Filterable action log |

### 6.3 Website Performance Targets

| Metric | Target |
| :--- | :--- |
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| FID / INP | < 200ms |
| CLS | < 0.1 |
| Time to First Byte | < 200ms (Vercel edge) |

---

## 7. Database Technical Requirements

### 7.1 Database Engine

| Attribute | Value |
| :--- | :--- |
| **Engine** | MongoDB 7.x |
| **ODM** | Mongoose 8.x |
| **Hosting** | MongoDB Atlas (M0 free tier for hackathon) |
| **Connection** | MongoDB SRV connection string |

### 7.2 Index Strategy

| Collection | Indexes |
| :--- | :--- |
| `users` | `{ email: 1 }` (unique), `{ deviceId: 1 }` |
| `calculations` | `{ userId: 1, createdAt: -1 }`, `{ provider: 1 }` |
| `apiKeys` | `{ hashedKey: 1 }` (unique), `{ createdBy: 1 }` |
| `featureFlags` | `{ key: 1 }` (unique) |
| `auditLogs` | `{ actorId: 1, createdAt: -1 }`, `{ action: 1 }` |
| `adminUsers` | `{ email: 1 }` (unique), `{ role: 1 }` |
| `notifications` | `{ scheduledAt: 1 }`, `{ status: 1 }` |

---

## 8. Infrastructure & Deployment

### 8.1 Deployment Topology

| Component | Platform | Domain |
| :--- | :--- | :--- |
| Backend API | Railway | `api.carbonix.dev` |
| Website + Admin | Vercel | `carbonix.dev` |
| Database | MongoDB Atlas | Internal SRV |
| Mobile App | EAS Build | APK distribution |
| SDK Package | npm Registry | `npmjs.com/package/carbonix` |

### 8.2 Environment Configuration

| Environment | API URL | Database | Feature Flags |
| :--- | :--- | :--- | :--- |
| Development | `localhost:3001` | Local MongoDB | All enabled |
| Staging | `staging-api.carbonix.dev` | Atlas (staging cluster) | Configurable |
| Production | `api.carbonix.dev` | Atlas (prod cluster) | Configurable |

### 8.3 CI/CD Pipeline

```
GitHub Push → GitHub Actions → Lint + Type Check + Unit Tests
                              ↓
                    ┌─────────┼──────────┐
                    │         │          │
              [API Deploy]  [Web Deploy] [Mobile Build]
              Railway auto  Vercel auto   EAS Build
              deploy        deploy        (manual trigger)
```

### 8.4 EAS Build Configuration (`eas.json`)

```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": { "gradleCommand": ":app:assembleDebug" }
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "android": { "buildType": "apk" }
    }
  },
  "submit": {}
}
```

---

## 9. Monitoring & Observability

| Concern | Tool | Tier |
| :--- | :--- | :--- |
| API Logging | Winston (structured JSON) | Custom |
| Error Tracking | Sentry (free tier) | Free |
| Uptime Monitoring | UptimeRobot | Free |
| Mobile Crash Reporting | Sentry React Native | Free |
| Analytics | Custom MongoDB-based / PostHog free | Free |
| APM | Railway built-in metrics | Included |

---

## 10. Testing Requirements

### 10.1 Testing Matrix

| Layer | Framework | Coverage Target | Types |
| :--- | :--- | :--- | :--- |
| API | Jest + Supertest | ≥ 80% | Unit, Integration |
| SDK | Jest | ≥ 90% | Unit |
| Mobile | Jest + React Native Testing Library | ≥ 60% | Unit, Component |
| Website | Jest + React Testing Library | ≥ 60% | Unit, Component |
| E2E | Detox (Mobile) / Playwright (Web) | Critical paths | End-to-end |

### 10.2 Critical Path Tests

1. **Calculate Flow:** Config input → API call → Result display
2. **Compare Flow:** Multi-provider comparison → Winner display
3. **Auth Flow:** Register → Login → Token refresh → Logout
4. **SDK Integration:** `new Carbonix()` → `calculateCarbon()` → structured response
5. **Admin Flow:** Login → Dashboard → Feature flag toggle → Verify app sync

---

## 11. Accessibility Requirements

| Requirement | Target |
| :--- | :--- |
| WCAG Level | 2.1 AA |
| Screen Reader Support | VoiceOver (iOS), TalkBack (Android) |
| Color Contrast Ratio | ≥ 4.5:1 for body text, ≥ 3:1 for large text |
| Touch Target Size | ≥ 44×44 pt (iOS), ≥ 48×48 dp (Android) |
| Keyboard Navigation | Full support on web |

---

## 12. Constraints & Assumptions

### 12.1 Hackathon Constraints

| Constraint | Impact |
| :--- | :--- |
| Solo developer | Multi-agent AI workflow to parallelize |
| Time-limited | MVP-first, polish later |
| Expo track required | Must demonstrate EAS Build, Workflows |
| Demo-day APK needed | Android APK via EAS Build mandatory |
| Free tier infrastructure | MongoDB Atlas M0, Railway free, Vercel free |

### 12.2 Assumptions

1. Grid intensity data from CCF dataset is sufficient for hackathon accuracy
2. MongoDB Atlas M0 (512 MB) is sufficient for demo data volumes
3. Railway free tier provides adequate compute for demo traffic
4. Judges will interact with Android APK on a physical device or emulator
5. Internet connectivity available during demo

---

## 13. Glossary

| Term | Definition |
| :--- | :--- |
| **CCF** | Cloud Carbon Footprint — open-source methodology for estimating cloud carbon emissions |
| **TDP** | Thermal Design Power — maximum heat output of a CPU in watts |
| **Grid Intensity** | Carbon dioxide emitted per kilowatt-hour of electricity (gCO₂/kWh) |
| **EAS** | Expo Application Services — cloud build and update platform |
| **RBAC** | Role-Based Access Control |
| **OTA** | Over-The-Air — update mechanism that doesn't require app store release |
| **PUE** | Power Usage Effectiveness — ratio of total facility power to IT equipment power |
