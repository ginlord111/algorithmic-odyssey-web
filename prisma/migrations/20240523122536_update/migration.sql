/*
  Warnings:

  - You are about to drop the column `authorImage` on the `Forum` table. All the data in the column will be lost.
  - Added the required column `forumImage` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "authorImage",
ADD COLUMN     "forumImage" TEXT NOT NULL;
