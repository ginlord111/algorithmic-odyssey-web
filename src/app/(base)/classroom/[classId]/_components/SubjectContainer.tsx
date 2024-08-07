"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavState } from "@/types/types";
import Announcement from "./Announcement";
import PendingTask from "./PendingTask";
import GradedTask from "./GradedTask";
const SubjectContainer = () => {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<NavState>(
    searchParams.get("tab") as NavState
  );
  useEffect(() => {
    const tab = searchParams.get("tab") as NavState;
   setCurrentTab(tab);
  }, [searchParams]);
  return (
    <div>
      {currentTab === "announcement" ? (
        <Announcement />
      ) : currentTab === "pending-task" ? (
        <PendingTask />
      ) : (
        <GradedTask />
      )}
    </div>
  );
};

export default SubjectContainer;
