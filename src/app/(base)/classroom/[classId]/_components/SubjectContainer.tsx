"use client";
import { useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { NavClasState } from "@/types/types";
import Announcement from "./Announcement";
import PendingTask from "./PendingTask";
import GradedTask from "./GradedTask";
import Classwork from "./Classwork";
import { Activity, StudentActivity } from "@prisma/client";
import ClassroomSkeleton from "./ClassroomSkeleton";
import ForumSkeleton from "@/components/forum/ForumSkeleton";
const SubjectContainer = ({classId,classActs,studentActs}:{classId:string,classActs:Activity[],studentActs:StudentActivity[]}) => {
  const searchParams = useSearchParams();
  
  const [currentTab, setCurrentTab] = useState<NavClasState>(
    searchParams.get("tab") as NavClasState 
  );
  useEffect(() => {
    const tab = searchParams.get("tab") as NavClasState;
   setCurrentTab(tab);
  }, [searchParams]);

  const isCompletedTaskIds = studentActs.filter((studAct)=>studAct.isCompleted).map((act)=>act.activityId)
  const gradedTasks = classActs.filter((act) => isCompletedTaskIds.includes(act.id));
  const pendingTasks = classActs.filter((act) => !isCompletedTaskIds.includes(act.id));
 
  return (
    <Fragment>
 {currentTab ? (
       currentTab === "announcement" ? (
        <Announcement classId={classId}/>
      ) : currentTab === "pending-task" ? (
        <PendingTask  pendingTasks={pendingTasks} />
      ) : currentTab === "classwork" ? 
      (
        <Classwork classId={classId} classActs={classActs} />
      ) : (
        <GradedTask gradedTasks={gradedTasks} 
        studentActs={studentActs}
        />
      )
 ): <ClassroomSkeleton />}
    </Fragment>
  );
};

export default SubjectContainer;
