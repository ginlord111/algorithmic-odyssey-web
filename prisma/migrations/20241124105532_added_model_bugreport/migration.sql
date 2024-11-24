-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "bug_report";

-- CreateTable
CREATE TABLE "bug_report"."BugReport" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BugReport_pkey" PRIMARY KEY ("id")
);
