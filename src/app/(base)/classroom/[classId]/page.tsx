import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'
import SubjectContainer from './_components/SubjectContainer';
import prisma from '@/db';
import { Activity, StudentActivity } from '@prisma/client';
import { NavbarClassroom } from './_components/NavbarClassroom';
type ActivityWithStudentActivity = Activity & {
  StudentActivity: StudentActivity[];  // Correctly type StudentActivity as an array
};

const ClassPage = async({ params }: { params: { classId: string } }) => {
    const session = await getServerSession(authOptions);
    const {classId} = params
    /// TODO:CONDITIONAL RENDER BASED ON THE CURRENT TAB IN THE URL
    // CREATE A COMPONENT PER TAB
    const data:ActivityWithStudentActivity[] = await prisma.activity.findMany({
      where:{
        classroomId:classId ?? null,
      },
      include:{
        StudentActivity:{
          where:{
            studentId:session?.user.id as string
          }
        }
      },
      orderBy:{
        createdAt:"desc"
      },
    }) 


    const studentActs = data.flatMap(({ StudentActivity }) => StudentActivity);
    const classActs = data.flatMap(({StudentActivity, ...rest})=>rest)
  return (
   <MaxWidthWrapper >
    <NavbarClassroom />
    <SubjectContainer classId={classId} classActs={classActs}
    studentActs={studentActs}
    
    />

   </MaxWidthWrapper>
  )
}

export default ClassPage