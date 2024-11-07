/*
  Warnings:

  - You are about to drop the column `userName` on the `ClassroomAnnouncement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,fullName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,fullName,email,userImage]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `ClassroomAnnouncement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activity"."Activity" DROP CONSTRAINT "Activity_teacherId_teacherName_fkey";

-- DropForeignKey
ALTER TABLE "activity"."ActivityComments" DROP CONSTRAINT "ActivityComments_userId_username_userImage_fkey";

-- DropForeignKey
ALTER TABLE "activity"."StudentActivity" DROP CONSTRAINT "StudentActivity_studentId_studentName_studentAvatar_studen_fkey";

-- DropForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" DROP CONSTRAINT "ClassroomAnnouncement_userId_userImage_userName_fkey";

-- DropIndex
DROP INDEX "users"."User_id_username_email_userImage_key";

-- DropIndex
DROP INDEX "users"."User_id_username_key";

-- AlterTable
ALTER TABLE "classroom"."ClassroomAnnouncement" DROP COLUMN "userName",
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_fullName_key" ON "users"."User"("id", "fullName");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_fullName_email_userImage_key" ON "users"."User"("id", "fullName", "email", "userImage");

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_teacherId_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherName") REFERENCES "users"."User"("id", "fullName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_studentId_studentName_studentAvatar_studen_fkey" FOREIGN KEY ("studentId", "studentName", "studentAvatar", "studentEmail") REFERENCES "users"."User"("id", "fullName", "userImage", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_userId_userImage_fullName_fkey" FOREIGN KEY ("userId", "userImage", "fullName") REFERENCES "users"."User"("id", "userImage", "fullName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_userId_username_userImage_fkey" FOREIGN KEY ("userId", "username", "userImage") REFERENCES "users"."User"("id", "fullName", "userImage") ON DELETE RESTRICT ON UPDATE CASCADE;
