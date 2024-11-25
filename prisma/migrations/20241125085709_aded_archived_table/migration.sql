-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "archived";

-- CreateTable
CREATE TABLE "archived"."Archived" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "forumCommentId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archived_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Archived_userId_key" ON "archived"."Archived"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Archived_forumId_key" ON "archived"."Archived"("forumId");

-- CreateIndex
CREATE UNIQUE INDEX "Archived_forumCommentId_key" ON "archived"."Archived"("forumCommentId");

-- CreateIndex
CREATE UNIQUE INDEX "Archived_activityId_key" ON "archived"."Archived"("activityId");

-- AddForeignKey
ALTER TABLE "archived"."Archived" ADD CONSTRAINT "Archived_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archived"."Archived" ADD CONSTRAINT "Archived_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"."Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archived"."Archived" ADD CONSTRAINT "Archived_forumCommentId_fkey" FOREIGN KEY ("forumCommentId") REFERENCES "forums"."ForumComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archived"."Archived" ADD CONSTRAINT "Archived_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
