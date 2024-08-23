"use client"
import { NavActState } from '@/types/types'
import React, { Fragment, useEffect, useState } from 'react'
import {useSearchParams } from 'next/navigation'
import InstructionTab from './InstructionTab';
import StudentWorkTab from './StudentWorkTab';
import { Activity } from '@prisma/client';
const ActivityContainer = ({act}:{act:Activity}) => {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<NavActState>(
searchParams.get("tab") as NavActState
  )
  useEffect(() => {
    const tab = searchParams.get("tab") as NavActState;
   setCurrentTab(tab);
  }, [searchParams,]);
  return (
   <Fragment>
    {currentTab ==="instruction" ? <InstructionTab act={act}/> : <StudentWorkTab />}
   </Fragment>
  )
}

export default ActivityContainer