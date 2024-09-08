-- CreateTable
CREATE TABLE "activity"."ActivityComments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_userId_username_userImage_fkey" FOREIGN KEY ("userId", "username", "userImage") REFERENCES "users"."User"("id", "username", "userImage") ON DELETE RESTRICT ON UPDATE CASCADE;
