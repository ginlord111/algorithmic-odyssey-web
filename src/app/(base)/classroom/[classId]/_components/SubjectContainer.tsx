"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavClasState } from "@/types/types";
import Announcement from "./Announcement";
import PendingTask from "./PendingTask";
import GradedTask from "./GradedTask";
import Classwork from "./Classwork";
import { Activity, StudentActivity } from "@prisma/client";
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
    <div>
      {currentTab === "announcement" ? (
        <Announcement classId={classId}/>
      ) : currentTab === "pending-task" ? (
        <PendingTask  pendingTasks={pendingTasks} />
      ) : currentTab === "classwork" ? 
      (
        <Classwork classId={classId} classActs={classActs} />
      ) : (
        <GradedTask gradedTasks={gradedTasks}/>
      )}
    </div>
  );
};

export default SubjectContainer;
