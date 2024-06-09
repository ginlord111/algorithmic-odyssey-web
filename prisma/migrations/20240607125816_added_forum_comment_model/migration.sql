/*
  Warnings:

  - A unique constraint covering the columns `[titleId]` on the table `forums` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `titleId` to the `forums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forums" ADD COLUMN     "titleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "forumComments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,

    CONSTRAINT "forumComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forums_titleId_key" ON "forums"("titleId");

-- AddForeignKey
ALTER TABLE "forumComments" ADD CONSTRAINT "forumComments_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forumComments" ADD CONSTRAINT "forumComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
