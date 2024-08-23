/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,teacherName]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherName` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "classroom"."Activity" DROP CONSTRAINT "Activity_teacherId_fkey";

-- AlterTable
ALTER TABLE "classroom"."Activity" ADD COLUMN     "teacherName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Activity_teacherId_teacherName_key" ON "classroom"."Activity"("teacherId", "teacherName");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_key" ON "users"."User"("id", "username");

-- AddForeignKey
ALTER TABLE "classroom"."Activity" ADD CONSTRAINT "Activity_teacherId_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherName") REFERENCES "users"."User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;
