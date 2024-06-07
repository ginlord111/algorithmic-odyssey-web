import { forumLike } from '@/actions/forum-like'
import ForumContainer from '@/components/forum/ForumContainer'
import prisma from '@/db'
import { Forum } from '@prisma/client'
import React, { Fragment } from 'react'
import CommentsTextbox from './_components/CommentsTextbox'
interface likeCountProps{
  _count:{
    forumLike:number
  }
}
const CommentPage = async({ params }: { params: {username:string, title: string } })=> {
  const {username, title} = params

  const forum:Forum &{_count:{forumLikes:number}}= (await prisma.forum.findFirst({
    where:{
      authorUsername:decodeURIComponent(username),
      title:decodeURIComponent(title),
    },
    include:{
      _count:{
        select:{
          forumLikes:true
        }
      }
    }
  }))!


  return (
  <Fragment>
    <ForumContainer {...forum}/>
    <CommentsTextbox />
  </Fragment>
  )
}

export default CommentPage