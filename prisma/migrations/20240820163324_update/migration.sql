/*
  Warnings:

  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teacherId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `instruction` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "classroom"."Activity" DROP COLUMN "instruction",
ADD COLUMN     "instruction" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "classroom"."File" DROP COLUMN "fileName",
DROP COLUMN "url";

-- CreateIndex
CREATE UNIQUE INDEX "Activity_teacherId_key" ON "classroom"."Activity"("teacherId");

-- AddForeignKey
ALTER TABLE "classroom"."Activity" ADD CONSTRAINT "Activity_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "users"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
