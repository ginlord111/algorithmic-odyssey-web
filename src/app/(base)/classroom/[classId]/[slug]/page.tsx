import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import prisma from '@/db'
import React from 'react'
import ActivityContainer from './_components/ActivityContainer';
import { NavBarAct } from './_components/NavbarAct';
import { Activity } from '@prisma/client';

const ActivityPage = async({ params }: { params: { classId: string,slug:string } })=> {
    const {slug,classId} = params;
const act = await prisma.activity.findFirst({
    where:{
        classroomId:classId,
        slug,
    },


})

  return (
  <MaxWidthWrapper>
    <NavBarAct />
    <ActivityContainer act={act as Activity}/>
  </MaxWidthWrapper>
  )
}

export default ActivityPage