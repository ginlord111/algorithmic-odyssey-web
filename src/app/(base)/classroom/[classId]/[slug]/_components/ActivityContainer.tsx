"use client";
import { NavActState } from "@/types/types";
import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InstructionTab from "./InstructionTab";
import StudentWorkTab from "./StudentWorkTab";
import { Activity, StudentActivity, User } from "@prisma/client";
import Works from "./Works";
import userInfo from "@/store/store";
import Compiler from "./Compiler";
import ClassroomSkeleton from "../../_components/ClassroomSkeleton";

const ActivityContainer = ({
  act,
  studentWorks,
  isStudent,
}: {
  act: Activity;
  studentWorks: StudentActivity | StudentActivity[];
  isStudent: boolean;
}) => {
  const searchParams = useSearchParams();
  const { fetchUser, user } = userInfo();
  const [currentTab, setCurrentTab] = useState<NavActState>(
    searchParams.get("tab") as NavActState
  );
  let studentWork;
  let teacherViewWork;
  useEffect(() => {
    const tab = searchParams.get("tab") as NavActState;
    setCurrentTab(tab);
  }, [searchParams,setCurrentTab,currentTab]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isStudent) {
    studentWork = studentWorks as StudentActivity;
  } else {
    teacherViewWork = studentWorks as StudentActivity[];
  }
  console.log(isStudent, "IS STUDENT");
  if (isStudent) {
    return (
      <Fragment>
   {currentTab ? (
     currentTab === "instruction" ? (
      <InstructionTab act={act} />
    ) : currentTab === "compiler" ? (
      <Compiler    user={user as User} act={act}/>
    ) : (
      <Works
        user={user as User}
        act={act}
        studentWork={studentWork as StudentActivity}
      />
    )
   ) : (<ClassroomSkeleton isActivity/>)}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
      {currentTab ? (
          currentTab === "instruction" ? (
            <InstructionTab act={act} />
          ) : currentTab === "compiler" ? (
            <Compiler    user={user as User} act={act} studentWork={studentWork as StudentActivity}/>
          ) : (
            <StudentWorkTab
              teacherViewWork={teacherViewWork as StudentActivity[]}
              setCurrentTab={setCurrentTab as Dispatch<SetStateAction<NavActState>>}
              teacherId={user?.id as string}
            />
          )
      ) : <ClassroomSkeleton isActivity/>}
      </Fragment>
    );
  }
};

export default ActivityContainer;
