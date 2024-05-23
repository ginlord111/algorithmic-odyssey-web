import React from 'react'
import {Skeleton, Card} from "@nextui-org/react";
const ForumSkeleton = () => {
  return (
    <Card className="w-[1000px] space-y-5 p-4 h-[250px] mt-20 relative  max-w-4xl " radius="lg">
        <div className='flex flex-row gap-5 items-center'> 
    <Skeleton className="rounded-full w-10 ">
      <div className="h-10 rounded-lg bg-default-300  "></div>
    </Skeleton>
    <div className='flex flex-col w-full gap-2'>
    <Skeleton className="w-[20%] rounded-lg h-3">
        <div className="  rounded-lg bg-default-200 "></div>
      </Skeleton>
      <Skeleton className="w-[40%] rounded-lg h-3 inline-block">
        <div className="rounded-lg bg-default-200"></div>
      </Skeleton>
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
      </Skeleton>
    </div>
  </Card>
  )
}

export default ForumSkeleton