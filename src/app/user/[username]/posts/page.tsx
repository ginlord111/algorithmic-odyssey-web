import ForumContainer from "@/components/forum/ForumContainer";
import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { Forum, ForumLike } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import React, { Fragment, Suspense } from "react";
const UserPostsPage = async ({ params }: { params: { username: string } }) => {
  const session = await getServerSession(authOptions)
  const { username } = params;
  const userPosts = await prisma.user.findUnique({
    where: {
      username: decodeURIComponent(username),
    },
    include: {
      forums: {
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
  const userLikes: ForumLike[] = await prisma.forumLike.findMany({
    where: {
        userId:session?.user.id
    },
  });

  return (
    <Suspense fallback={<Loader2 className="h-16 w-16 animate-spin"/>}> 
    {forums.map(
        (
          forum: Forum & {
            _count: { forumLikes: number };
          }
        ) => {
          return(
            <Fragment key={forum.id} >
               <ForumContainer {...forum}  className="lg:mx-[200px]" userLikes={userLikes}/>
            </Fragment>
          );
        }
      )}
      </Suspense>
    )
};

export default UserPostsPage;
