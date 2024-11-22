-- AlterTable
ALTER TABLE "activity"."StudentActivity" ADD COLUMN     "teacherFeedBackId" TEXT;

-- AlterTable
ALTER TABLE "users"."User" ADD COLUMN     "lessonProgress" JSONB DEFAULT '{"progress": {"merge_sort": "", "quick_sort": "", "bubble_sort": "", "binary_search": "", "kmp_algorithm": "", "linear_search": "", "insertion_sort": "", "selection_sort": "", "sequential_search": "", "depth_first_search": "", "euclidean_algorithm": "", "breadth_first_search": ""}}';

-- CreateTable
CREATE TABLE "users"."TeacherFeedBack" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "teacherImage" TEXT NOT NULL,
    "teacherName" TEXT NOT NULL,
    "studentActivityId" TEXT NOT NULL,
    "studentScore" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherFeedBack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity"."StudentActivity" ADD CONSTRAINT "StudentActivity_teacherFeedBackId_fkey" FOREIGN KEY ("teacherFeedBackId") REFERENCES "users"."TeacherFeedBack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."TeacherFeedBack" ADD CONSTRAINT "TeacherFeedBack_teacherId_teacherImage_teacherName_fkey" FOREIGN KEY ("teacherId", "teacherImage", "teacherName") REFERENCES "users"."User"("id", "userImage", "fullName") ON DELETE RESTRICT ON UPDATE CASCADE;
