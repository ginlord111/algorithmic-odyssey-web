import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'
import SubjectContainer from './_components/SubjectContainer';
import prisma from '@/db';
import { Activity, ClassroomAnnouncement } from '@prisma/client';
import { NavbarClassroom } from './_components/NavbarClassroom';

const ClassPage = async({ params }: { params: { classId: string } }) => {
    const session = await getServerSession(authOptions);
    const {classId} = params
    /// TODO:CONDITIONAL RENDER BASED ON THE CURRENT TAB IN THE URL
    // CREATE A COMPONENT PER TAB
    const classAct:Activity[] = await prisma.activity.findMany({
      where:{
        classroomId:classId,
      }
      
    })

  return (
   <MaxWidthWrapper >
    <NavbarClassroom />
    <SubjectContainer classId={classId} classAct={classAct}/>

   </MaxWidthWrapper>
  )
}

export default ClassPage