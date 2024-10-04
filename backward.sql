-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "forumComments" DROP CONSTRAINT "forumComments_forumId_fkey";

-- DropForeignKey
ALTER TABLE "forumComments" DROP CONSTRAINT "forumComments_userId_userImage_username_fkey";

-- DropForeignKey
ALTER TABLE "forumLike" DROP CONSTRAINT "forumLike_forumId_fkey";

-- DropForeignKey
ALTER TABLE "forumLike" DROP CONSTRAINT "forumLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "forums" DROP CONSTRAINT "forums_userId_authorUsername_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "forumComments";

-- DropTable
DROP TABLE "forumLike";

-- DropTable
DROP TABLE "forums";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "user";

