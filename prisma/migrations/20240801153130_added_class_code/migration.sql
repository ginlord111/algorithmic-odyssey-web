/*
  Warnings:

  - You are about to drop the column `code` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `code` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity"."Activity" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "classroom"."Classroom" ADD COLUMN     "code" TEXT NOT NULL;
