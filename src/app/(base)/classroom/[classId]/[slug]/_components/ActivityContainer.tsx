"use client";
import { NavActState } from "@/types/types";
import React, { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import InstructionTab from "./InstructionTab";
import StudentWorkTab from "./StudentWorkTab";
import { Activity, StudentActivity, User } from "@prisma/client";
import Works from "./Works";
import userInfo from "@/store/store";
const ActivityContainer = ({ act,studentWork }: { act: Activity,studentWork:StudentActivity|null }) => {
  const searchParams = useSearchParams();
  const { fetchUser, user } = userInfo();
  const [currentTab, setCurrentTab] = useState<NavActState>(
    searchParams.get("tab") as NavActState
  );
  useEffect(() => {
    const tab = searchParams.get("tab") as NavActState;
    setCurrentTab(tab);
  }, [searchParams]);
  useEffect(()=> {
    fetchUser()
  },[fetchUser])
  return (
    <Fragment>
      {currentTab === "instruction" ? (
        <InstructionTab act={act} />
      ) : currentTab === "works" ? (
        <Works user={user as User} act={act} studentWork={studentWork}/>        
      ) : (
        <StudentWorkTab />
      )}
    </Fragment>
  );
};

export default ActivityContainer;
