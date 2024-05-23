"use client"
import Header from '@/components/layout/Header'
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import PostContainer from '@/components/forum/ForumContainer'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'

const Forum = () => {
  const getForums = async({pageParam}:{pageParam:number})=> {
    const limit = 10
    const forum = await fetch("api/forum")
    const response = await forum.json();
    console.log(response, "RESPPONSE")
    return {
      data: response,
      currentPage:pageParam,
      nextPage:pageParam + limit < response.length ? pageParam + limit : null
    }

  }
  const {data} = useInfiniteQuery({
    queryKey:["forums"],
    queryFn:getForums,
    initialPageParam:0,
    getNextPageParam:(lastPage)=>{
      return lastPage.nextPage
    }
  })
  console.log(data, "THIS IS DATA")
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
