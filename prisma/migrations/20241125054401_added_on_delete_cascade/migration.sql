-- DropForeignKey
ALTER TABLE "activity"."Activity" DROP CONSTRAINT "Activity_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "activity"."Activity" DROP CONSTRAINT "Activity_teacherId_teacherName_fkey";

-- DropForeignKey
ALTER TABLE "activity"."ActivityComments" DROP CONSTRAINT "ActivityComments_activityId_fkey";

-- DropForeignKey
ALTER TABLE "activity"."ActivityComments" DROP CONSTRAINT "ActivityComments_userId_username_userImage_fkey";

-- DropForeignKey
ALTER TABLE "activity"."StudentActivity" DROP CONSTRAINT "StudentActivity_activityId_fkey";

-- DropForeignKey
ALTER TABLE "activity"."StudentActivity" DROP CONSTRAINT "StudentActivity_studentId_studentName_studentAvatar_studen_fkey";

-- DropForeignKey
ALTER TABLE "activity"."StudentActivity" DROP CONSTRAINT "StudentActivity_teacherFeedBackId_fkey";

-- DropForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" DROP CONSTRAINT "ClassroomAnnouncement_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" DROP CONSTRAINT "ClassroomAnnouncement_userId_userImage_fullName_fkey";

-- DropForeignKey
ALTER TABLE "users"."TeacherFeedBack" DROP CONSTRAINT "TeacherFeedBack_teacherId_teacherImage_teacherName_fkey";

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_teacherId_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherName") REFERENCES "users"."User"("id", "fullName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_studentId_studentName_studentAvatar_studen_fkey" FOREIGN KEY ("studentId", "studentName", "studentAvatar", "studentEmail") REFERENCES "users"."User"("id", "fullName", "userImage", "email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_teacherFeedBackId_fkey" FOREIGN KEY ("teacherFeedBackId") REFERENCES "users"."TeacherFeedBack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."ClassroomAnnouncement" ADD CONSTRAINT "ClassroomAnnouncement_userId_userImage_fullName_fkey" FOREIGN KEY ("userId", "userImage", "fullName") REFERENCES "users"."User"("id", "userImage", "fullName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"."Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."ActivityComments" ADD CONSTRAINT "ActivityComments_userId_username_userImage_fkey" FOREIGN KEY ("userId", "username", "userImage") REFERENCES "users"."User"("id", "fullName", "userImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."TeacherFeedBack" ADD CONSTRAINT "TeacherFeedBack_teacherId_teacherImage_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherImage", "teacherName") REFERENCES "users"."User"("id", "userImage", "fullName") ON DELETE CASCADE ON UPDATE CASCADE;
