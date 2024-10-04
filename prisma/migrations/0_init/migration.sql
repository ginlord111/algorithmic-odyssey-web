-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "accounts";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "activity";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "classroom";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "files";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "follow";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "forums";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "notifications";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "sessions";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateTable
CREATE TABLE "users"."User" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "userImage" TEXT,
    "facebook" TEXT,
    "github" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "password" TEXT,
    "emailVerificationToken" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isStudent" BOOLEAN NOT NULL DEFAULT true,
    "level" INTEGER DEFAULT 1,
    "score" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forums"."Forum" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authorUsername" TEXT NOT NULL,
    "forumImage" TEXT,
    "title" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "titleId" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "content" JSONB,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forums"."ForumLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,

    CONSTRAINT "ForumLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forums"."ForumComment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForumComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow"."Follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userFollowerImage" TEXT NOT NULL,
    "userFollowingImage" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications"."Notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "fromUserImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fromUsername" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom"."Classroom" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sectionName" TEXT NOT NULL,
    "teacherImage" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity"."Activity" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instruction" JSONB NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileUrlDownload" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "maxScore" INTEGER NOT NULL,
    "isActivity" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity"."StudentActivity" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "score" INTEGER,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "fileSubmittedUrl" TEXT,
    "fileName" TEXT,
    "fileType" TEXT,
    "studentAvatar" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "isGraded" BOOLEAN NOT NULL DEFAULT false,
    "codeSubmitted" TEXT,

    CONSTRAINT "StudentActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom"."ClassroomAnnouncement" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "classroomId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" JSONB,

    CONSTRAINT "ClassroomAnnouncement_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "classroom"."_StudentClassrooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "users"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "users"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_userImage_facebook_twitter_github_instagra_key" ON "users"."User"("id", "username", "userImage", "facebook", "twitter", "github", "instagram");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_userImage_key" ON "users"."User"("id", "username", "userImage");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_userImage_key" ON "users"."User"("id", "userImage");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_key" ON "users"."User"("id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_email_userImage_key" ON "users"."User"("id", "username", "email", "userImage");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "accounts"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "sessions"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Forum_titleId_key" ON "forums"."Forum"("titleId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "follow"."Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_code_key" ON "classroom"."Classroom"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentClassrooms_AB_unique" ON "classroom"."_StudentClassrooms"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentClassrooms_B_index" ON "classroom"."_StudentClassrooms"("B");

-- AddForeignKey
ALTER TABLE "accounts"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums"."Forum" ADD CONSTRAINT "Forum_userId_authorUsername_userImage_fkey" FOREIGN KEY ("userId", "authorUsername", "userImage") REFERENCES "users"."User"("id", "username", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums"."ForumLike" ADD CONSTRAINT "ForumLike_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"."Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums"."ForumLike" ADD CONSTRAINT "ForumLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums"."ForumComment" ADD CONSTRAINT "ForumComment_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"."Forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forums"."ForumComment" ADD CONSTRAINT "ForumComment_userId_userImage_username_fkey" FOREIGN KEY ("userId", "userImage", "username") REFERENCES "users"."User"("id", "userImage", "username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow"."Follow" ADD CONSTRAINT "Follow_followerId_userFollowerImage_fkey" FOREIGN KEY ("followerId", "userFollowerImage") REFERENCES "users"."User"("id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow"."Follow" ADD CONSTRAINT "Follow_followingId_userFollowingImage_fkey" FOREIGN KEY ("followingId", "userFollowingImage") REFERENCES "users"."User"("id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."Classroom" ADD CONSTRAINT "Classroom_teacherName_teacherId_teacherImage_fkey" FOREIGN KEY ("teacherName", "teacherId", "teacherImage") REFERENCES "users"."User"("username", "id", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_teacherId_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherName") REFERENCES "users"."User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_studentId_studentName_studentAvatar_studen_fkey" FOREIGN KEY ("studentId", "studentName", "studentAvatar", "studentEmail") REFERENCES "users"."User"("id", "username", "userImage", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_userId_userImage_userName_fkey" FOREIGN KEY ("userId", "userImage", "userName") REFERENCES "users"."User"("id", "userImage", "username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_userId_username_userImage_fkey" FOREIGN KEY ("userId", "username", "userImage") REFERENCES "users"."User"("id", "username", "userImage") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."_StudentClassrooms" ADD CONSTRAINT "_StudentClassrooms_A_fkey" FOREIGN KEY ("A") REFERENCES "classroom"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."_StudentClassrooms" ADD CONSTRAINT "_StudentClassrooms_B_fkey" FOREIGN KEY ("B") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

