<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# TRD - Context from Master Document

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
