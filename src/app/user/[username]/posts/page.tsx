import ForumContainer from "@/components/forum/ForumContainer";
import prisma from "@/db";
import { Forum } from "@prisma/client";
import { Loader2 } from "lucide-react";
import React, { Fragment, Suspense } from "react";
const UserPostsPage = async ({ params }: { params: { username: string } }) => {
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
               <ForumContainer {...forum} />
            </Fragment>
          );
        }
      )}
      </Suspense>
    )
};

export default UserPostsPage;
