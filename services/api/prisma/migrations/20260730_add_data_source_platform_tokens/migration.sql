-- Migration: add_data_source_platform_tokens
-- Adds DataSource enum, PlatformType enum, PlatformTokenStatus enum,
-- dataSource column to Project, and new PlatformToken table.

-- CreateEnum
CREATE TYPE "DataSource" AS ENUM ('NO_CREDS', 'MOCK_DEMO', 'LIVE');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('VERCEL', 'NETLIFY', 'RAILWAY', 'RENDER');

-- CreateEnum
CREATE TYPE "PlatformTokenStatus" AS ENUM ('ACTIVE', 'INVALID', 'EXPIRED', 'REVOKED');

-- AlterTable: add dataSource to Project with default NO_CREDS
ALTER TABLE "Project" ADD COLUMN "dataSource" "DataSource" NOT NULL DEFAULT 'NO_CREDS';

-- CreateIndex for dataSource on Project
CREATE INDEX "Project_dataSource_idx" ON "Project"("dataSource");

-- CreateTable: PlatformToken
CREATE TABLE "PlatformToken" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "platform" "PlatformType" NOT NULL,
    "encryptedToken" TEXT NOT NULL,
    "projectSlug" TEXT,
    "status" "PlatformTokenStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastVerifiedAt" TIMESTAMP(3),
    "lastError" TEXT,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformToken_projectId_platform_key" ON "PlatformToken"("projectId", "platform");
CREATE INDEX "PlatformToken_projectId_status_idx" ON "PlatformToken"("projectId", "status");
CREATE INDEX "PlatformToken_status_idx" ON "PlatformToken"("status");

-- AddForeignKey
ALTER TABLE "PlatformToken" ADD CONSTRAINT "PlatformToken_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
