"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavClasState } from "@/types/types";
import Announcement from "./Announcement";
import PendingTask from "./PendingTask";
import GradedTask from "./GradedTask";
import Classwork from "./Classwork";
import { Activity } from "@prisma/client";
const SubjectContainer = ({classId,classAct}:{classId:string,classAct:Activity[]}) => {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<NavClasState>(
    searchParams.get("tab") as NavClasState 
  );
  useEffect(() => {
    const tab = searchParams.get("tab") as NavClasState;
   setCurrentTab(tab);
  }, [searchParams]);

  return (
    <div>
      {currentTab === "announcement" ? (
        <Announcement classId={classId}/>
      ) : currentTab === "pending-task" ? (
        <PendingTask  studentActs={classAct} />
      ) : currentTab === "classwork" ? 
      (
        <Classwork classId={classId} classAct={classAct} />
      ) : (
        <GradedTask />
      )}
    </div>
  );
};

export default SubjectContainer;
