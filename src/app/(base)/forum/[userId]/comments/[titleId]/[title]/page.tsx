import ForumContainer from "@/components/forum/ForumContainer";
import prisma from "@/db";
import { Forum, ForumLike } from "@prisma/client";
import React, { Fragment } from "react";
import CommentsContainer from "./_components/CommentsContainer";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
const CommentPage = async ({
  params,
}: {
  params: { userId: string; title: string; titleId: string };
}) => {
  const { userId, title, titleId } = params;
  const session = await getServerSession(authOptions);
  let userLikes: ForumLike[] = [];
  const forum: Forum & { _count: { forumLikes: number } } =
    (await prisma.forum.findFirst({
      where: {
        userId:decodeURIComponent(userId),
        title: decodeURIComponent(title),
        titleId: decodeURIComponent(titleId),
      },
      include: {
        _count: {
          select: {
            forumLikes: true,
            comments: true,
          },
        },
      },
    }))!;
  if (session?.user.id) {
    userLikes = await prisma.forumLike.findMany({
      where: {
        userId: session?.user.id,
      },
    });
  }
  console.log(forum, "FORUM ID")
  console.log(userId,title,titleId, "USER ID")
  return (
    <Fragment>
      <ForumContainer
        {...forum}
        userLikes={userLikes}
        className="lg:mx-[200px]"
      />
      <CommentsContainer
         postOwner={forum.userId}
        forumId={forum.id}
        route={`/forum/${userId}/comments/${titleId}/${title}`}
      />
    </Fragment>
  );
};

export default CommentPage;
