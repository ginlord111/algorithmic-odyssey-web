import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import React from 'react'
import SearchMobileView from './_components/SearchMobileView'

const page = () => {
  return (
    <div  className='relative'>
        <MaxWidthWrapper>
            <SearchMobileView />
        </MaxWidthWrapper>
    </div>
  )
}

export default page