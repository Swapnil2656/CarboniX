-- CreateEnum
CREATE TYPE "CloudProvider" AS ENUM ('AWS', 'GCP', 'AZURE');

-- CreateEnum
CREATE TYPE "CarbonRating" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "CalculationSource" AS ENUM ('MOBILE_APP', 'SDK', 'WEB_PLAYGROUND', 'API_DIRECT');

-- CreateEnum
CREATE TYPE "ApiKeyStatus" AS ENUM ('ACTIVE', 'REVOKED');

-- CreateEnum
CREATE TYPE "FlagCategory" AS ENUM ('SCREEN', 'FEATURE', 'EXPERIMENT', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "ConfigCategory" AS ENUM ('THRESHOLDS', 'RECOMMENDATIONS', 'CONTENT', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "ConfigValueType" AS ENUM ('NUMBER', 'STRING', 'BOOLEAN', 'JSON');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('BROADCAST', 'TARGETED', 'THRESHOLD_ALERT');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'SENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "TargetAudience" AS ENUM ('ALL', 'PROVIDER_AWS', 'PROVIDER_GCP', 'PROVIDER_AZURE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "MobileUserStatus" AS ENUM ('ACTIVE', 'BANNED');

-- CreateEnum
CREATE TYPE "InstanceCategory" AS ENUM ('GENERAL', 'COMPUTE', 'MEMORY', 'STORAGE', 'GPU');

-- CreateEnum
CREATE TYPE "StorageType" AS ENUM ('EBS', 'SSD', 'HDD', 'NVME');

-- CreateEnum
CREATE TYPE "GridIntensitySource" AS ENUM ('ELECTRICITY_MAPS', 'CCF_DEFAULT');

-- CreateTable
CREATE TABLE "MobileUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deviceId" TEXT,
    "pushToken" TEXT,
    "country" CHAR(2),
    "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calculationCount" INTEGER NOT NULL DEFAULT 0,
    "totalCO2Tracked" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbonAlertThreshold" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "defaultProvider" "CloudProvider",
    "status" "MobileUserStatus" NOT NULL DEFAULT 'ACTIVE',
    "banReason" TEXT,
    "bannedAt" TIMESTAMP(3),
    "bannedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobileUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "CloudProvider" NOT NULL,
    "region" TEXT NOT NULL,
    "regionName" TEXT NOT NULL,
    "instanceType" TEXT NOT NULL,
    "instanceCount" INTEGER NOT NULL,
    "hoursPerMonth" INTEGER NOT NULL,
    "cpuUtilization" DOUBLE PRECISION NOT NULL,
    "storageGB" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ramGB" DOUBLE PRECISION NOT NULL,
    "energyComputeKwh" DOUBLE PRECISION NOT NULL,
    "energyMemoryKwh" DOUBLE PRECISION NOT NULL,
    "energyStorageKwh" DOUBLE PRECISION NOT NULL,
    "energyTotalKwh" DOUBLE PRECISION NOT NULL,
    "co2GramsMonth" DOUBLE PRECISION NOT NULL,
    "co2KgMonth" DOUBLE PRECISION NOT NULL,
    "co2GramsHour" DOUBLE PRECISION NOT NULL,
    "gridIntensity" DOUBLE PRECISION NOT NULL,
    "gridIntensitySource" "GridIntensitySource" NOT NULL DEFAULT 'CCF_DEFAULT',
    "computePercentage" DOUBLE PRECISION NOT NULL,
    "memoryPercentage" DOUBLE PRECISION NOT NULL,
    "storagePercentage" DOUBLE PRECISION NOT NULL,
    "rating" "CarbonRating" NOT NULL,
    "ratingColor" TEXT NOT NULL,
    "realWorldEquivalent" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "recommendedRegion" TEXT,
    "potentialReductionPct" DOUBLE PRECISION,
    "source" "CalculationSource" NOT NULL DEFAULT 'MOBILE_APP',
    "apiKeyId" TEXT,
    "responseTimeMs" INTEGER NOT NULL,
    "sdkVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "platform" TEXT,
    "osVersion" TEXT,
    "appVersion" TEXT,
    "deviceModel" TEXT,
    "ip" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prefix" VARCHAR(12) NOT NULL,
    "hashedKey" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "permissions" TEXT[],
    "requestsPerMinute" INTEGER NOT NULL DEFAULT 60,
    "requestsPerDay" INTEGER NOT NULL DEFAULT 10000,
    "totalRequests" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "todayRequests" INTEGER NOT NULL DEFAULT 0,
    "todayResetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApiKeyStatus" NOT NULL DEFAULT 'ACTIVE',
    "revokedAt" TIMESTAMP(3),
    "revokedBy" TEXT,
    "revokeReason" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "category" "FlagCategory" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "value" JSONB,
    "lastToggledBy" TEXT,
    "lastToggledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toggleCount" INTEGER NOT NULL DEFAULT 0,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RemoteConfig" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "category" "ConfigCategory" NOT NULL,
    "value" JSONB NOT NULL,
    "valueType" "ConfigValueType" NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "lastUpdatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "history" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RemoteConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "actorEmail" TEXT NOT NULL,
    "actorRole" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "before" JSONB,
    "after" JSONB,
    "metadata" JSONB,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "data" JSONB,
    "type" "NotificationType" NOT NULL,
    "targetAudience" "TargetAudience" NOT NULL DEFAULT 'ALL',
    "targetUserIds" TEXT[],
    "status" "NotificationStatus" NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "totalRecipients" INTEGER NOT NULL DEFAULT 0,
    "delivered" INTEGER NOT NULL DEFAULT 0,
    "opened" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PushToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "provider" "CloudProvider" NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" CHAR(2) NOT NULL,
    "continent" TEXT NOT NULL,
    "gridIntensity" DOUBLE PRECISION NOT NULL,
    "gridIntensitySource" TEXT NOT NULL DEFAULT 'ccf_default',
    "renewablePercentage" DOUBLE PRECISION,
    "pue" DOUBLE PRECISION NOT NULL DEFAULT 1.2,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "availableInstanceFamilies" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstanceType" (
    "id" TEXT NOT NULL,
    "provider" "CloudProvider" NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "category" "InstanceCategory" NOT NULL,
    "vCPUs" INTEGER NOT NULL,
    "memoryGB" DOUBLE PRECISION NOT NULL,
    "cpuTdpWatts" DOUBLE PRECISION NOT NULL,
    "storageType" "StorageType" NOT NULL DEFAULT 'SSD',
    "onDemandHourlyUsd" DOUBLE PRECISION,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InstanceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "key" "CloudProvider" NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "logoUrl" TEXT,
    "regionCount" INTEGER NOT NULL DEFAULT 0,
    "websiteUrl" TEXT,
    "carbonPageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MobileUser_email_key" ON "MobileUser"("email");

-- CreateIndex
CREATE INDEX "MobileUser_email_idx" ON "MobileUser"("email");

-- CreateIndex
CREATE INDEX "MobileUser_deviceId_idx" ON "MobileUser"("deviceId");

-- CreateIndex
CREATE INDEX "MobileUser_status_lastActiveAt_idx" ON "MobileUser"("status", "lastActiveAt" DESC);

-- CreateIndex
CREATE INDEX "MobileUser_createdAt_idx" ON "MobileUser"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "Calculation_userId_createdAt_idx" ON "Calculation"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Calculation_provider_idx" ON "Calculation"("provider");

-- CreateIndex
CREATE INDEX "Calculation_region_idx" ON "Calculation"("region");

-- CreateIndex
CREATE INDEX "Calculation_rating_idx" ON "Calculation"("rating");

-- CreateIndex
CREATE INDEX "Calculation_source_idx" ON "Calculation"("source");

-- CreateIndex
CREATE INDEX "Calculation_createdAt_idx" ON "Calculation"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Session_refreshToken_key" ON "Session"("refreshToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Session_refreshToken_idx" ON "Session"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_hashedKey_key" ON "ApiKey"("hashedKey");

-- CreateIndex
CREATE INDEX "ApiKey_hashedKey_idx" ON "ApiKey"("hashedKey");

-- CreateIndex
CREATE INDEX "ApiKey_createdBy_idx" ON "ApiKey"("createdBy");

-- CreateIndex
CREATE INDEX "ApiKey_status_idx" ON "ApiKey"("status");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlag_key_key" ON "FeatureFlag"("key");

-- CreateIndex
CREATE INDEX "FeatureFlag_key_idx" ON "FeatureFlag"("key");

-- CreateIndex
CREATE UNIQUE INDEX "RemoteConfig_key_key" ON "RemoteConfig"("key");

-- CreateIndex
CREATE INDEX "RemoteConfig_key_idx" ON "RemoteConfig"("key");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_createdAt_idx" ON "AuditLog"("actorId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "AuditLog_action_createdAt_idx" ON "AuditLog"("action", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "AuditLog_resource_resourceId_idx" ON "AuditLog"("resource", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "PushToken_token_key" ON "PushToken"("token");

-- CreateIndex
CREATE INDEX "PushToken_userId_idx" ON "PushToken"("userId");

-- CreateIndex
CREATE INDEX "PushToken_token_idx" ON "PushToken"("token");

-- CreateIndex
CREATE INDEX "Region_provider_isPopular_idx" ON "Region"("provider", "isPopular" DESC);

-- CreateIndex
CREATE INDEX "Region_gridIntensity_idx" ON "Region"("gridIntensity");

-- CreateIndex
CREATE UNIQUE INDEX "Region_provider_code_key" ON "Region"("provider", "code");

-- CreateIndex
CREATE INDEX "InstanceType_provider_isPopular_idx" ON "InstanceType"("provider", "isPopular" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "InstanceType_provider_name_key" ON "InstanceType"("provider", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_key_key" ON "Provider"("key");

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MobileUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "MobileUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
