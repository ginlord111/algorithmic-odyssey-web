/*
  Warnings:

  - Added the required column `maxScore` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity"."Activity" ADD COLUMN     "maxScore" INTEGER NOT NULL;