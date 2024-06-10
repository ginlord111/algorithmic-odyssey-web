import { forumLike } from '@/actions/forum-like'
import ForumContainer from '@/components/forum/ForumContainer'
import prisma from '@/db'
import { Forum, ForumComment, ForumLike } from '@prisma/client'
import React, { Fragment } from 'react'
import CommentsContainer from './_components/CommentsContainer'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
const CommentPage = async({ params }: { params: {username:string, title: string,titleId:string } })=> {
  const {username, title, titleId} = params
  const session = await getServerSession(authOptions)
  const forum:Forum &{_count:{forumLikes:number}}= (await prisma.forum.findFirst({
    where:{
      authorUsername:decodeURIComponent(username),
      title:decodeURIComponent(title),
      titleId:decodeURIComponent(titleId),
    },
    include:{
      _count:{
        select:{
          forumLikes:true,
          comments:true,
        }
      }
    }
  }))!

  const userLikes:ForumLike[] = await prisma.forumLike.findMany({
      where:{
          userId:session?.user.id
      },
  })


  return (
  <Fragment>
    <ForumContainer {...forum} userLikes={userLikes}/>
    <CommentsContainer forumId={forum.id}  />
  </Fragment>
  )
}

export default CommentPage