import Header from "@/components/layout/Header";
import React, { Fragment } from "react";
import ClassroomContainer from "./_components/ClassroomContainer";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
const ClassroomPage = async () => {
  const session = await getServerSession(authOptions);

  if (session && session.user.id) {
    const userClassrooms = await prisma.user.findUniqueOrThrow({
      where: {
        id: session.user.id,
      },
      include: {
        classrooms: true,
        teacherClassroms:true,
      },
    });
const {classrooms, teacherClassroms, ...user} = userClassrooms;

    return (
      <Fragment>
        <ClassroomContainer userClassrooms={classrooms} user={user} teacherClassrooms={teacherClassroms}/>
      </Fragment>
    );
  }
};

export default ClassroomPage;
