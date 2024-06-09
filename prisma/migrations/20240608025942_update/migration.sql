/*
  Warnings:

  - A unique constraint covering the columns `[id,username,userImage]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userImage` to the `forumComments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `forumComments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "forumComments" DROP CONSTRAINT "forumComments_userId_fkey";

-- DropForeignKey
ALTER TABLE "forums" DROP CONSTRAINT "forums_userId_authorUsername_fkey";

-- AlterTable
ALTER TABLE "forumComments" ADD COLUMN     "userImage" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_id_username_userImage_key" ON "user"("id", "username", "userImage");

-- AddForeignKey
ALTER TABLE "forums" ADD CONSTRAINT "forums_userId_authorUsername_fkey" FOREIGN KEY ("userId", "authorUsername") REFERENCES "user"("id", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forumComments" ADD CONSTRAINT "forumComments_userId_userImage_username_fkey" FOREIGN KEY ("userId", "userImage", "username") REFERENCES "user"("id", "userImage", "username") ON DELETE CASCADE ON UPDATE CASCADE;
