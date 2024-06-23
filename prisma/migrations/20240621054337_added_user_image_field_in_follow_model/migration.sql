/*
  Warnings:

  - A unique constraint covering the columns `[userFollowerImage]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userFollowingImage]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userImage]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userFollowerImage` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userFollowingImage` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "follow"."Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "follow"."Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- AlterTable
ALTER TABLE "follow"."Follow" ADD COLUMN     "userFollowerImage" TEXT NOT NULL,
ADD COLUMN     "userFollowingImage" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Follow_userFollowerImage_key" ON "follow"."Follow"("userFollowerImage");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_userFollowingImage_key" ON "follow"."Follow"("userFollowingImage");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_userImage_key" ON "users"."User"("id", "userImage");

-- AddForeignKey
ALTER TABLE "follow"."Follow" ADD CONSTRAINT "Follow_followerId_userFollowerImage_fkey" FOREIGN KEY ("followerId", "userFollowerImage") REFERENCES "users"."User"("id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow"."Follow" ADD CONSTRAINT "Follow_followingId_userFollowingImage_fkey" FOREIGN KEY ("followingId", "userFollowingImage") REFERENCES "users"."User"("id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;
