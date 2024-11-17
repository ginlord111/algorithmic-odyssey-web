/*
  Warnings:

  - You are about to drop the column `lessonProgress` on the `User` table. All the data in the column will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "lessons";

-- AlterTable
ALTER TABLE "users"."User" DROP COLUMN "lessonProgress";

-- CreateTable
CREATE TABLE "lessons"."LessonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "algorithm" BOOLEAN NOT NULL DEFAULT false,
    "euclideanAlgorithm" BOOLEAN NOT NULL DEFAULT false,
    "kmpAlgorithm" BOOLEAN NOT NULL DEFAULT false,
    "insertionSort" BOOLEAN NOT NULL DEFAULT false,
    "selectionSort" BOOLEAN NOT NULL DEFAULT false,
    "bubbleSort" BOOLEAN NOT NULL DEFAULT false,
    "mergeSort" BOOLEAN NOT NULL DEFAULT false,
    "quickSort" BOOLEAN NOT NULL DEFAULT false,
    "linearSearch" BOOLEAN NOT NULL DEFAULT false,
    "binarySearch" BOOLEAN NOT NULL DEFAULT false,
    "breadthFirstSearch" BOOLEAN NOT NULL DEFAULT false,
    "depthFirstSearch" BOOLEAN NOT NULL DEFAULT false,
    "sequentialSearch" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_key" ON "lessons"."LessonProgress"("userId");

-- AddForeignKey
ALTER TABLE "lessons"."LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
