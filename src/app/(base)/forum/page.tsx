import Header from '@/components/layout/Header'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import PostContainer from '@/components/post/PostContainer'
import React from 'react'

const Forum = () => {
  return (
    <div>
      <Header />
        <MaxWidthWrapper className='flex justify-center'>
      <PostContainer />
        </MaxWidthWrapper>
        {/* <div>
         THIS IS WHERE YOU PUT THE INVIEW
        </div> */}
    </div>
  )
}

export default Forum