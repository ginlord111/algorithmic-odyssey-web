/*
  Warnings:

  - A unique constraint covering the columns `[id,fullName,userImage]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "classroom"."Classroom" DROP CONSTRAINT "Classroom_teacherName_teacherId_teacherImage_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_id_fullName_userImage_key" ON "users"."User"("id", "fullName", "userImage");

-- AddForeignKey
ALTER TABLE "classroom"."Classroom" ADD CONSTRAINT "Classroom_teacherName_teacherId_teacherImage_fkey" FOREIGN KEY ("teacherName", "teacherId", "teacherImage") REFERENCES "users"."User"("fullName", "id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;
