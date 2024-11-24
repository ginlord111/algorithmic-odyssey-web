import { Card, Skeleton } from '@nextui-org/react'
import React from 'react'

const ClassroomSkeleton = () => {
  return (
    <div className='relative mt-10 space-y-12'>
      <Card className='lg:mx-36 mx-4 p-4'>
        <div className="flex items-center gap-4">
          <Skeleton className="rounded-full w-12 h-12" />
          <Skeleton className="h-10 flex-grow rounded-lg" />
        </div>
      </Card>

      <Card className='lg:mx-36 mx-4 p-4 '>
        <div className="flex items-start gap-4">
          <Skeleton className="rounded-full w-12 h-12" />
          <div className="flex-grow space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
            </div>
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-48 w-full rounded" />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ClassroomSkeleton

