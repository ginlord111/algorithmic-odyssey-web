import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import prisma from "@/db";
import React from "react";
import ActivityContainer from "./_components/ActivityContainer";
import { NavBarAct } from "./_components/NavbarAct";
import { Activity, StudentActivity } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const ActivityPage = async ({
  params,
}: {
  params: { classId: string; slug: string };
}) => {
  const { slug, classId } = params;
  const session = await getServerSession(authOptions);
  const act = await prisma.activity.findFirst({
    where: {
      classroomId: classId,
      slug,
    },
  });
  if (!act) {
    return;
  }
  const fetchStudentWork = async (studentId: string, activityId: string) => {
    return await prisma.studentActivity.findFirst({
      where: {
        studentId,
        activityId,
      },
    });
  };

  // Function to fetch all student submissions (teacher view)
  const fetchTeacherView = async (activityId: string) => {
    return await prisma.studentActivity.findMany({
      where: {
        activityId,
      },
    });
  };
  const studentWork =
    session && session.user.isStudent
      ? await fetchStudentWork(session.user.id, act.id)
      : await fetchTeacherView(act.id);
  return (
    <MaxWidthWrapper>
      <NavBarAct />
      <ActivityContainer
        act={act as Activity}
        studentWorks={
          session && session.user.isStudent
            ? (studentWork as StudentActivity)
            : (studentWork as StudentActivity[])
        }
        isStudent={session?.user.isStudent as boolean}
      />
    </MaxWidthWrapper>
  );
};

export default ActivityPage;
