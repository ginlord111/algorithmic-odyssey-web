-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "activity";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "classroom";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "files";

-- CreateTable
CREATE TABLE "classroom"."Classroom" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity"."Activity" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "fileId" TEXT,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files"."File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom"."_Userclassroom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Userclassroom_AB_unique" ON "classroom"."_Userclassroom"("A", "B");

-- CreateIndex
CREATE INDEX "_Userclassroom_B_index" ON "classroom"."_Userclassroom"("B");

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "files"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity"."Activity" ADD CONSTRAINT "Activity_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classroom"."Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."_Userclassroom" ADD CONSTRAINT "_Userclassroom_A_fkey" FOREIGN KEY ("A") REFERENCES "classroom"."Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom"."_Userclassroom" ADD CONSTRAINT "_Userclassroom_B_fkey" FOREIGN KEY ("B") REFERENCES "users"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
