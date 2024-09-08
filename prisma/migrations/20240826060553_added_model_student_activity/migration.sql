/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "classroom"."Activity" DROP CONSTRAINT "Activity_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "classroom"."Activity" DROP CONSTRAINT "Activity_teacherId_teacherName_fkey";

-- DropTable
DROP TABLE "classroom"."Activity";

-- CreateTable
CREATE TABLE "activity"."Activity" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instruction" JSONB NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileUrlDownload" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity"."StudentActivity" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "score" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "StudentActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_teacherId_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherName") REFERENCES "users"."User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
