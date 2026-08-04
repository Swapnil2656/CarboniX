
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
} = require('./runtime/edge.js')


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
  projectId: 'projectId',
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
  projectId: 'projectId',
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
  projectId: 'projectId',
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
  provider: 'provider',
  isDeployed: 'isDeployed',
  deploymentUrl: 'deploymentUrl',
  sdkConnected: 'sdkConnected',
  agenticMode: 'agenticMode',
  connectedAt: 'connectedAt',
  lastPingAt: 'lastPingAt',
  carbonBudgetKg: 'carbonBudgetKg',
  dataSource: 'dataSource',
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
  expoPushToken: 'expoPushToken',
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

exports.Prisma.PlatformCredentialScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  provider: 'provider',
  token: 'token',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PlatformTokenScalarFieldEnum = {
  id: 'id',
  projectId: 'projectId',
  platform: 'platform',
  encryptedToken: 'encryptedToken',
  projectSlug: 'projectSlug',
  status: 'status',
  lastVerifiedAt: 'lastVerifiedAt',
  lastError: 'lastError',
  failCount: 'failCount',
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

exports.DataSource = exports.$Enums.DataSource = {
  NO_CREDS: 'NO_CREDS',
  MOCK_DEMO: 'MOCK_DEMO',
  LIVE: 'LIVE'
};

exports.PlatformType = exports.$Enums.PlatformType = {
  VERCEL: 'VERCEL',
  NETLIFY: 'NETLIFY',
  RAILWAY: 'RAILWAY',
  RENDER: 'RENDER'
};

exports.PlatformTokenStatus = exports.$Enums.PlatformTokenStatus = {
  ACTIVE: 'ACTIVE',
  INVALID: 'INVALID',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED'
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
  ChatHistory: 'ChatHistory',
  PlatformCredential: 'PlatformCredential',
  PlatformToken: 'PlatformToken'
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
      "value": "D:\\CarboniX\\services\\api\\src\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
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
      },
      {
        "fromEnvVar": null,
        "value": "darwin-arm64"
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "D:\\CarboniX\\services\\api\\prisma\\schema.prisma",
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
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../src/generated/prisma\"\n  previewFeatures = [\"driverAdapters\"]\n  binaryTargets   = [\"native\", \"linux-musl-arm64-openssl-3.0.x\", \"linux-musl-arm64-openssl-1.1.x\", \"linux-musl-openssl-3.0.x\", \"debian-openssl-3.0.x\", \"debian-openssl-1.1.x\", \"darwin-arm64\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\n// ─── Enums ──────────────────────────────────────────────────\n\nenum CloudProvider {\n  AWS\n  GCP\n  AZURE\n  VERCEL\n  NETLIFY\n  RAILWAY\n  RENDER\n  OTHER\n}\n\nenum CarbonRating {\n  LOW\n  MEDIUM\n  HIGH\n  CRITICAL\n}\n\nenum CalculationSource {\n  MOBILE_APP\n  SDK\n  WEB_PLAYGROUND\n  API_DIRECT\n}\n\nenum ApiKeyStatus {\n  ACTIVE\n  REVOKED\n}\n\nenum FlagCategory {\n  SCREEN\n  FEATURE\n  EXPERIMENT\n  MAINTENANCE\n}\n\nenum ConfigCategory {\n  THRESHOLDS\n  RECOMMENDATIONS\n  CONTENT\n  MAINTENANCE\n}\n\nenum ConfigValueType {\n  NUMBER\n  STRING\n  BOOLEAN\n  JSON\n}\n\nenum NotificationType {\n  BROADCAST\n  TARGETED\n  THRESHOLD_ALERT\n}\n\nenum NotificationStatus {\n  DRAFT\n  SCHEDULED\n  SENDING\n  SENT\n  FAILED\n}\n\nenum TargetAudience {\n  ALL\n  PROVIDER_AWS\n  PROVIDER_GCP\n  PROVIDER_AZURE\n  CUSTOM\n}\n\nenum MobileUserStatus {\n  ACTIVE\n  BANNED\n}\n\nenum InstanceCategory {\n  GENERAL\n  COMPUTE\n  MEMORY\n  STORAGE\n  GPU\n}\n\nenum StorageType {\n  EBS\n  SSD\n  HDD\n  NVME\n}\n\nenum GridIntensitySource {\n  ELECTRICITY_MAPS\n  CCF_DEFAULT\n}\n\nenum DataSource {\n  NO_CREDS // No platform token connected — never collect or show real data\n  MOCK_DEMO // Demo/mock data explicitly acknowledged — always badge as demo\n  LIVE // Verified platform token present — real usage-based collection\n}\n\nenum PlatformType {\n  VERCEL\n  NETLIFY\n  RAILWAY\n  RENDER\n}\n\nenum PlatformTokenStatus {\n  ACTIVE // Last verification passed\n  INVALID // 401/403 from platform API — user must reconnect\n  EXPIRED // Token has an expiry and it has passed\n  REVOKED // Manually revoked by user\n}\n\n// ─── Mobile Users ───────────────────────────────────────────\n\nmodel MobileUser {\n  id                   String   @id @default(cuid())\n  email                String   @unique\n  passwordHash         String\n  name                 String\n  deviceId             String?\n  pushToken            String?\n  country              String?  @db.Char(2) // ISO 3166-1 alpha-2\n  lastActiveAt         DateTime @default(now())\n  calculationCount     Int      @default(0)\n  totalCO2Tracked      Float    @default(0) // kg\n  carbonAlertThreshold Float    @default(50) // kg CO₂/month\n\n  // Preferences\n  theme                String         @default(\"dark\") // light | dark | system\n  notificationsEnabled Boolean        @default(true)\n  defaultProvider      CloudProvider?\n  weeklyDigestEnabled  Boolean        @default(true)\n  budgetAlertEnabled   Boolean        @default(true)\n  greenTipsEnabled     Boolean        @default(true)\n  carbonBudgetKg       Float          @default(100) // Monthly CO₂ budget in kg\n  preferredUnit        String         @default(\"kg\") // \"kg\" or \"lbs\"\n  defaultRegion        String? // e.g., \"ap-south-1\"\n\n  // Profile fields (for Settings > Profile)\n  avatarUrl String?\n  bio       String?\n\n  // Status\n  status    MobileUserStatus @default(ACTIVE)\n  banReason String?\n  bannedAt  DateTime?\n  bannedBy  String? // Admin user ID (from web DB)\n\n  // Relations\n  calculations Calculation[]\n  sessions     Session[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([email])\n  @@index([deviceId])\n  @@index([status, lastActiveAt(sort: Desc)])\n  @@index([createdAt(sort: Desc)])\n}\n\n// ─── Calculations ───────────────────────────────────────────\n\nmodel Calculation {\n  id     String     @id @default(cuid())\n  userId String\n  user   MobileUser @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  // Input parameters\n  provider       CloudProvider\n  region         String\n  regionName     String\n  instanceType   String\n  instanceCount  Int\n  hoursPerMonth  Int\n  cpuUtilization Float // 0.0 to 1.0\n  storageGB      Float         @default(0)\n  ramGB          Float\n\n  // Energy breakdown (kWh)\n  energyComputeKwh Float\n  energyMemoryKwh  Float\n  energyStorageKwh Float\n  energyTotalKwh   Float\n\n  // Carbon results\n  co2GramsMonth       Float\n  co2KgMonth          Float\n  co2GramsHour        Float\n  gridIntensity       Float // gCO₂/kWh used\n  gridIntensitySource GridIntensitySource @default(CCF_DEFAULT)\n\n  // Breakdown percentages\n  computePercentage Float\n  memoryPercentage  Float\n  storagePercentage Float\n\n  // Rating\n  rating      CarbonRating\n  ratingColor String // hex color\n\n  // Context\n  realWorldEquivalent   String\n  recommendation        String\n  recommendedRegion     String?\n  potentialReductionPct Float?\n\n  // Metadata\n  source         CalculationSource @default(MOBILE_APP)\n  apiKeyId       String?\n  responseTimeMs Int\n  sdkVersion     String?\n\n  createdAt DateTime @default(now())\n\n  @@index([userId, createdAt(sort: Desc)])\n  @@index([provider])\n  @@index([region])\n  @@index([rating])\n  @@index([source])\n  @@index([createdAt(sort: Desc)])\n}\n\n// ─── Sessions ───────────────────────────────────────────────\n\nmodel Session {\n  id             String     @id @default(cuid())\n  userId         String\n  user           MobileUser @relation(fields: [userId], references: [id], onDelete: Cascade)\n  refreshToken   String     @unique\n  platform       String?\n  osVersion      String?\n  appVersion     String?\n  deviceModel    String?\n  ip             String?\n  isActive       Boolean    @default(true)\n  lastActivityAt DateTime   @default(now())\n  expiresAt      DateTime\n\n  createdAt DateTime @default(now())\n\n  @@index([userId])\n  @@index([refreshToken])\n}\n\n// ─── API Keys ───────────────────────────────────────────────\n\nmodel ApiKey {\n  id          String   @id @default(cuid())\n  name        String\n  prefix      String   @db.VarChar(12) // First 8 chars for identification\n  hashedKey   String   @unique\n  createdBy   String // Admin user ID (from web DB)\n  projectId   String?\n  project     Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  permissions String[] // ['calculate', 'compare', 'recommend', 'history']\n\n  // Rate limits\n  requestsPerMinute Int @default(60)\n  requestsPerDay    Int @default(10000)\n\n  // Usage tracking\n  totalRequests Int       @default(0)\n  lastUsedAt    DateTime?\n  todayRequests Int       @default(0)\n  todayResetAt  DateTime  @default(now())\n\n  // Status\n  status       ApiKeyStatus @default(ACTIVE)\n  revokedAt    DateTime?\n  revokedBy    String? // Admin user ID\n  revokeReason String?\n  expiresAt    DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([hashedKey])\n  @@index([createdBy])\n  @@index([status])\n}\n\n// ─── Feature Flags ──────────────────────────────────────────\n\nmodel FeatureFlag {\n  id          String       @id @default(cuid())\n  key         String       @unique // e.g., 'config_builder_screen'\n  displayName String\n  description String       @default(\"\")\n  category    FlagCategory\n  enabled     Boolean      @default(true)\n  value       Json? // Optional payload\n\n  // Metadata\n  lastToggledBy String? // Admin user ID\n  lastToggledAt DateTime @default(now())\n  toggleCount   Int      @default(0)\n  version       Int      @default(1)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([key])\n}\n\n// ─── Remote Config ──────────────────────────────────────────\n\nmodel RemoteConfig {\n  id            String          @id @default(cuid())\n  key           String          @unique\n  displayName   String\n  category      ConfigCategory\n  value         Json\n  valueType     ConfigValueType\n  description   String          @default(\"\")\n  lastUpdatedBy String? // Admin user ID\n  version       Int             @default(1)\n\n  // History (stored as JSON array for simplicity)\n  history Json @default(\"[]\") // Array of { value, updatedBy, updatedAt }\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([key])\n}\n\n// ─── Audit Logs ─────────────────────────────────────────────\n\nmodel AuditLog {\n  id         String  @id @default(cuid())\n  actorId    String // Admin user ID\n  actorEmail String\n  actorRole  String\n  action     String // e.g., 'feature_flag.toggle'\n  resource   String // e.g., 'feature_flags'\n  resourceId String?\n\n  // Change details\n  before   Json?\n  after    Json?\n  metadata Json?\n\n  ip        String\n  userAgent String\n\n  createdAt DateTime @default(now())\n\n  @@index([actorId, createdAt(sort: Desc)])\n  @@index([action, createdAt(sort: Desc)])\n  @@index([resource, resourceId])\n}\n\n// ─── Notifications ──────────────────────────────────────────\n\nmodel Notification {\n  id             String           @id @default(cuid())\n  title          String           @db.VarChar(100)\n  body           String           @db.VarChar(500)\n  data           Json?\n  type           NotificationType\n  targetAudience TargetAudience   @default(ALL)\n  targetUserIds  String[] // Mobile user IDs (for TARGETED)\n\n  // Lifecycle\n  status      NotificationStatus @default(DRAFT)\n  scheduledAt DateTime?\n  sentAt      DateTime?\n\n  // Stats\n  totalRecipients Int @default(0)\n  delivered       Int @default(0)\n  opened          Int @default(0)\n  failed          Int @default(0)\n\n  createdBy String // Admin user ID\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel UserNotification {\n  id     String  @id @default(cuid())\n  userId String\n  title  String\n  body   String\n  type   String // \"HIGH_EMISSION\" | \"BUDGET_ALERT\" | \"GREEN_TIP\" | \"WEEKLY_DIGEST\" | \"SYSTEM\"\n  data   Json? // Optional payload (e.g., calculationId, region)\n  isRead Boolean @default(false)\n\n  createdAt DateTime @default(now())\n\n  @@index([userId, createdAt(sort: Desc)])\n  @@index([userId, isRead])\n}\n\n// ─── Push Tokens ────────────────────────────────────────────\n\nmodel PushToken {\n  id         String   @id @default(cuid())\n  userId     String\n  token      String   @unique // Expo push token\n  platform   String // 'ios' | 'android'\n  isActive   Boolean  @default(true)\n  lastUsedAt DateTime @default(now())\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([token])\n}\n\n// ─── Reference Data: Regions (Seeded) ───────────────────────\n\nmodel Region {\n  id                        String        @id @default(cuid())\n  provider                  CloudProvider\n  code                      String // e.g., 'us-east-1'\n  name                      String // e.g., 'US East (N. Virginia)'\n  country                   String        @db.Char(2)\n  continent                 String\n  gridIntensity             Float // gCO₂/kWh\n  gridIntensitySource       String        @default(\"ccf_default\")\n  renewablePercentage       Float?\n  pue                       Float         @default(1.2) // Power Usage Effectiveness\n  lat                       Float\n  lng                       Float\n  availableInstanceFamilies String[]\n  isPopular                 Boolean       @default(false)\n\n  @@unique([provider, code])\n  @@index([provider, isPopular(sort: Desc)])\n  @@index([gridIntensity])\n}\n\n// ─── Reference Data: Instance Types (Seeded) ────────────────\n\nmodel InstanceType {\n  id                String           @id @default(cuid())\n  provider          CloudProvider\n  name              String // e.g., 't3.medium'\n  displayName       String // e.g., 'T3 Medium'\n  family            String // e.g., 't3'\n  category          InstanceCategory\n  vCPUs             Int\n  memoryGB          Float\n  cpuTdpWatts       Float // Thermal Design Power\n  storageType       StorageType      @default(SSD)\n  onDemandHourlyUsd Float?\n  isPopular         Boolean          @default(false)\n\n  @@unique([provider, name])\n  @@index([provider, isPopular(sort: Desc)])\n}\n\n// ─── Reference Data: Providers (Seeded) ─────────────────────\n\nmodel Provider {\n  id            String        @id @default(cuid())\n  key           CloudProvider @unique\n  name          String // e.g., 'Amazon Web Services'\n  shortName     String // e.g., 'AWS'\n  logoUrl       String?\n  regionCount   Int           @default(0)\n  websiteUrl    String?\n  carbonPageUrl String? // Link to provider's sustainability page\n  isActive      Boolean       @default(true)\n\n  createdAt DateTime @default(now())\n}\n\n// ─── Agent System (Phase 6) ─────────────────────────────────\n\nenum AgentType {\n  COLLECTOR\n  ANALYST\n  CICD_GATE\n  REPORTER\n  ORCHESTRATOR\n}\n\nenum AgentRunStatus {\n  RUNNING\n  SUCCESS\n  FAILED\n}\n\nmodel AgentRun {\n  id          String         @id @default(cuid())\n  projectId   String?\n  project     Project?       @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  agentType   AgentType\n  status      AgentRunStatus @default(RUNNING)\n  triggeredBy String         @default(\"cron\") // \"cron\" | \"manual\" | \"webhook\"\n\n  // Results\n  summary          String? // Human-readable one-liner\n  details          Json? // Full structured output\n  recordsProcessed Int     @default(0)\n  errorMessage     String?\n\n  // Timing\n  startedAt   DateTime  @default(now())\n  completedAt DateTime?\n  durationMs  Int?\n\n  createdAt DateTime @default(now())\n\n  @@index([agentType, createdAt(sort: Desc)])\n  @@index([status])\n}\n\nmodel EmissionRecord {\n  id         String   @id @default(cuid())\n  agentRunId String? // Links to the AgentRun that created this\n  projectId  String?\n  project    Project? @relation(fields: [projectId], references: [id], onDelete: Cascade)\n\n  // Instance identification\n  instanceId   String // e.g., \"i-0abc123def\" or mock ID\n  instanceType String // e.g., \"t3.medium\"\n  provider     CloudProvider\n  region       String // e.g., \"ap-south-1\"\n  instanceName String? // e.g., \"api-server-prod\"\n\n  // Utilization metrics\n  cpuUtilization    Float // 0.0 to 1.0\n  memoryUtilization Float? // 0.0 to 1.0\n  networkInGb       Float?\n  networkOutGb      Float?\n\n  // Carbon results\n  energyKwh     Float\n  gridIntensity Float // gCO₂/kWh at time of measurement\n  carbonKg      Float // Final carbon footprint\n\n  // Flags\n  isIdle         Boolean @default(false) // < 5% CPU\n  isOversized    Boolean @default(false) // < 20% CPU\n  recommendation String? // AI-generated suggestion\n\n  timestamp DateTime @default(now())\n\n  @@index([region, timestamp(sort: Desc)])\n  @@index([isIdle])\n  @@index([isOversized])\n  @@index([agentRunId])\n}\n\n// ─── Carbonix Roles ─────────────────────────────────────────\n// Matches roleRedirects in carbonix-auth.config.ts\nenum userType {\n  SUPER_ADMIN\n  ADMIN\n  ANALYST\n  CONTENT_EDITOR\n  USER\n}\n\n// ─── Auth Models (do not remove) ─────────────────────────────────────────────\n\nmodel User {\n  id                 String              @id @default(cuid())\n  userName           String              @unique\n  email              String              @unique\n  password           String\n  isVerified         Boolean             @default(false)\n  isOnboarded        Boolean             @default(false)\n  type               userType            @default(USER)\n  profile            Profile?\n  projects           Project[]\n  verificationTokens VerificationToken[]\n  createdAt          DateTime            @default(now())\n  updatedAt          DateTime            @updatedAt\n  ChatHistory        ChatHistory?\n}\n\nmodel Project {\n  id             String         @id @default(cuid())\n  name           String\n  region         String?\n  provider       CloudProvider?\n  isDeployed     Boolean        @default(false)\n  deploymentUrl  String?\n  sdkConnected   Boolean        @default(false)\n  agenticMode    Boolean        @default(false)\n  connectedAt    DateTime?\n  lastPingAt     DateTime?\n  carbonBudgetKg Float?         @default(100) // Monthly CO₂ budget in kg\n\n  // Data source state — never silently blend mock and real data\n  dataSource DataSource @default(NO_CREDS)\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  agentRuns           AgentRun[]\n  emissionRecords     EmissionRecord[]\n  apiKeys             ApiKey[]\n  // TODO: drop PlatformCredential after all enactRegionSwitch call sites are migrated to PlatformToken\n  platformCredentials PlatformCredential[]\n  platformTokens      PlatformToken[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([dataSource])\n}\n\n// Created automatically on signup. Add app-specific profile fields here.\nmodel Profile {\n  id          String  @id @default(cuid())\n  userId      String  @unique\n  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  fullName    String?\n  avatarUrl   String?\n  phoneNumber String?\n\n  // Notification Preferences\n  emailAlerts     Boolean @default(true)\n  pushAlerts      Boolean @default(false)\n  thresholdAlerts Boolean @default(true)\n  expoPushToken   String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel VerificationToken {\n  id      String   @id @default(cuid())\n  token   String   @unique\n  expires DateTime\n  userId  String\n  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\n// ─── Team Members ─────────────────────────────────────────────\n\nmodel TeamMember {\n  id           String   @id @default(cuid())\n  name         String\n  email        String   @unique\n  role         String\n  projectId    String\n  projectName  String\n  co2Emissions Float\n  location     String\n  status       String   @default(\"ACTIVE\")\n  aiSuggestion String?\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n\n// ─── AI Chat History ──────────────────────────────────────────\n\nmodel ChatHistory {\n  id        String   @id @default(cuid())\n  userId    String   @unique\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  messages  Json     @default(\"[]\")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// ─── Platform Credentials (LEGACY — kept for enactRegionSwitch backward-compat) ────\n// TODO: migrate enactRegionSwitch to read from PlatformToken, then drop this model\n\nmodel PlatformCredential {\n  id        String        @id @default(cuid())\n  projectId String\n  project   Project       @relation(fields: [projectId], references: [id], onDelete: Cascade)\n  provider  CloudProvider // e.g. VERCEL, NETLIFY, AWS\n  token     String // The API token or Installation ID (plaintext — legacy)\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  @@unique([projectId, provider])\n}\n\n// ─── Platform Tokens (NEW — encrypted, with status tracking) ───────────────────\n\nmodel PlatformToken {\n  id        String  @id @default(cuid())\n  projectId String\n  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)\n\n  platform       PlatformType // VERCEL | NETLIFY | RAILWAY | RENDER\n  encryptedToken String // AES-256-GCM encrypted; key in TOKEN_ENCRYPTION_KEY env\n  projectSlug    String? // Platform project slug/ID for scoping API calls\n  status         PlatformTokenStatus @default(ACTIVE)\n\n  // Verification tracking\n  lastVerifiedAt DateTime?\n  lastError      String? // Last error message from platform API (for UI display)\n  failCount      Int       @default(0) // Consecutive auth failures before INVALID\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@unique([projectId, platform])\n  @@index([projectId, status])\n  @@index([status])\n}\n",
  "inlineSchemaHash": "2673f4710d0568e959754fcbd42d72990476ed704a1b05bd1dfaa102b07274ad",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"MobileUser\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deviceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pushToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastActiveAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calculationCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCO2Tracked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"carbonAlertThreshold\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":50,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"theme\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"dark\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notificationsEnabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"defaultProvider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weeklyDigestEnabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"budgetAlertEnabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"greenTipsEnabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"carbonBudgetKg\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":100,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preferredUnit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"kg\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"defaultRegion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MobileUserStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"banReason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bannedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bannedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calculations\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Calculation\",\"relationName\":\"CalculationToMobileUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"relationName\":\"MobileUserToSession\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Calculation\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MobileUser\",\"relationName\":\"CalculationToMobileUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"region\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"regionName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instanceType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instanceCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hoursPerMonth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cpuUtilization\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storageGB\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ramGB\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"energyComputeKwh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"energyMemoryKwh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"energyStorageKwh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"energyTotalKwh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2GramsMonth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2KgMonth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2GramsHour\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gridIntensity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gridIntensitySource\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"GridIntensitySource\",\"default\":\"CCF_DEFAULT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"computePercentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memoryPercentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storagePercentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rating\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CarbonRating\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ratingColor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"realWorldEquivalent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recommendation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recommendedRegion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"potentialReductionPct\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CalculationSource\",\"default\":\"MOBILE_APP\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"apiKeyId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"responseTimeMs\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sdkVersion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Session\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MobileUser\",\"relationName\":\"MobileUserToSession\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platform\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"osVersion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"appVersion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deviceModel\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ip\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastActivityAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ApiKey\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prefix\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hashedKey\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"ApiKeyToProject\",\"relationFromFields\":[\"projectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permissions\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestsPerMinute\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":60,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requestsPerDay\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":10000,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalRequests\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastUsedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"todayRequests\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"todayResetAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ApiKeyStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"revokeReason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FeatureFlag\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FlagCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastToggledBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastToggledAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"toggleCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RemoteConfig\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConfigCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"valueType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConfigValueType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastUpdatedBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"version\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"history\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AuditLog\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actorEmail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actorRole\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"action\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resource\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resourceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"before\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"after\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ip\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Notification\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NotificationType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetAudience\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TargetAudience\",\"default\":\"ALL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetUserIds\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"NotificationStatus\",\"default\":\"DRAFT\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scheduledAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalRecipients\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivered\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"opened\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"failed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserNotification\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"data\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isRead\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PushToken\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platform\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastUsedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Region\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"continent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gridIntensity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gridIntensitySource\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"ccf_default\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"renewablePercentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":1.2000000000000002,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lng\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"availableInstanceFamilies\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPopular\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"code\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"code\"]}],\"isGenerated\":false},\"InstanceType\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"family\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"InstanceCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vCPUs\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memoryGB\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cpuTdpWatts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storageType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StorageType\",\"default\":\"SSD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"onDemandHourlyUsd\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPopular\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"name\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"name\"]}],\"isGenerated\":false},\"Provider\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shortName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logoUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"regionCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"websiteUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"carbonPageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AgentRun\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"AgentRunToProject\",\"relationFromFields\":[\"projectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agentType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AgentType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AgentRunStatus\",\"default\":\"RUNNING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"triggeredBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"cron\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"summary\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recordsProcessed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"errorMessage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"completedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationMs\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EmissionRecord\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agentRunId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"EmissionRecordToProject\",\"relationFromFields\":[\"projectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instanceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instanceType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"region\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"instanceName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cpuUtilization\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memoryUtilization\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"networkInGb\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"networkOutGb\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"energyKwh\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gridIntensity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"carbonKg\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isIdle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isOversized\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recommendation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isOnboarded\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"userType\",\"default\":\"USER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projects\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"ProjectToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verificationTokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"VerificationToken\",\"relationName\":\"UserToVerificationToken\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"ChatHistory\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChatHistory\",\"relationName\":\"ChatHistoryToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Project\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"region\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isDeployed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deploymentUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sdkConnected\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agenticMode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"connectedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastPingAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"carbonBudgetKg\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":100,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dataSource\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DataSource\",\"default\":\"NO_CREDS\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ProjectToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agentRuns\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AgentRun\",\"relationName\":\"AgentRunToProject\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emissionRecords\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EmissionRecord\",\"relationName\":\"EmissionRecordToProject\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"apiKeys\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ApiKey\",\"relationName\":\"ApiKeyToProject\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platformCredentials\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PlatformCredential\",\"relationName\":\"PlatformCredentialToProject\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platformTokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PlatformToken\",\"relationName\":\"PlatformTokenToProject\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Profile\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ProfileToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fullName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailAlerts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pushAlerts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thresholdAlerts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expoPushToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"VerificationToken\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToVerificationToken\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TeamMember\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"co2Emissions\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"aiSuggestion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChatHistory\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ChatHistoryToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PlatformCredential\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"PlatformCredentialToProject\",\"relationFromFields\":[\"projectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CloudProvider\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"projectId\",\"provider\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"projectId\",\"provider\"]}],\"isGenerated\":false},\"PlatformToken\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Project\",\"relationName\":\"PlatformTokenToProject\",\"relationFromFields\":[\"projectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"platform\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PlatformType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"encryptedToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"projectSlug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PlatformTokenStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastVerifiedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastError\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"failCount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"projectId\",\"platform\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"projectId\",\"platform\"]}],\"isGenerated\":false}},\"enums\":{\"CloudProvider\":{\"values\":[{\"name\":\"AWS\",\"dbName\":null},{\"name\":\"GCP\",\"dbName\":null},{\"name\":\"AZURE\",\"dbName\":null},{\"name\":\"VERCEL\",\"dbName\":null},{\"name\":\"NETLIFY\",\"dbName\":null},{\"name\":\"RAILWAY\",\"dbName\":null},{\"name\":\"RENDER\",\"dbName\":null},{\"name\":\"OTHER\",\"dbName\":null}],\"dbName\":null},\"CarbonRating\":{\"values\":[{\"name\":\"LOW\",\"dbName\":null},{\"name\":\"MEDIUM\",\"dbName\":null},{\"name\":\"HIGH\",\"dbName\":null},{\"name\":\"CRITICAL\",\"dbName\":null}],\"dbName\":null},\"CalculationSource\":{\"values\":[{\"name\":\"MOBILE_APP\",\"dbName\":null},{\"name\":\"SDK\",\"dbName\":null},{\"name\":\"WEB_PLAYGROUND\",\"dbName\":null},{\"name\":\"API_DIRECT\",\"dbName\":null}],\"dbName\":null},\"ApiKeyStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"REVOKED\",\"dbName\":null}],\"dbName\":null},\"FlagCategory\":{\"values\":[{\"name\":\"SCREEN\",\"dbName\":null},{\"name\":\"FEATURE\",\"dbName\":null},{\"name\":\"EXPERIMENT\",\"dbName\":null},{\"name\":\"MAINTENANCE\",\"dbName\":null}],\"dbName\":null},\"ConfigCategory\":{\"values\":[{\"name\":\"THRESHOLDS\",\"dbName\":null},{\"name\":\"RECOMMENDATIONS\",\"dbName\":null},{\"name\":\"CONTENT\",\"dbName\":null},{\"name\":\"MAINTENANCE\",\"dbName\":null}],\"dbName\":null},\"ConfigValueType\":{\"values\":[{\"name\":\"NUMBER\",\"dbName\":null},{\"name\":\"STRING\",\"dbName\":null},{\"name\":\"BOOLEAN\",\"dbName\":null},{\"name\":\"JSON\",\"dbName\":null}],\"dbName\":null},\"NotificationType\":{\"values\":[{\"name\":\"BROADCAST\",\"dbName\":null},{\"name\":\"TARGETED\",\"dbName\":null},{\"name\":\"THRESHOLD_ALERT\",\"dbName\":null}],\"dbName\":null},\"NotificationStatus\":{\"values\":[{\"name\":\"DRAFT\",\"dbName\":null},{\"name\":\"SCHEDULED\",\"dbName\":null},{\"name\":\"SENDING\",\"dbName\":null},{\"name\":\"SENT\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"TargetAudience\":{\"values\":[{\"name\":\"ALL\",\"dbName\":null},{\"name\":\"PROVIDER_AWS\",\"dbName\":null},{\"name\":\"PROVIDER_GCP\",\"dbName\":null},{\"name\":\"PROVIDER_AZURE\",\"dbName\":null},{\"name\":\"CUSTOM\",\"dbName\":null}],\"dbName\":null},\"MobileUserStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"BANNED\",\"dbName\":null}],\"dbName\":null},\"InstanceCategory\":{\"values\":[{\"name\":\"GENERAL\",\"dbName\":null},{\"name\":\"COMPUTE\",\"dbName\":null},{\"name\":\"MEMORY\",\"dbName\":null},{\"name\":\"STORAGE\",\"dbName\":null},{\"name\":\"GPU\",\"dbName\":null}],\"dbName\":null},\"StorageType\":{\"values\":[{\"name\":\"EBS\",\"dbName\":null},{\"name\":\"SSD\",\"dbName\":null},{\"name\":\"HDD\",\"dbName\":null},{\"name\":\"NVME\",\"dbName\":null}],\"dbName\":null},\"GridIntensitySource\":{\"values\":[{\"name\":\"ELECTRICITY_MAPS\",\"dbName\":null},{\"name\":\"CCF_DEFAULT\",\"dbName\":null}],\"dbName\":null},\"DataSource\":{\"values\":[{\"name\":\"NO_CREDS\",\"dbName\":null},{\"name\":\"MOCK_DEMO\",\"dbName\":null},{\"name\":\"LIVE\",\"dbName\":null}],\"dbName\":null},\"PlatformType\":{\"values\":[{\"name\":\"VERCEL\",\"dbName\":null},{\"name\":\"NETLIFY\",\"dbName\":null},{\"name\":\"RAILWAY\",\"dbName\":null},{\"name\":\"RENDER\",\"dbName\":null}],\"dbName\":null},\"PlatformTokenStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INVALID\",\"dbName\":null},{\"name\":\"EXPIRED\",\"dbName\":null},{\"name\":\"REVOKED\",\"dbName\":null}],\"dbName\":null},\"AgentType\":{\"values\":[{\"name\":\"COLLECTOR\",\"dbName\":null},{\"name\":\"ANALYST\",\"dbName\":null},{\"name\":\"CICD_GATE\",\"dbName\":null},{\"name\":\"REPORTER\",\"dbName\":null},{\"name\":\"ORCHESTRATOR\",\"dbName\":null}],\"dbName\":null},\"AgentRunStatus\":{\"values\":[{\"name\":\"RUNNING\",\"dbName\":null},{\"name\":\"SUCCESS\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"userType\":{\"values\":[{\"name\":\"SUPER_ADMIN\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"ANALYST\",\"dbName\":null},{\"name\":\"CONTENT_EDITOR\",\"dbName\":null},{\"name\":\"USER\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

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

