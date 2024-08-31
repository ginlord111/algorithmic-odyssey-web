"use client";
import { NavActState } from "@/types/types";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InstructionTab from "./InstructionTab";
import StudentWorkTab from "./StudentWorkTab";
import { Activity, StudentActivity, User } from "@prisma/client";
import Works from "./Works";
import userInfo from "@/store/store";

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
  }, [searchParams]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isStudent) {
    studentWork = studentWorks as StudentActivity;
  } else {
    teacherViewWork = studentWorks as StudentActivity[];
  }
  console.log(isStudent, "IS STUDENT")
  if(isStudent) {
    return (
      <Fragment>
      {currentTab === "instruction" ? (
        <InstructionTab act={act} />
      ) : (
        <Works user={user as User} act={act} studentWork={studentWork as StudentActivity}/>        
      )}
    </Fragment>
    )
  }
  else{
return (
  <Fragment>
  {currentTab === "instruction" ? (
      <InstructionTab act={act} />
  ) : (
    <StudentWorkTab teacherViewWork={teacherViewWork as StudentActivity[]} />
  )}
</Fragment>
)
  }
};

export default ActivityContainer;
