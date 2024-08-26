/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "activity"."Activity" DROP CONSTRAINT "Activity_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "activity"."Activity" DROP CONSTRAINT "Activity_fileId_fkey";

-- DropTable
DROP TABLE "activity"."Activity";

-- DropTable
DROP TABLE "files"."File";

-- CreateTable
CREATE TABLE "classroom"."Activity" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "fileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom"."File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom"."ClassroomAnnouncement" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "classroomId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassroomAnnouncement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "classroom"."Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."Activity" ADD CONSTRAINT "Activity_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "classroom"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_userId_userImage_userName_fkey" FOREIGN KEY ("userId", "userImage", "userName") REFERENCES "users"."User"("id", "userImage", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
