import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { ForumLike } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { Fragment, Suspense } from "react";
import UserProfilePosts from "./posts/_components/UserProfilePosts";
const UserPostsPage = async ({ params }: { params: { username: string } }) => {
  const session = await getServerSession(authOptions)
  const { username } = params;
  let userLikes:ForumLike[] = [];
  const userPosts = await prisma.user.findUnique({
    where: {
      username: decodeURIComponent(username),
    },
    include: {
      forums: {
        orderBy:{
          createdAt:"desc"
        },
        include: {
          _count: {
            select: {
              forumLikes: true,
            },
          },
        },
      },
    },
  });
    if (!userPosts) return null;
  const { forums } = userPosts;

  if(session?.user.id){
     userLikes = await prisma.forumLike.findMany({
      where: {
          userId:session.user.id
      },
    }) ?? [];
  }

  return (
    <Suspense fallback={<div className="flex items-center justify-center w-full"><Loader2 className="h-16 w-16 animate-spin"/></div>}> 
<UserProfilePosts forums={forums} userLikes={userLikes}/>
      </Suspense>
    )
};

export default UserPostsPage;
