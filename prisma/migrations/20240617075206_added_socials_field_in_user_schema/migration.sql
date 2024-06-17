/*
  Warnings:

  - A unique constraint covering the columns `[id,username,userImage,facebook,twitter,github,instagram]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users"."User_id_username_key";

-- AlterTable
ALTER TABLE "users"."User" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "twitter" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_userImage_facebook_twitter_github_instagra_key" ON "users"."User"("id", "username", "userImage", "facebook", "twitter", "github", "instagram");
