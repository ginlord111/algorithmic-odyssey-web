/*
  Warnings:

  - A unique constraint covering the columns `[id,username,email,userImage]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentAvatar` to the `StudentActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentEmail` to the `StudentActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `StudentActivity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activity"."StudentActivity" DROP CONSTRAINT "StudentActivity_studentId_fkey";

-- AlterTable
ALTER TABLE "activity"."StudentActivity" ADD COLUMN     "studentAvatar" TEXT NOT NULL,
ADD COLUMN     "studentEmail" TEXT NOT NULL,
ADD COLUMN     "studentName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_email_userImage_key" ON "users"."User"("id", "username", "email", "userImage");

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_studentId_studentName_studentAvatar_studen_fkey" FOREIGN KEY ("studentId", "studentName", "studentAvatar", "studentEmail") REFERENCES "users"."User"("id", "username", "userImage", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
