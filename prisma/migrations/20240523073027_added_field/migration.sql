/*
  Warnings:

  - Added the required column `title` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "caption" DROP NOT NULL;
