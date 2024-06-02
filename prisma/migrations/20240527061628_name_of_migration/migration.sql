/*
  Warnings:

  - A unique constraint covering the columns `[id,username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `caption` on table `Forum` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Forum" ALTER COLUMN "caption" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_id_username_key" ON "user"("id", "username");

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_userId_authorUsername_fkey" FOREIGN KEY ("userId", "authorUsername") REFERENCES "user"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;
