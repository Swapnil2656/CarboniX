# Backend Schema Document: Carbonix

> **Version:** 2.0  
> **Last Updated:** June 9, 2026  
> **Database:** PostgreSQL + Prisma ORM  
> **Auth Module:** vyana-auth-universal (adapted as carbonix-auth)  

---

## Table of Contents

1. [Database Architecture Overview](#1-database-architecture-overview)
2. [Prisma Schema — Backend API](#2-prisma-schema--backend-api)
3. [Prisma Schema — Web Auth](#3-prisma-schema--web-auth)
4. [Relationships & ERD](#4-relationships--erd)
5. [Seed Data](#5-seed-data)
6. [Query Patterns](#6-query-patterns)
7. [Migration Strategy](#7-migration-strategy)

---

## 1. Database Architecture Overview

### 1.1 Why PostgreSQL + Prisma (Changed from MongoDB)

| Decision | Rationale |
| :--- | :--- |
| **PostgreSQL** | Relational data (users → calculations → history) maps naturally; ACID compliance; better for admin analytics aggregations; free tier on Railway/Neon/Supabase |
| **Prisma ORM** | Type-safe queries, auto-generated client, migration system, matches vyana-auth-universal stack, schema-first approach |
| **Two databases** | Backend API (PostgreSQL) and Web Auth (PostgreSQL) are separate schemas — clean separation of concerns, independent scaling |

### 1.2 Database Instances

| Instance | Used By | Tables | Hosting |
| :--- | :--- | :--- | :--- |
| `carbonix_api` | `services/api` | Calculations, Regions, Instances, FeatureFlags, RemoteConfig, ApiKeys, AuditLogs, Notifications, PushTokens, MobileUsers | Railway PostgreSQL / Neon |
| `carbonix_web` | `apps/web` | User, Profile, VerificationToken (from vyana-auth) | Railway PostgreSQL / Neon |

### 1.3 Table Map

```
carbonix_api (services/api)
├── mobile_users                # Mobile app users (JWT auth via Express)
├── calculations                # All carbon calculation results
├── regions                     # Cloud region data with grid intensities (seed)
├── instance_types              # Cloud instance specifications (seed)
├── providers                   # Cloud provider metadata (seed)
├── api_keys                    # SDK API keys (hashed)
├── feature_flags               # Remote config flags for mobile app
├── remote_configs              # Dynamic content (thresholds, recommendations)
├── notifications               # Push notification history
├── push_tokens                 # Expo push tokens per device
├── audit_logs                  # Admin action audit trail
└── sessions                    # Active mobile user sessions

carbonix_web (apps/web)        — from vyana-auth-universal
├── User                        # Admin panel users (NextAuth)
├── Profile                     # Admin user profiles
└── VerificationToken           # Email verification tokens
```

---

## 2. Prisma Schema — Backend API

This is the complete `services/api/prisma/schema.prisma`:

```prisma
// ═══════════════════════════════════════════════════════════════
// CARBONIX BACKEND API — Prisma Schema
// Database: PostgreSQL
// ORM: Prisma 6.x
// ═══════════════════════════════════════════════════════════════

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ──────────────────────────────────────────────────

enum CloudProvider {
  AWS
  GCP
  AZURE
}

enum CarbonRating {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum CalculationSource {
  MOBILE_APP
  SDK
  WEB_PLAYGROUND
  API_DIRECT
}

enum ApiKeyStatus {
  ACTIVE
  REVOKED
}

enum FlagCategory {
  SCREEN
  FEATURE
  EXPERIMENT
  MAINTENANCE
}

enum ConfigCategory {
  THRESHOLDS
  RECOMMENDATIONS
  CONTENT
  MAINTENANCE
}

enum ConfigValueType {
  NUMBER
  STRING
  BOOLEAN
  JSON
}

enum NotificationType {
  BROADCAST
  TARGETED
  THRESHOLD_ALERT
}

enum NotificationStatus {
  DRAFT
  SCHEDULED
  SENDING
  SENT
  FAILED
}

enum TargetAudience {
  ALL
  PROVIDER_AWS
  PROVIDER_GCP
  PROVIDER_AZURE
  CUSTOM
}

enum MobileUserStatus {
  ACTIVE
  BANNED
}

enum InstanceCategory {
  GENERAL
  COMPUTE
  MEMORY
  STORAGE
  GPU
}

enum StorageType {
  EBS
  SSD
  HDD
  NVME
}

enum GridIntensitySource {
  ELECTRICITY_MAPS
  CCF_DEFAULT
}

// ─── Mobile Users ───────────────────────────────────────────

model MobileUser {
  id                   String           @id @default(cuid())
  email                String           @unique
  passwordHash         String
  name                 String
  deviceId             String?
  pushToken            String?
  country              String?          @db.Char(2) // ISO 3166-1 alpha-2
  lastActiveAt         DateTime         @default(now())
  calculationCount     Int              @default(0)
  totalCO2Tracked      Float            @default(0) // kg
  carbonAlertThreshold Float            @default(50) // kg CO₂/month

  // Preferences
  theme                String           @default("dark") // light | dark | system
  notificationsEnabled Boolean          @default(true)
  defaultProvider      CloudProvider?

  // Status
  status               MobileUserStatus @default(ACTIVE)
  banReason            String?
  bannedAt             DateTime?
  bannedBy             String?          // Admin user ID (from web DB)

  // Relations
  calculations         Calculation[]
  sessions             Session[]

  createdAt            DateTime         @default(now())
  updatedAt            DateTime         @updatedAt

  @@index([email])
  @@index([deviceId])
  @@index([status, lastActiveAt(sort: Desc)])
  @@index([createdAt(sort: Desc)])
}

// ─── Calculations ───────────────────────────────────────────

model Calculation {
  id                      String            @id @default(cuid())
  userId                  String
  user                    MobileUser        @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Input parameters
  provider                CloudProvider
  region                  String
  regionName              String
  instanceType            String
  instanceCount           Int
  hoursPerMonth           Int
  cpuUtilization          Float             // 0.0 to 1.0
  storageGB               Float             @default(0)
  ramGB                   Float

  // Energy breakdown (kWh)
  energyComputeKwh        Float
  energyMemoryKwh         Float
  energyStorageKwh        Float
  energyTotalKwh          Float

  // Carbon results
  co2GramsMonth           Float
  co2KgMonth              Float
  co2GramsHour            Float
  gridIntensity           Float             // gCO₂/kWh used
  gridIntensitySource     GridIntensitySource @default(CCF_DEFAULT)

  // Breakdown percentages
  computePercentage       Float
  memoryPercentage        Float
  storagePercentage       Float

  // Rating
  rating                  CarbonRating
  ratingColor             String            // hex color

  // Context
  realWorldEquivalent     String
  recommendation          String
  recommendedRegion       String?
  potentialReductionPct   Float?

  // Metadata
  source                  CalculationSource @default(MOBILE_APP)
  apiKeyId                String?
  responseTimeMs          Int
  sdkVersion              String?

  createdAt               DateTime          @default(now())

  @@index([userId, createdAt(sort: Desc)])
  @@index([provider])
  @@index([region])
  @@index([rating])
  @@index([source])
  @@index([createdAt(sort: Desc)])
}

// ─── Sessions ───────────────────────────────────────────────

model Session {
  id               String     @id @default(cuid())
  userId           String
  user             MobileUser @relation(fields: [userId], references: [id], onDelete: Cascade)
  refreshToken     String     @unique
  platform         String?
  osVersion        String?
  appVersion       String?
  deviceModel      String?
  ip               String?
  isActive         Boolean    @default(true)
  lastActivityAt   DateTime   @default(now())
  expiresAt        DateTime

  createdAt        DateTime   @default(now())

  @@index([userId])
  @@index([refreshToken])
}

// ─── API Keys ───────────────────────────────────────────────

model ApiKey {
  id                  String       @id @default(cuid())
  name                String
  prefix              String       @db.VarChar(12) // First 8 chars for identification
  hashedKey           String       @unique
  createdBy           String       // Admin user ID (from web DB)
  permissions         String[]     // ['calculate', 'compare', 'recommend', 'history']

  // Rate limits
  requestsPerMinute   Int          @default(60)
  requestsPerDay      Int          @default(10000)

  // Usage tracking
  totalRequests       Int          @default(0)
  lastUsedAt          DateTime?
  todayRequests       Int          @default(0)
  todayResetAt        DateTime     @default(now())

  // Status
  status              ApiKeyStatus @default(ACTIVE)
  revokedAt           DateTime?
  revokedBy           String?      // Admin user ID
  revokeReason        String?
  expiresAt           DateTime?

  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt

  @@index([hashedKey])
  @@index([createdBy])
  @@index([status])
}

// ─── Feature Flags ──────────────────────────────────────────

model FeatureFlag {
  id              String       @id @default(cuid())
  key             String       @unique    // e.g., 'config_builder_screen'
  displayName     String
  description     String       @default("")
  category        FlagCategory
  enabled         Boolean      @default(true)
  value           Json?                   // Optional payload

  // Metadata
  lastToggledBy   String?                 // Admin user ID
  lastToggledAt   DateTime     @default(now())
  toggleCount     Int          @default(0)
  version         Int          @default(1)

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@index([key])
}

// ─── Remote Config ──────────────────────────────────────────

model RemoteConfig {
  id              String          @id @default(cuid())
  key             String          @unique
  displayName     String
  category        ConfigCategory
  value           Json
  valueType       ConfigValueType
  description     String          @default("")
  lastUpdatedBy   String?                 // Admin user ID
  version         Int             @default(1)

  // History (stored as JSON array for simplicity)
  history         Json            @default("[]") // Array of { value, updatedBy, updatedAt }

  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  @@index([key])
}

// ─── Audit Logs ─────────────────────────────────────────────

model AuditLog {
  id           String   @id @default(cuid())
  actorId      String              // Admin user ID
  actorEmail   String
  actorRole    String
  action       String              // e.g., 'feature_flag.toggle'
  resource     String              // e.g., 'feature_flags'
  resourceId   String?

  // Change details
  before       Json?
  after        Json?
  metadata     Json?

  ip           String
  userAgent    String

  createdAt    DateTime @default(now())

  @@index([actorId, createdAt(sort: Desc)])
  @@index([action, createdAt(sort: Desc)])
  @@index([resource, resourceId])
}

// ─── Notifications ──────────────────────────────────────────

model Notification {
  id                String             @id @default(cuid())
  title             String             @db.VarChar(100)
  body              String             @db.VarChar(500)
  data              Json?
  type              NotificationType
  targetAudience    TargetAudience     @default(ALL)
  targetUserIds     String[]           // Mobile user IDs (for TARGETED)

  // Lifecycle
  status            NotificationStatus @default(DRAFT)
  scheduledAt       DateTime?
  sentAt            DateTime?

  // Stats
  totalRecipients   Int                @default(0)
  delivered         Int                @default(0)
  opened            Int                @default(0)
  failed            Int                @default(0)

  createdBy         String             // Admin user ID
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}

// ─── Push Tokens ────────────────────────────────────────────

model PushToken {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique          // Expo push token
  platform     String                    // 'ios' | 'android'
  isActive     Boolean  @default(true)
  lastUsedAt   DateTime @default(now())

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([userId])
  @@index([token])
}

// ─── Reference Data: Regions (Seeded) ───────────────────────

model Region {
  id                       String        @id @default(cuid())
  provider                 CloudProvider
  code                     String                  // e.g., 'us-east-1'
  name                     String                  // e.g., 'US East (N. Virginia)'
  country                  String        @db.Char(2)
  continent                String
  gridIntensity            Float                   // gCO₂/kWh
  gridIntensitySource      String        @default("ccf_default")
  renewablePercentage      Float?
  pue                      Float         @default(1.2) // Power Usage Effectiveness
  lat                      Float
  lng                      Float
  availableInstanceFamilies String[]
  isPopular                Boolean       @default(false)

  @@unique([provider, code])
  @@index([provider, isPopular(sort: Desc)])
  @@index([gridIntensity])
}

// ─── Reference Data: Instance Types (Seeded) ────────────────

model InstanceType {
  id              String           @id @default(cuid())
  provider        CloudProvider
  name            String                   // e.g., 't3.medium'
  displayName     String                   // e.g., 'T3 Medium'
  family          String                   // e.g., 't3'
  category        InstanceCategory
  vCPUs           Int
  memoryGB        Float
  cpuTdpWatts     Float                    // Thermal Design Power
  storageType     StorageType      @default(SSD)
  onDemandHourlyUsd Float?
  isPopular       Boolean          @default(false)

  @@unique([provider, name])
  @@index([provider, isPopular(sort: Desc)])
}

// ─── Reference Data: Providers (Seeded) ─────────────────────

model Provider {
  id              String        @id @default(cuid())
  key             CloudProvider @unique
  name            String                  // e.g., 'Amazon Web Services'
  shortName       String                  // e.g., 'AWS'
  logoUrl         String?
  regionCount     Int           @default(0)
  websiteUrl      String?
  carbonPageUrl   String?                 // Link to provider's sustainability page
  isActive        Boolean       @default(true)

  createdAt       DateTime      @default(now())
}
```

---

## 3. Prisma Schema — Web Auth

This is `apps/web/prisma/schema.prisma` — adapted from vyana-auth-universal with Carbonix roles:

```prisma
// ═══════════════════════════════════════════════════════════════
// CARBONIX WEB AUTH — Prisma Schema
// Adapted from vyana-auth-universal
// Database: PostgreSQL (separate from API DB)
// ═══════════════════════════════════════════════════════════════

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Carbonix Roles ─────────────────────────────────────────
// Matches roleRedirects in carbonix-auth.config.ts
enum userType {
  SUPER_ADMIN
  ADMIN
  ANALYST
  CONTENT_EDITOR
  USER
}

// ─── Auth Models (from vyana-auth-universal) ────────────────

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

### 3.1 Role-to-Permission Matrix (Enforced by Middleware)

| Permission | SUPER_ADMIN | ADMIN | ANALYST | CONTENT_EDITOR | USER |
| :--- | :---: | :---: | :---: | :---: | :---: |
| View dashboard | ✓ | ✓ | ✓ | ✗ | ✗ |
| View analytics | ✓ | ✓ | ✓ | ✗ | ✗ |
| Toggle feature flags | ✓ | ✓ | ✗ | ✗ | ✗ |
| Edit thresholds/content | ✓ | ✓ | ✗ | ✓ | ✗ |
| Manage users | ✓ | ✓ | ✗ | ✗ | ✗ |
| Ban users | ✓ | ✓ | ✗ | ✗ | ✗ |
| API key management | ✓ | ✓ | ✗ | ✗ | ✗ |
| Send notifications | ✓ | ✓ | ✗ | ✗ | ✗ |
| Manage team members | ✓ | ✗ | ✗ | ✗ | ✗ |
| Delete team members | ✓ | ✗ | ✗ | ✗ | ✗ |
| View audit log | ✓ | ✓ | ✗ | ✗ | ✗ |

---

## 4. Relationships & ERD

```
╔═══════════════════════════════════════════════════════════════╗
║                    CARBONIX_API DATABASE                      ║
╚═══════════════════════════════════════════════════════════════╝

  ┌──────────────┐       1:N        ┌──────────────────┐
  │  MobileUser   │─────────────────▶│  Calculation      │
  │               │                  │                    │
  │  id (PK)      │◀─── userId ──────│  userId (FK)       │
  │  email (UQ)   │                  │  provider          │
  │  name         │                  │  region            │
  │  status       │                  │  co2KgMonth        │
  │  calculations │                  │  rating            │
  │  sessions     │                  │  source            │
  └──────┬────────┘                  └────────────────────┘
         │
         │ 1:N
         ▼
  ┌──────────────┐
  │  Session      │
  │               │
  │  userId (FK)  │
  │  refreshToken │
  │  expiresAt    │
  └──────────────┘

  ┌──────────────┐                  ┌──────────────────┐
  │  ApiKey       │                  │  FeatureFlag      │
  │               │                  │                    │
  │  hashedKey    │                  │  key (UQ)          │
  │  createdBy    │─ ─ ─ admin ─ ─ ▶│  enabled           │
  │  status       │  (cross-DB ref) │  category          │
  └──────────────┘                  └────────────────────┘

  ┌──────────────┐                  ┌──────────────────┐
  │  RemoteConfig │                  │  AuditLog         │
  │               │                  │                    │
  │  key (UQ)     │                  │  actorId           │
  │  value (JSON) │                  │  action            │
  │  history      │                  │  resource          │
  └──────────────┘                  └────────────────────┘

  ┌──────────────┐                  ┌──────────────────┐
  │  Notification │                  │  PushToken        │
  │               │                  │                    │
  │  type         │                  │  userId            │
  │  status       │                  │  token (UQ)        │
  │  stats        │                  │  platform          │
  └──────────────┘                  └────────────────────┘

  ┌──────────────┐     ┌──────────────┐     ┌─────────────┐
  │  Region       │     │ InstanceType  │     │  Provider    │
  │  (seed data)  │     │  (seed data)  │     │  (seed data) │
  │               │     │               │     │              │
  │  provider+code│     │  provider+name│     │  key (UQ)    │
  │  gridIntensity│     │  cpuTdpWatts  │     │  name        │
  └──────────────┘     └──────────────┘     └─────────────┘

╔═══════════════════════════════════════════════════════════════╗
║                    CARBONIX_WEB DATABASE                      ║
║                  (vyana-auth-universal)                       ║
╚═══════════════════════════════════════════════════════════════╝

  ┌──────────────┐       1:1        ┌──────────────────┐
  │  User         │─────────────────▶│  Profile           │
  │               │                  │                    │
  │  id (PK)      │◀── userId (FK)───│  userId (UQ FK)    │
  │  email (UQ)   │                  │  fullName          │
  │  type (enum)  │                  │  avatarUrl         │
  │  isVerified   │                  │  phoneNumber       │
  └──────┬────────┘                  └────────────────────┘
         │
         │ 1:N
         ▼
  ┌──────────────────────┐
  │  VerificationToken    │
  │                       │
  │  token (UQ)           │
  │  userId (FK)          │
  │  expires              │
  └──────────────────────┘
```

### Cross-Database References

The `carbonix_api` and `carbonix_web` databases reference each other **by ID string** (not foreign keys):

| API Table Field | References | Web Table |
| :--- | :--- | :--- |
| `ApiKey.createdBy` | admin user ID → | `User.id` |
| `ApiKey.revokedBy` | admin user ID → | `User.id` |
| `MobileUser.bannedBy` | admin user ID → | `User.id` |
| `AuditLog.actorId` | admin user ID → | `User.id` |
| `FeatureFlag.lastToggledBy` | admin user ID → | `User.id` |
| `RemoteConfig.lastUpdatedBy` | admin user ID → | `User.id` |
| `Notification.createdBy` | admin user ID → | `User.id` |

These are **soft references** (string IDs, not enforced foreign keys) because the databases are separate. The admin panel resolves these IDs client-side.

---

## 5. Seed Data

### 5.1 Seed Script Order

```bash
# Run from services/api/
npx prisma db seed

# Seed order (respects dependencies):
# 1. providers       → AWS, GCP, Azure metadata
# 2. regions         → 130+ cloud regions with grid intensities
# 3. instance_types  → 200+ instance specs with TDP watts
# 4. feature_flags   → 12 default flags
# 5. remote_configs  → Rating thresholds + recommendation strings
```

### 5.2 Default Feature Flags

```typescript
const defaultFlags = [
  { key: 'config_builder_screen',  displayName: 'Config Builder Screen',  category: 'SCREEN',      enabled: true },
  { key: 'results_screen',        displayName: 'Results Screen',         category: 'SCREEN',      enabled: true },
  { key: 'compare_screen',        displayName: 'Compare Screen',         category: 'SCREEN',      enabled: true },
  { key: 'api_console_screen',    displayName: 'API Console Screen',     category: 'SCREEN',      enabled: true },
  { key: 'history_screen',        displayName: 'History Screen',         category: 'SCREEN',      enabled: true },
  { key: 'sdk_docs_screen',       displayName: 'SDK Docs Screen',        category: 'SCREEN',      enabled: true },
  { key: 'settings_screen',       displayName: 'Settings Screen',        category: 'SCREEN',      enabled: true },
  { key: 'push_notifications',    displayName: 'Push Notifications',     category: 'FEATURE',     enabled: true },
  { key: 'offline_mode',          displayName: 'Offline Mode',           category: 'FEATURE',     enabled: true },
  { key: 'deep_linking',          displayName: 'Deep Linking',           category: 'FEATURE',     enabled: true },
  { key: 'maintenance_mode',      displayName: 'Maintenance Mode',       category: 'MAINTENANCE', enabled: false },
  { key: 'maintenance_message',   displayName: 'Maintenance Message',    category: 'MAINTENANCE', enabled: false,
    value: { message: 'We are performing scheduled maintenance. Please check back soon.' } },
];
```

### 5.3 Default Remote Config

```typescript
const defaultConfigs = [
  { key: 'rating_threshold_low',      category: 'THRESHOLDS',       value: 5,     valueType: 'NUMBER',
    description: 'Max kg CO₂/month for LOW rating' },
  { key: 'rating_threshold_medium',   category: 'THRESHOLDS',       value: 20,    valueType: 'NUMBER',
    description: 'Max kg CO₂/month for MEDIUM rating' },
  { key: 'rating_threshold_high',     category: 'THRESHOLDS',       value: 50,    valueType: 'NUMBER',
    description: 'Max kg CO₂/month for HIGH rating' },
  { key: 'recommendation_high',       category: 'RECOMMENDATIONS',  valueType: 'STRING',
    value: 'Consider switching to a region with lower grid intensity to significantly reduce your carbon footprint.' },
  { key: 'recommendation_critical',   category: 'RECOMMENDATIONS',  valueType: 'STRING',
    value: 'Your infrastructure carbon footprint is critical. Immediate action recommended: migrate to a green-powered region.' },
];
```

### 5.4 Sample Region Data

```typescript
const sampleRegions = [
  { provider: 'AWS', code: 'us-east-1',       name: 'US East (N. Virginia)',       country: 'US', continent: 'North America', gridIntensity: 415.0, pue: 1.2,  isPopular: true,  lat: 38.13,  lng: -78.45 },
  { provider: 'AWS', code: 'eu-west-1',       name: 'EU (Ireland)',                country: 'IE', continent: 'Europe',        gridIntensity: 316.0, pue: 1.2,  isPopular: true,  lat: 53.35,  lng: -6.26 },
  { provider: 'AWS', code: 'eu-north-1',      name: 'EU (Stockholm)',              country: 'SE', continent: 'Europe',        gridIntensity: 8.0,   pue: 1.07, isPopular: true,  lat: 59.33,  lng: 18.07 },
  { provider: 'AWS', code: 'ap-southeast-1',  name: 'Asia Pacific (Singapore)',    country: 'SG', continent: 'Asia',          gridIntensity: 408.0, pue: 1.22, isPopular: true,  lat: 1.35,   lng: 103.82 },
  { provider: 'GCP', code: 'us-central1',     name: 'Iowa',                        country: 'US', continent: 'North America', gridIntensity: 440.0, pue: 1.1,  isPopular: true,  lat: 41.26,  lng: -95.86 },
  { provider: 'GCP', code: 'europe-west1',    name: 'Belgium',                     country: 'BE', continent: 'Europe',        gridIntensity: 167.0, pue: 1.1,  isPopular: true,  lat: 50.45,  lng: 3.82 },
  { provider: 'GCP', code: 'europe-north1',   name: 'Finland',                     country: 'FI', continent: 'Europe',        gridIntensity: 71.0,  pue: 1.1,  isPopular: true,  lat: 60.57,  lng: 27.01 },
  { provider: 'AZURE', code: 'eastus',        name: 'East US (Virginia)',          country: 'US', continent: 'North America', gridIntensity: 415.0, pue: 1.18, isPopular: true,  lat: 37.37,  lng: -79.46 },
  { provider: 'AZURE', code: 'westeurope',    name: 'West Europe (Netherlands)',   country: 'NL', continent: 'Europe',        gridIntensity: 351.0, pue: 1.18, isPopular: true,  lat: 52.37,  lng: 4.9 },
  { provider: 'AZURE', code: 'swedencentral', name: 'Sweden Central (Gävle)',      country: 'SE', continent: 'Europe',        gridIntensity: 8.0,   pue: 1.12, isPopular: true,  lat: 60.67,  lng: 17.15 },
];
```

### 5.5 Web Auth Seed (Super Admin)

```bash
# Run from apps/web/
npx prisma db seed

# Seeds initial SUPER_ADMIN account:
# email: admin@carbonix.dev
# password: (set via ADMIN_SEED_PASSWORD env var)
# type: SUPER_ADMIN
```

---

## 6. Query Patterns

### 6.1 Most Frequent Queries (Prisma)

```typescript
// Get user's calculation history (paginated)
await prisma.calculation.findMany({
  where: { userId },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: page * 20,
});

// Validate API key
await prisma.apiKey.findUnique({
  where: { hashedKey: sha256(apiKey) },
  select: { id: true, status: true, permissions: true, requestsPerMinute: true },
});

// Get all feature flags (public)
await prisma.featureFlag.findMany({
  select: { key: true, enabled: true, value: true, category: true, version: true },
});

// Dashboard: API calls today
await prisma.calculation.aggregate({
  where: { createdAt: { gte: startOfToday } },
  _count: true,
  _avg: { co2KgMonth: true },
});

// Dashboard: Calculations by provider (this month)
await prisma.calculation.groupBy({
  by: ['provider'],
  where: { createdAt: { gte: startOfMonth } },
  _count: true,
  orderBy: { _count: { provider: 'desc' } },
});

// Top 10 regions by usage
await prisma.calculation.groupBy({
  by: ['region'],
  where: { createdAt: { gte: startOfMonth } },
  _count: true,
  _avg: { co2KgMonth: true },
  orderBy: { _count: { region: 'desc' } },
  take: 10,
});
```

---

## 7. Migration Strategy

### 7.1 Development Workflow

```bash
# 1. Edit schema.prisma
# 2. Create migration
npx prisma migrate dev --name descriptive-name

# 3. Generate client
npx prisma generate

# 4. Seed data (if needed)
npx prisma db seed
```

### 7.2 Production Deployment

```bash
# On Railway/production:
npx prisma migrate deploy   # Apply pending migrations
npx prisma generate          # Generate client for runtime
```

### 7.3 Backup Strategy

| Concern | Approach |
| :--- | :--- |
| Railway PostgreSQL | Daily automated snapshots |
| Before migrations | `pg_dump` manual backup |
| Data retention | Calculations: indefinite; Audit logs: 50K rows max (paginated purge); Sessions: expired rows cleaned daily |
