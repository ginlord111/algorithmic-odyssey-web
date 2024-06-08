import { forumLike } from '@/actions/forum-like'
import ForumContainer from '@/components/forum/ForumContainer'
import prisma from '@/db'
import { Forum, ForumComment } from '@prisma/client'
import React, { Fragment } from 'react'
import CommentsContainer from './_components/CommentsContainer'
interface likeCountProps{
  _count:{
    forumLike:number
  }
}
const CommentPage = async({ params }: { params: {username:string, title: string,titleId:string } })=> {
  const {username, title, titleId} = params

  const forum:Forum &{_count:{forumLikes:number}}= (await prisma.forum.findFirst({
    where:{
      authorUsername:decodeURIComponent(username),
      title:decodeURIComponent(title),
      titleId:decodeURIComponent(titleId),
    },
    include:{
      _count:{
        select:{
          forumLikes:true
        }
      }
    }
  }))!

  // const comments = await prisma.forumComment.findMany({
  //   where:{
  //     forumId:forum.id
  //   }
  // })


  return (
  <Fragment>
    <ForumContainer {...forum} className='w-full h-fit flex'/>
    <CommentsContainer forumId={forum.id}  />
  </Fragment>
  )
}

export default CommentPage