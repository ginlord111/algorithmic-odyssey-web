-- DropForeignKey
ALTER TABLE "archived"."Archived" DROP CONSTRAINT "Archived_activityId_fkey";

-- AlterTable
ALTER TABLE "archived"."Archived" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "forumId" DROP NOT NULL,
ALTER COLUMN "forumCommentId" DROP NOT NULL,
ALTER COLUMN "activityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "archived"."Archived" ADD CONSTRAINT "Archived_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
