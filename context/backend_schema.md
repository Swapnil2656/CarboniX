<!-- GENERATED FROM CARBONIX_MASTER_DOCUMENT.md - DO NOT EDIT DIRECTLY unless updating context -->

# BACKEND_SCHEMA - Context from Master Document

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
