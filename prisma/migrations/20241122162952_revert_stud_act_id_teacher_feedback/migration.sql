/*
  Warnings:

  - Added the required column `studActId` to the `TeacherFeedBack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users"."TeacherFeedBack" ADD COLUMN     "studActId" TEXT NOT NULL;
