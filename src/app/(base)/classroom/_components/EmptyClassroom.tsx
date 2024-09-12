"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import userInfo from "@/store/store";
import { joinClassroomModal } from "@/store/store";
import { createClassroomModal } from "@/store/store";
const EmptyClassroom = ({ isStudent }: { isStudent: boolean }) => {
  const {onOpen:openJoinclassroomMod} = joinClassroomModal()
  const {onOpen:openCreateclassroomMod} = createClassroomModal()
  const handleOpenModal = ()=> {
    if(isStudent) {
      openJoinclassroomMod()
    }
    else{
      openCreateclassroomMod()
    }
  }
  const {fetchUser, user} = userInfo()
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return (
    <div className="flex items-center justify-center flex-col space-y-4">
      <Image
        src={
          isStudent
            ? "/empty-classroom-student.svg"
            : "/empty-classroom-teacher.svg"
        }
        alt="Empty Classroom"
        width={400}
        height={350}
      />
      <div className="text-muted-foreground text-md">
        {isStudent ? (
          <span>
            You haven&apos;t joined any classrooms yet. Join one to start
            learning!
          </span>
        ) : (
          <span>
            You haven&apos;t created any classrooms yet. Join one to start
            learning!
          </span>
        )}
      </div>
      <div className="flex items-center">
        <Button
          className="flex gap-2"
          size="sm"
          onClick={handleOpenModal}
        >
         {isStudent ? "Join Classrom" : "Create Classroom"}
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default EmptyClassroom;
