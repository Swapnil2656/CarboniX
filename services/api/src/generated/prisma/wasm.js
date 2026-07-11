
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.MobileUserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  name: 'name',
  deviceId: 'deviceId',
  pushToken: 'pushToken',
  country: 'country',
  lastActiveAt: 'lastActiveAt',
  calculationCount: 'calculationCount',
  totalCO2Tracked: 'totalCO2Tracked',
  carbonAlertThreshold: 'carbonAlertThreshold',
  theme: 'theme',
  notificationsEnabled: 'notificationsEnabled',
  defaultProvider: 'defaultProvider',
  weeklyDigestEnabled: 'weeklyDigestEnabled',
  budgetAlertEnabled: 'budgetAlertEnabled',
  greenTipsEnabled: 'greenTipsEnabled',
  carbonBudgetKg: 'carbonBudgetKg',
  preferredUnit: 'preferredUnit',
  defaultRegion: 'defaultRegion',
  avatarUrl: 'avatarUrl',
  bio: 'bio',
  status: 'status',
  banReason: 'banReason',
  bannedAt: 'bannedAt',
  bannedBy: 'bannedBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CalculationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  provider: 'provider',
  region: 'region',
  regionName: 'regionName',
  instanceType: 'instanceType',
  instanceCount: 'instanceCount',
  hoursPerMonth: 'hoursPerMonth',
  cpuUtilization: 'cpuUtilization',
  storageGB: 'storageGB',
  ramGB: 'ramGB',
  energyComputeKwh: 'energyComputeKwh',
  energyMemoryKwh: 'energyMemoryKwh',
  energyStorageKwh: 'energyStorageKwh',
  energyTotalKwh: 'energyTotalKwh',
  co2GramsMonth: 'co2GramsMonth',
  co2KgMonth: 'co2KgMonth',
  co2GramsHour: 'co2GramsHour',
  gridIntensity: 'gridIntensity',
  gridIntensitySource: 'gridIntensitySource',
  computePercentage: 'computePercentage',
  memoryPercentage: 'memoryPercentage',
  storagePercentage: 'storagePercentage',
  rating: 'rating',
  ratingColor: 'ratingColor',
  realWorldEquivalent: 'realWorldEquivalent',
  recommendation: 'recommendation',
  recommendedRegion: 'recommendedRegion',
  potentialReductionPct: 'potentialReductionPct',
  source: 'source',
  apiKeyId: 'apiKeyId',
  responseTimeMs: 'responseTimeMs',
  sdkVersion: 'sdkVersion',
  createdAt: 'createdAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  refreshToken: 'refreshToken',
  platform: 'platform',
  osVersion: 'osVersion',
  appVersion: 'appVersion',
  deviceModel: 'deviceModel',
  ip: 'ip',
  isActive: 'isActive',
  lastActivityAt: 'lastActivityAt',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  prefix: 'prefix',
  hashedKey: 'hashedKey',
  createdBy: 'createdBy',
  permissions: 'permissions',
  requestsPerMinute: 'requestsPerMinute',
  requestsPerDay: 'requestsPerDay',
  totalRequests: 'totalRequests',
  lastUsedAt: 'lastUsedAt',
  todayRequests: 'todayRequests',
  todayResetAt: 'todayResetAt',
  status: 'status',
  revokedAt: 'revokedAt',
  revokedBy: 'revokedBy',
  revokeReason: 'revokeReason',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FeatureFlagScalarFieldEnum = {
  id: 'id',
  key: 'key',
  displayName: 'displayName',
  description: 'description',
  category: 'category',
  enabled: 'enabled',
  value: 'value',
  lastToggledBy: 'lastToggledBy',
  lastToggledAt: 'lastToggledAt',
  toggleCount: 'toggleCount',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RemoteConfigScalarFieldEnum = {
  id: 'id',
  key: 'key',
  displayName: 'displayName',
  category: 'category',
  value: 'value',
  valueType: 'valueType',
  description: 'description',
  lastUpdatedBy: 'lastUpdatedBy',
  version: 'version',
  history: 'history',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  actorId: 'actorId',
  actorEmail: 'actorEmail',
  actorRole: 'actorRole',
  action: 'action',
  resource: 'resource',
  resourceId: 'resourceId',
  before: 'before',
  after: 'after',
  metadata: 'metadata',
  ip: 'ip',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  title: 'title',
  body: 'body',
  data: 'data',
  type: 'type',
  targetAudience: 'targetAudience',
  targetUserIds: 'targetUserIds',
  status: 'status',
  scheduledAt: 'scheduledAt',
  sentAt: 'sentAt',
  totalRecipients: 'totalRecipients',
  delivered: 'delivered',
  opened: 'opened',
  failed: 'failed',
  createdBy: 'createdBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserNotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  body: 'body',
  type: 'type',
  data: 'data',
  isRead: 'isRead',
  createdAt: 'createdAt'
};

exports.Prisma.PushTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  platform: 'platform',
  isActive: 'isActive',
  lastUsedAt: 'lastUsedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  provider: 'provider',
  code: 'code',
  name: 'name',
  country: 'country',
  continent: 'continent',
  gridIntensity: 'gridIntensity',
  gridIntensitySource: 'gridIntensitySource',
  renewablePercentage: 'renewablePercentage',
  pue: 'pue',
  lat: 'lat',
  lng: 'lng',
  availableInstanceFamilies: 'availableInstanceFamilies',
  isPopular: 'isPopular'
};

exports.Prisma.InstanceTypeScalarFieldEnum = {
  id: 'id',
  provider: 'provider',
  name: 'name',
  displayName: 'displayName',
  family: 'family',
  category: 'category',
  vCPUs: 'vCPUs',
  memoryGB: 'memoryGB',
  cpuTdpWatts: 'cpuTdpWatts',
  storageType: 'storageType',
  onDemandHourlyUsd: 'onDemandHourlyUsd',
  isPopular: 'isPopular'
};

exports.Prisma.ProviderScalarFieldEnum = {
  id: 'id',
  key: 'key',
  name: 'name',
  shortName: 'shortName',
  logoUrl: 'logoUrl',
  regionCount: 'regionCount',
  websiteUrl: 'websiteUrl',
  carbonPageUrl: 'carbonPageUrl',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.AgentRunScalarFieldEnum = {
  id: 'id',
  agentType: 'agentType',
  status: 'status',
  triggeredBy: 'triggeredBy',
  summary: 'summary',
  details: 'details',
  recordsProcessed: 'recordsProcessed',
  errorMessage: 'errorMessage',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  durationMs: 'durationMs',
  createdAt: 'createdAt'
};

exports.Prisma.EmissionRecordScalarFieldEnum = {
  id: 'id',
  agentRunId: 'agentRunId',
  instanceId: 'instanceId',
  instanceType: 'instanceType',
  provider: 'provider',
  region: 'region',
  instanceName: 'instanceName',
  cpuUtilization: 'cpuUtilization',
  memoryUtilization: 'memoryUtilization',
  networkInGb: 'networkInGb',
  networkOutGb: 'networkOutGb',
  energyKwh: 'energyKwh',
  gridIntensity: 'gridIntensity',
  carbonKg: 'carbonKg',
  isIdle: 'isIdle',
  isOversized: 'isOversized',
  recommendation: 'recommendation',
  timestamp: 'timestamp'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  userName: 'userName',
  email: 'email',
  password: 'password',
  isVerified: 'isVerified',
  isOnboarded: 'isOnboarded',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  name: 'name',
  region: 'region',
  sdkConnected: 'sdkConnected',
  connectedAt: 'connectedAt',
  lastPingAt: 'lastPingAt',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  fullName: 'fullName',
  avatarUrl: 'avatarUrl',
  phoneNumber: 'phoneNumber',
  emailAlerts: 'emailAlerts',
  pushAlerts: 'pushAlerts',
  thresholdAlerts: 'thresholdAlerts',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  expires: 'expires',
  userId: 'userId'
};

exports.Prisma.TeamMemberScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  role: 'role',
  projectId: 'projectId',
  projectName: 'projectName',
  co2Emissions: 'co2Emissions',
  location: 'location',
  status: 'status',
  aiSuggestion: 'aiSuggestion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChatHistoryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  messages: 'messages',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.CloudProvider = exports.$Enums.CloudProvider = {
  AWS: 'AWS',
  GCP: 'GCP',
  AZURE: 'AZURE',
  VERCEL: 'VERCEL',
  NETLIFY: 'NETLIFY',
  RAILWAY: 'RAILWAY',
  RENDER: 'RENDER',
  OTHER: 'OTHER'
};

exports.MobileUserStatus = exports.$Enums.MobileUserStatus = {
  ACTIVE: 'ACTIVE',
  BANNED: 'BANNED'
};

exports.GridIntensitySource = exports.$Enums.GridIntensitySource = {
  ELECTRICITY_MAPS: 'ELECTRICITY_MAPS',
  CCF_DEFAULT: 'CCF_DEFAULT'
};

exports.CarbonRating = exports.$Enums.CarbonRating = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.CalculationSource = exports.$Enums.CalculationSource = {
  MOBILE_APP: 'MOBILE_APP',
  SDK: 'SDK',
  WEB_PLAYGROUND: 'WEB_PLAYGROUND',
  API_DIRECT: 'API_DIRECT'
};

exports.ApiKeyStatus = exports.$Enums.ApiKeyStatus = {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED'
};

exports.FlagCategory = exports.$Enums.FlagCategory = {
  SCREEN: 'SCREEN',
  FEATURE: 'FEATURE',
  EXPERIMENT: 'EXPERIMENT',
  MAINTENANCE: 'MAINTENANCE'
};

exports.ConfigCategory = exports.$Enums.ConfigCategory = {
  THRESHOLDS: 'THRESHOLDS',
  RECOMMENDATIONS: 'RECOMMENDATIONS',
  CONTENT: 'CONTENT',
  MAINTENANCE: 'MAINTENANCE'
};

exports.ConfigValueType = exports.$Enums.ConfigValueType = {
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  BROADCAST: 'BROADCAST',
  TARGETED: 'TARGETED',
  THRESHOLD_ALERT: 'THRESHOLD_ALERT'
};

exports.TargetAudience = exports.$Enums.TargetAudience = {
  ALL: 'ALL',
  PROVIDER_AWS: 'PROVIDER_AWS',
  PROVIDER_GCP: 'PROVIDER_GCP',
  PROVIDER_AZURE: 'PROVIDER_AZURE',
  CUSTOM: 'CUSTOM'
};

exports.NotificationStatus = exports.$Enums.NotificationStatus = {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

exports.InstanceCategory = exports.$Enums.InstanceCategory = {
  GENERAL: 'GENERAL',
  COMPUTE: 'COMPUTE',
  MEMORY: 'MEMORY',
  STORAGE: 'STORAGE',
  GPU: 'GPU'
};

exports.StorageType = exports.$Enums.StorageType = {
  EBS: 'EBS',
  SSD: 'SSD',
  HDD: 'HDD',
  NVME: 'NVME'
};

exports.AgentType = exports.$Enums.AgentType = {
  COLLECTOR: 'COLLECTOR',
  ANALYST: 'ANALYST',
  CICD_GATE: 'CICD_GATE',
  REPORTER: 'REPORTER',
  ORCHESTRATOR: 'ORCHESTRATOR'
};

exports.AgentRunStatus = exports.$Enums.AgentRunStatus = {
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

exports.userType = exports.$Enums.userType = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  ANALYST: 'ANALYST',
  CONTENT_EDITOR: 'CONTENT_EDITOR',
  USER: 'USER'
};

exports.Prisma.ModelName = {
  MobileUser: 'MobileUser',
  Calculation: 'Calculation',
  Session: 'Session',
  ApiKey: 'ApiKey',
  FeatureFlag: 'FeatureFlag',
  RemoteConfig: 'RemoteConfig',
  AuditLog: 'AuditLog',
  Notification: 'Notification',
  UserNotification: 'UserNotification',
  PushToken: 'PushToken',
  Region: 'Region',
  InstanceType: 'InstanceType',
  Provider: 'Provider',
  AgentRun: 'AgentRun',
  EmissionRecord: 'EmissionRecord',
  User: 'User',
  Project: 'Project',
  Profile: 'Profile',
  VerificationToken: 'VerificationToken',
  TeamMember: 'TeamMember',
  ChatHistory: 'ChatHistory'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/swapnilsen/CarboniX/services/api/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl-arm64-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl-arm64-openssl-1.1.x"
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.1.x"
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/Users/swapnilsen/CarboniX/services/api/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": true,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src/generated/prisma\"\n  previewFeatures = [\"driverAdapters\"]\n  binaryTargets   = [\"native\", \"linux-musl-arm64-openssl-3.0.x\", \"linux-musl-arm64-openssl-1.1.x\", \"linux-musl-openssl-3.0.x\", \"debian-openssl-3.0.x\", \"debian-openssl-1.1.x\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// ─── Enums ──────────────────────────────────────────────────\n\nenum CloudProvider {\n  AWS\n  GCP\n  AZURE\n  VERCEL\n  NETLIFY\n  RAILWAY\n  RENDER\n  OTHER\n}\n\nenum CarbonRating {\n  LOW\n  MEDIUM\n  HIGH\n  CRITICAL\n}\n\nenum CalculationSource {\n  MOBILE_APP\n  SDK\n  WEB_PLAYGROUND\n  API_DIRECT\n}\n\nenum ApiKeyStatus {\n  ACTIVE\n  REVOKED\n}\n\nenum FlagCategory {\n  SCREEN\n  FEATURE\n  EXPERIMENT\n  MAINTENANCE\n}\n\nenum ConfigCategory {\n  THRESHOLDS\n  RECOMMENDATIONS\n  CONTENT\n  MAINTENANCE\n}\n\nenum ConfigValueType {\n  NUMBER\n  STRING\n  BOOLEAN\n  JSON\n}\n\nenum NotificationType {\n  BROADCAST\n  TARGETED\n  THRESHOLD_ALERT\n}\n\nenum NotificationStatus {\n  DRAFT\n  SCHEDULED\n  SENDING\n  SENT\n  FAILED\n}\n\nenum TargetAudience {\n  ALL\n  PROVIDER_AWS\n  PROVIDER_GCP\n  PROVIDER_AZURE\n  CUSTOM\n}\n\nenum MobileUserStatus {\n  ACTIVE\n  BANNED\n}\n\nenum InstanceCategory {\n  GENERAL\n  COMPUTE\n  MEMORY\n  STORAGE\n  GPU\n}\n\nenum StorageType {\n  EBS\n  SSD\n  HDD\n  NVME\n}\n\nenum GridIntensitySource {\n  ELECTRICITY_MAPS\n  CCF_DEFAULT\n}\n\n// ─── Mobile Users ───────────────────────────────────────────\n\nmodel MobileUser {\n  id                   String   @id @default(cuid())\n  email                String   @unique\n  passwordHash         String\n  name                 String\n  deviceId             String?\n  pushToken            String?\n  country              String?  @db.Char(2) // ISO 3166-1 alpha-2\n  lastActiveAt         DateTime @default(now())\n  calculationCount     Int      @default(0)\n  totalCO2Tracked      Float    @default(0) // kg\n  carbonAlertThreshold Float    @default(50) // kg CO₂/month\n\n  // Preferences\n  theme                String         @default(\"dark\") // light | dark | system\n  notificationsEnabled Boolean        @default(true)\n  defaultProvider      CloudProvider?\n  weeklyDigestEnabled  Boolean        @default(true)\n  budgetAlertEnabled   Boolean        @default(true)\n  greenTipsEnabled     Boolean        @default(true)\n  carbonBudgetKg       Float          @default(100) // Monthly CO₂ budget in kg\n  preferredUnit        String         @default(\"kg\") // \"kg\" or \"lbs\"\n  defaultRegion        String? // e.g., \"ap-south-1\"\n\n  // Profile fields (for Settings > Profile)\n  avatarUrl String?\n  bio       String?\n\n  // Status\n  status    MobileUserStatus @default(ACTIVE)\n  banReason String?\n  bannedAt  DateTime?\n  bannedBy  String? // Admin user ID (from web DB)\n\n  // Relations\n  calculations Calculation[]\n  sessions     Session[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([email])\n  @@index([deviceId])\n  @@index([status, lastActiveAt(sort: Desc)])\n  @@index([createdAt(sort: Desc)])\n}\n\n// ─── Calculations ───────────────────────────────────────────\n\nmodel Calculation {\n  id     String     @id @default(cuid())\n  userId String\n  user   MobileUser @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  // Input parameters\n  provider       CloudProvider\n  region         String\n  regionName     String\n  instanceType   String\n  instanceCount  Int\n  hoursPerMonth  Int\n  cpuUtilization Float // 0.0 to 1.0\n  storageGB      Float         @default(0)\n  ramGB          Float\n\n  // Energy breakdown (kWh)\n  energyComputeKwh Float\n  energyMemoryKwh  Float\n  energyStorageKwh Float\n  energyTotalKwh   Float\n\n  // Carbon results\n  co2GramsMonth       Float\n  co2KgMonth          Float\n  co2GramsHour        Float\n  gridIntensity       Float // gCO₂/kWh used\n  gridIntensitySource GridIntensitySource @default(CCF_DEFAULT)\n\n  // Breakdown percentages\n  computePercentage Float\n  memoryPercentage  Float\n  storagePercentage Float\n\n  // Rating\n  rating      CarbonRating\n  ratingColor String // hex color\n\n  // Context\n  realWorldEquivalent   String\n  recommendation        String\n  recommendedRegion     String?\n  potentialReductionPct Float?\n\n  // Metadata\n  source         CalculationSource @default(MOBILE_APP)\n  apiKeyId       String?\n  responseTimeMs Int\n  sdkVersion     String?\n\n  createdAt DateTime @default(now())\n\n  @@index([userId, createdAt(sort: Desc)])\n  @@index([provider])\n  @@index([region])\n  @@index([rating])\n  @@index([source])\n  @@index([createdAt(sort: Desc)])\n}\n\n// ─── Sessions ───────────────────────────────────────────────\n\nmodel Session {\n  id             String     @id @default(cuid())\n  userId         String\n  user           MobileUser @relation(fields: [userId], references: [id], onDelete: Cascade)\n  refreshToken   String     @unique\n  platform       String?\n  osVersion      String?\n  appVersion     String?\n  deviceModel    String?\n  ip             String?\n  isActive       Boolean    @default(true)\n  lastActivityAt DateTime   @default(now())\n  expiresAt      DateTime\n\n  createdAt DateTime @default(now())\n\n  @@index([userId])\n  @@index([refreshToken])\n}\n\n// ─── API Keys ───────────────────────────────────────────────\n\nmodel ApiKey {\n  id          String   @id @default(cuid())\n  name        String\n  prefix      String   @db.VarChar(12) // First 8 chars for identification\n  hashedKey   String   @unique\n  createdBy   String // Admin user ID (from web DB)\n  permissions String[] // ['calculate', 'compare', 'recommend', 'history']\n\n  // Rate limits\n  requestsPerMinute Int @default(60)\n  requestsPerDay    Int @default(10000)\n\n  // Usage tracking\n  totalRequests Int       @default(0)\n  lastUsedAt    DateTime?\n  todayRequests Int       @default(0)\n  todayResetAt  DateTime  @default(now())\n\n  // Status\n  status       ApiKeyStatus @default(ACTIVE)\n  revokedAt    DateTime?\n  revokedBy    String? // Admin user ID\n  revokeReason String?\n  expiresAt    DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([hashedKey])\n  @@index([createdBy])\n  @@index([status])\n}\n\n// ─── Feature Flags ──────────────────────────────────────────\n\nmodel FeatureFlag {\n  id          String       @id @default(cuid())\n  key         String       @unique // e.g., 'config_builder_screen'\n  displayName String\n  description String       @default(\"\")\n  category    FlagCategory\n  enabled     Boolean      @default(true)\n  value       Json? // Optional payload\n\n  // Metadata\n  lastToggledBy String? // Admin user ID\n  lastToggledAt DateTime @default(now())\n  toggleCount   Int      @default(0)\n  version       Int      @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([key])\n}\n\n// ─── Remote Config ──────────────────────────────────────────\n\nmodel RemoteConfig {\n  id            String          @id @default(cuid())\n  key           String          @unique\n  displayName   String\n  category      ConfigCategory\n  value         Json\n  valueType     ConfigValueType\n  description   String          @default(\"\")\n  lastUpdatedBy String? // Admin user ID\n  version       Int             @default(1)\n\n  // History (stored as JSON array for simplicity)\n  history Json @default(\"[]\") // Array of { value, updatedBy, updatedAt }\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([key])\n}\n\n// ─── Audit Logs ─────────────────────────────────────────────\n\nmodel AuditLog {\n  id         String  @id @default(cuid())\n  actorId    String // Admin user ID\n  actorEmail String\n  actorRole  String\n  action     String // e.g., 'feature_flag.toggle'\n  resource   String // e.g., 'feature_flags'\n  resourceId String?\n\n  // Change details\n  before   Json?\n  after    Json?\n  metadata Json?\n\n  ip        String\n  userAgent String\n\n  createdAt DateTime @default(now())\n\n  @@index([actorId, createdAt(sort: Desc)])\n  @@index([action, createdAt(sort: Desc)])\n  @@index([resource, resourceId])\n}\n\n// ─── Notifications ──────────────────────────────────────────\n\nmodel Notification {\n  id             String           @id @default(cuid())\n  title          String           @db.VarChar(100)\n  body           String           @db.VarChar(500)\n  data           Json?\n  type           NotificationType\n  targetAudience TargetAudience   @default(ALL)\n  targetUserIds  String[] // Mobile user IDs (for TARGETED)\n\n  // Lifecycle\n  status      NotificationStatus @default(DRAFT)\n  scheduledAt DateTime?\n  sentAt      DateTime?\n\n  // Stats\n  totalRecipients Int @default(0)\n  delivered       Int @default(0)\n  opened          Int @default(0)\n  failed          Int @default(0)\n\n  createdBy String // Admin user ID\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel UserNotification {\n  id     String  @id @default(cuid())\n  userId String\n  title  String\n  body   String\n  type   String // \"HIGH_EMISSION\" | \"BUDGET_ALERT\" | \"GREEN_TIP\" | \"WEEKLY_DIGEST\" | \"SYSTEM\"\n  data   Json? // Optional payload (e.g., calculationId, region)\n  isRead Boolean @default(false)\n\n  createdAt DateTime @default(now())\n\n  @@index([userId, createdAt(sort: Desc)])\n  @@index([userId, isRead])\n}\n\n// ─── Push Tokens ────────────────────────────────────────────\n\nmodel PushToken {\n  id         String   @id @default(cuid())\n  userId     String\n  token      String   @unique // Expo push token\n  platform   String // 'ios' | 'android'\n  isActive   Boolean  @default(true)\n  lastUsedAt DateTime @default(now())\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([token])\n}\n\n// ─── Reference Data: Regions (Seeded) ───────────────────────\n\nmodel Region {\n  id                        String        @id @default(cuid())\n  provider                  CloudProvider\n  code                      String // e.g., 'us-east-1'\n  name                      String // e.g., 'US East (N. Virginia)'\n  country                   String        @db.Char(2)\n  continent                 String\n  gridIntensity             Float // gCO₂/kWh\n  gridIntensitySource       String        @default(\"ccf_default\")\n  renewablePercentage       Float?\n  pue                       Float         @default(1.2) // Power Usage Effectiveness\n  lat                       Float\n  lng                       Float\n  availableInstanceFamilies String[]\n  isPopular                 Boolean       @default(false)\n\n  @@unique([provider, code])\n  @@index([provider, isPopular(sort: Desc)])\n  @@index([gridIntensity])\n}\n\n// ─── Reference Data: Instance Types (Seeded) ────────────────\n\nmodel InstanceType {\n  id                String           @id @default(cuid())\n  provider          CloudProvider\n  name              String // e.g., 't3.medium'\n  displayName       String // e.g., 'T3 Medium'\n  family            String // e.g., 't3'\n  category          InstanceCategory\n  vCPUs             Int\n  memoryGB          Float\n  cpuTdpWatts       Float // Thermal Design Power\n  storageType       StorageType      @default(SSD)\n  onDemandHourlyUsd Float?\n  isPopular         Boolean          @default(false)\n\n  @@unique([provider, name])\n  @@index([provider, isPopular(sort: Desc)])\n}\n\n// ─── Reference Data: Providers (Seeded) ─────────────────────\n\nmodel Provider {\n  id            String        @id @default(cuid())\n  key           CloudProvider @unique\n  name          String // e.g., 'Amazon Web Services'\n  shortName     String // e.g., 'AWS'\n  logoUrl       String?\n  regionCount   Int           @default(0)\n  websiteUrl    String?\n  carbonPageUrl String? // Link to provider's sustainability page\n  isActive      Boolean       @default(true)\n\n  createdAt DateTime @default(now())\n}\n\n// ─── Agent System (Phase 6) ─────────────────────────────────\n\nenum AgentType {\n  COLLECTOR\n  ANALYST\n  CICD_GATE\n  REPORTER\n  ORCHESTRATOR\n}\n\nenum AgentRunStatus {\n  RUNNING\n  SUCCESS\n  FAILED\n}\n\nmodel AgentRun {\n  id          String         @id @default(cuid())\n  agentType   AgentType\n  status      AgentRunStatus @default(RUNNING)\n  triggeredBy String         @default(\"cron\") // \"cron\" | \"manual\" | \"webhook\"\n\n  // Results\n  summary          String? // Human-readable one-liner\n  details          Json? // Full structured output\n  recordsProcessed Int     @default(0)\n  errorMessage     String?\n\n  // Timing\n  startedAt   DateTime  @default(now())\n  completedAt DateTime?\n  durationMs  Int?\n\n  createdAt DateTime @default(now())\n\n  @@index([agentType, createdAt(sort: Desc)])\n  @@index([status])\n}\n\nmodel EmissionRecord {\n  id         String  @id @default(cuid())\n  agentRunId String? // Links to the AgentRun that created this\n\n  // Instance identification\n  instanceId   String // e.g., \"i-0abc123def\" or mock ID\n  instanceType String // e.g., \"t3.medium\"\n  provider     CloudProvider\n  region       String // e.g., \"ap-south-1\"\n  instanceName String? // e.g., \"api-server-prod\"\n\n  // Utilization metrics\n  cpuUtilization    Float // 0.0 to 1.0\n  memoryUtilization Float? // 0.0 to 1.0\n  networkInGb       Float?\n  networkOutGb      Float?\n\n  // Carbon results\n  energyKwh     Float\n  gridIntensity Float // gCO₂/kWh at time of measurement\n  carbonKg      Float // Final carbon footprint\n\n  // Flags\n  isIdle         Boolean @default(false) // < 5% CPU\n  isOversized    Boolean @default(false) // < 20% CPU\n  recommendation String? // AI-generated suggestion\n\n  timestamp DateTime @default(now())\n\n  @@index([region, timestamp(sort: Desc)])\n  @@index([isIdle])\n  @@index([isOversized])\n  @@index([agentRunId])\n}\n\n// ─── Carbonix Roles ─────────────────────────────────────────\n// Matches roleRedirects in carbonix-auth.config.ts\nenum userType {\n  SUPER_ADMIN\n  ADMIN\n  ANALYST\n  CONTENT_EDITOR\n  USER\n}\n\n// ─── Auth Models (do not remove) ─────────────────────────────────────────────\n\nmodel User {\n  id                 String              @id @default(cuid())\n  userName           String              @unique\n  email              String              @unique\n  password           String\n  isVerified         Boolean             @default(false)\n  isOnboarded        Boolean             @default(false)\n  type               userType            @default(USER)\n  profile            Profile?\n  projects           Project[]\n  verificationTokens VerificationToken[]\n  createdAt          DateTime            @default(now())\n  updatedAt          DateTime            @updatedAt\n  ChatHistory        ChatHistory?\n}\n\nmodel Project {\n  id           String    @id @default(cuid())\n  name         String\n  region       String?\n  sdkConnected Boolean   @default(false)\n  connectedAt  DateTime?\n  lastPingAt   DateTime?\n  userId       String\n  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  createdAt    DateTime  @default(now())\n  updatedAt    DateTime  @updatedAt\n\n  @@index([userId])\n}\n\n// Created automatically on signup. Add app-specific profile fields here.\nmodel Profile {\n  id          String  @id @default(cuid())\n  userId      String  @unique\n  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  fullName    String?\n  avatarUrl   String?\n  phoneNumber String?\n\n  // Notification Preferences\n  emailAlerts     Boolean @default(true)\n  pushAlerts      Boolean @default(false)\n  thresholdAlerts Boolean @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel VerificationToken {\n  id      String   @id @default(cuid())\n  token   String   @unique\n  expires DateTime\n  userId  String\n  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\n// ─── Team Members ─────────────────────────────────────────────\n\nmodel TeamMember {\n  id           String   @id @default(cuid())\n  name         String\n  email        String   @unique\n  role         String\n  projectId    String\n  projectName  String\n  co2Emissions Float\n  location     String\n  status       String   @default(\"ACTIVE\")\n  aiSuggestion String?\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n\n// ─── AI Chat History ──────────────────────────────────────────\n\nmodel ChatHistory {\n  id        String   @id @default(cuid())\n  userId    String   @unique\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  messages  Json     @default(\"[]\")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n",
  "inlineSchemaHash": "4a3ef39252cc2fe7b8062a902d6abf53eaed79023c1a4f62c4cc3c213e5bdfd5",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"MobileUser\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"deviceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pushToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastActiveAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"calculationCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"totalCO2Tracked\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"carbonAlertThreshold\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"theme\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notificationsEnabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"defaultProvider\",\"kind\":\"enum\",\"type\":\"CloudProvider\"},{\"name\":\"weeklyDigestEnabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"budgetAlertEnabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"greenTipsEnabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"carbonBudgetKg\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"preferredUnit\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"defaultRegion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bio\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"MobileUserStatus\"},{\"name\":\"banReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bannedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bannedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"calculations\",\"kind\":\"object\",\"type\":\"Calculation\",\"relationName\":\"CalculationToMobileUser\"},{\"name\":\"sessions\",\"kind\":\"object\",\"type\":\"Session\",\"relationName\":\"MobileUserToSession\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Calculation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"MobileUser\",\"relationName\":\"CalculationToMobileUser\"},{\"name\":\"provider\",\"kind\":\"enum\",\"type\":\"CloudProvider\"},{\"name\":\"region\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"regionName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instanceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instanceCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"hoursPerMonth\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"cpuUtilization\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"storageGB\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"ramGB\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"energyComputeKwh\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"energyMemoryKwh\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"energyStorageKwh\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"energyTotalKwh\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"co2GramsMonth\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"co2KgMonth\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"co2GramsHour\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"gridIntensity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"gridIntensitySource\",\"kind\":\"enum\",\"type\":\"GridIntensitySource\"},{\"name\":\"computePercentage\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"memoryPercentage\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"storagePercentage\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"rating\",\"kind\":\"enum\",\"type\":\"CarbonRating\"},{\"name\":\"ratingColor\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"realWorldEquivalent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recommendation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"recommendedRegion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"potentialReductionPct\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"source\",\"kind\":\"enum\",\"type\":\"CalculationSource\"},{\"name\":\"apiKeyId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"responseTimeMs\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"sdkVersion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Session\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"MobileUser\",\"relationName\":\"MobileUserToSession\"},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"platform\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"osVersion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"appVersion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"deviceModel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lastActivityAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ApiKey\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"prefix\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"hashedKey\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"permissions\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"requestsPerMinute\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"requestsPerDay\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"totalRequests\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastUsedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"todayRequests\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"todayResetAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ApiKeyStatus\"},{\"name\":\"revokedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"revokedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"revokeReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"FeatureFlag\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"FlagCategory\"},{\"name\":\"enabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"lastToggledBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastToggledAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"toggleCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"RemoteConfig\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"ConfigCategory\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"valueType\",\"kind\":\"enum\",\"type\":\"ConfigValueType\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastUpdatedBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"history\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AuditLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actorEmail\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"actorRole\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"action\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resource\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"resourceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"before\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"after\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"metadata\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Notification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"body\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"data\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"NotificationType\"},{\"name\":\"targetAudience\",\"kind\":\"enum\",\"type\":\"TargetAudience\"},{\"name\":\"targetUserIds\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"NotificationStatus\"},{\"name\":\"scheduledAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"totalRecipients\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"delivered\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"opened\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"failed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"UserNotification\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"body\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"data\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"isRead\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"PushToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"platform\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lastUsedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Region\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"enum\",\"type\":\"CloudProvider\"},{\"name\":\"code\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"country\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"continent\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"gridIntensity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"gridIntensitySource\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"renewablePercentage\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"pue\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"lat\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"lng\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"availableInstanceFamilies\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isPopular\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":null},\"InstanceType\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"enum\",\"type\":\"CloudProvider\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"family\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"InstanceCategory\"},{\"name\":\"vCPUs\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"memoryGB\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"cpuTdpWatts\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"storageType\",\"kind\":\"enum\",\"type\":\"StorageType\"},{\"name\":\"onDemandHourlyUsd\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"isPopular\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":null},\"Provider\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"key\",\"kind\":\"enum\",\"type\":\"CloudProvider\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"shortName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"logoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"regionCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"websiteUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"carbonPageUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isActive\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AgentRun\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"agentType\",\"kind\":\"enum\",\"type\":\"AgentType\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"AgentRunStatus\"},{\"name\":\"triggeredBy\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"details\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"recordsProcessed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"errorMessage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"durationMs\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"EmissionRecord\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"agentRunId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instanceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instanceType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"provider\",\"kind\":\"enum\",\"type\":\"CloudProvider\"},{\"name\":\"region\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"instanceName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"cpuUtilization\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"memoryUtilization\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"networkInGb\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"networkOutGb\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"energyKwh\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"gridIntensity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"carbonKg\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"isIdle\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isOversized\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"recommendation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isOnboarded\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"userType\"},{\"name\":\"profile\",\"kind\":\"object\",\"type\":\"Profile\",\"relationName\":\"ProfileToUser\"},{\"name\":\"projects\",\"kind\":\"object\",\"type\":\"Project\",\"relationName\":\"ProjectToUser\"},{\"name\":\"verificationTokens\",\"kind\":\"object\",\"type\":\"VerificationToken\",\"relationName\":\"UserToVerificationToken\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"ChatHistory\",\"kind\":\"object\",\"type\":\"ChatHistory\",\"relationName\":\"ChatHistoryToUser\"}],\"dbName\":null},\"Project\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"region\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sdkConnected\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"connectedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lastPingAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ProjectToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Profile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ProfileToUser\"},{\"name\":\"fullName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emailAlerts\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"pushAlerts\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"thresholdAlerts\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"VerificationToken\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"token\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"expires\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToVerificationToken\"}],\"dbName\":null},\"TeamMember\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"projectName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"co2Emissions\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"aiSuggestion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ChatHistory\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ChatHistoryToUser\"},{\"name\":\"messages\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

