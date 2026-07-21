
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  connectedAt: 'connectedAt',
  lastPingAt: 'lastPingAt',
  carbonBudgetKg: 'carbonBudgetKg',
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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
