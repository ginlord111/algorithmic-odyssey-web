import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import prisma from '@/db'
import React from 'react'
import ActivityContainer from './_components/ActivityContainer';
import { NavBarAct } from './_components/NavbarAct';
import { Activity } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

const ActivityPage = async({ params }: { params: { classId: string,slug:string } })=> {
    const {slug,classId} = params;
    const session = await getServerSession(authOptions)
const act = await prisma.activity.findFirst({
    where:{
        classroomId:classId,
        slug,
    },

})
const studentWork = await prisma.studentActivity.findFirst({
  where:{
    studentId:session?.user.id as string
  },
})

  return (
  <MaxWidthWrapper>
    <NavBarAct />
    <ActivityContainer act={act as Activity} studentWork={studentWork} />
  </MaxWidthWrapper>
  )
}

export default ActivityPage