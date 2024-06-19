import ForumContainer from "@/components/forum/ForumContainer";
import prisma from "@/db";
import { Forum } from "@prisma/client";
import React, { Fragment } from "react";
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
  return forums.map(
    (
      forum: Forum & {
        _count: { forumLikes: number };
      },
      index: number
    ) => {
      return(
        <Fragment key={index}>
           <ForumContainer {...forum} />
        </Fragment>
      );
    }
  );
};

export default UserPostsPage;
