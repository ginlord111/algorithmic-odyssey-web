"use client";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Classroom, User } from "@prisma/client";
import React, { Fragment, useState } from "react";
import ClassroomCard from "./ClassroomCard";
import EmptyClassroom from "./EmptyClassroom";
import { Button } from "@/components/ui/button";
import { createClassroomModal, joinClassroomModal } from "@/store/store";
import JoinClassroomModal from "./JoinClassroomModal";
import CreateClassroomModal from "./CreateClassroomModal";
import { Plus } from "lucide-react";
const ClassroomContainer = ({
  userClassrooms,
  teacherClassrooms,
  user,
}: {
  userClassrooms: Classroom[] | [];
  user: User;
  teacherClassrooms: Classroom[] | [];
}) => {
  const { onOpen: openJoinModal } = joinClassroomModal();
  const { onOpen: openCreateModal } = createClassroomModal();
  return (
    <MaxWidthWrapper className="mt-10 h-screen">
      <JoinClassroomModal user={user} />
      <CreateClassroomModal user={user} />
      {user.isStudent ? (
        // STUDENT RENDER
        <Fragment>
          {userClassrooms.length > 0 ? (
            <div className="flex flex-col gap-10">
              <div className="flex items-end justify-end">
                <Button variant="outline" onClick={openJoinModal}>
                  Join class
                  <Plus className="pl-1 w-5 h-5" />
                </Button>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                {userClassrooms.map((userClassroom) => (
                  <ClassroomCard key={userClassroom.id} sub={userClassroom} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyClassroom isStudent={user.isStudent} />
          )}
        </Fragment>
      ) : (
        // TEACHER RENDER
        <Fragment>
          {teacherClassrooms?.length > 0 ? (
            <div className="flex flex-col gap-10">
              <div className="flex items-end justify-end">
                <Button variant="outline" onClick={openCreateModal}>
                  Create classroom
                  <Plus className="pl-1 w-5 h-5" />
                </Button>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
              {teacherClassrooms.map((teacherSub) => (
                <ClassroomCard key={teacherSub.id} sub={teacherSub} />
              ))}
               </div>
            </div>
          ) : (
            <EmptyClassroom isStudent={user.isStudent} />
          )}
        </Fragment>
      )}
    </MaxWidthWrapper>
  );
};

export default ClassroomContainer;
