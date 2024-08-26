/*
  Warnings:

  - You are about to drop the `_Userclassroom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sectionName` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherImage` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherName` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "classroom"."_Userclassroom" DROP CONSTRAINT "_Userclassroom_A_fkey";

-- DropForeignKey
ALTER TABLE "classroom"."_Userclassroom" DROP CONSTRAINT "_Userclassroom_B_fkey";

-- AlterTable
ALTER TABLE "classroom"."Classroom" ADD COLUMN     "sectionName" TEXT NOT NULL,
ADD COLUMN     "teacherImage" TEXT NOT NULL,
ADD COLUMN     "teacherName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users"."User" ADD COLUMN     "isStudent" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "classroom"."_Userclassroom";

-- CreateTable
CREATE TABLE "classroom"."_StudentClassrooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StudentClassrooms_AB_unique" ON "classroom"."_StudentClassrooms"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentClassrooms_B_index" ON "classroom"."_StudentClassrooms"("B");

-- AddForeignKey
ALTER TABLE "classroom"."Classroom" ADD CONSTRAINT "Classroom_teacherName_teacherId_teacherImage_fkey" FOREIGN KEY ("teacherName", "teacherId", "teacherImage") REFERENCES "users"."User"("username", "id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."_StudentClassrooms" ADD CONSTRAINT "_StudentClassrooms_A_fkey" FOREIGN KEY ("A") REFERENCES "classroom"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."_StudentClassrooms" ADD CONSTRAINT "_StudentClassrooms_B_fkey" FOREIGN KEY ("B") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
