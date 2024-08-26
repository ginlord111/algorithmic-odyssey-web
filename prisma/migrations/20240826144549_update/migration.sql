/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `StudentActivity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentActivity_studentId_key" ON "activity"."StudentActivity"("studentId");
