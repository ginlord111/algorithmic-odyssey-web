/*
  Warnings:

  - Added the required column `userImage` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "forums"."Forum" DROP CONSTRAINT "Forum_userId_authorUsername_fkey";

-- AlterTable
ALTER TABLE "forums"."Forum" ADD COLUMN     "userImage" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "forums"."Forum" ADD CONSTRAINT "Forum_userId_authorUsername_userImage_fkey" FOREIGN KEY ("userId", "authorUsername", "userImage") REFERENCES "users"."User"("id", "username", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;
