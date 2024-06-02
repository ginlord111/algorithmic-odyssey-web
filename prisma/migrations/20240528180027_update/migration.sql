/*
  Warnings:

  - You are about to drop the `ForumLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForumLike" DROP CONSTRAINT "ForumLike_forumId_fkey";

-- DropForeignKey
ALTER TABLE "ForumLike" DROP CONSTRAINT "ForumLike_userId_fkey";

-- DropTable
DROP TABLE "ForumLike";

-- CreateTable
CREATE TABLE "forumLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,

    CONSTRAINT "forumLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "forumLike" ADD CONSTRAINT "forumLike_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forumLike" ADD CONSTRAINT "forumLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
