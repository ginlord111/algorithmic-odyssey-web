import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'
import SubjectContainer from './_components/SubjectContainer';

const ClassPage = async({ params }: { params: { classId: string } }) => {
    const session = await getServerSession(authOptions);
    const {classId} = params
    /// TODO:CONDITIONAL RENDER BASED ON THE CURRENT TAB IN THE URL
    // CREATE A COMPONENT PER TAB
  return (
   <MaxWidthWrapper >
    <SubjectContainer classId={classId}/>

   </MaxWidthWrapper>
  )
}

export default ClassPage