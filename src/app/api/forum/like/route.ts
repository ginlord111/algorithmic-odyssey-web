import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { ForumLike } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { id, postOwner,route } = await req.json();
    const session = await getServerSession(authOptions);

    /// TODO: REFACTOR THIS CODEE: THE CLIENT MUST HANDLE THE IS ALREADY LIKE TO SPEEDUP THE QUERY
    const isAlreadyLiked = await prisma.forumLike.findMany({
      where: {
        AND: [
          {
            userId: session?.user.id,
          },
          {
            forumId: id,
          },
        ],
      },
    });
    if (isAlreadyLiked.length > 0) {
      const forumLikeId: string = isAlreadyLiked[isAlreadyLiked.length - 1].id;
      await prisma.forumLike.delete({
        where: {
          id: forumLikeId,
          forumId: id,
          userId: session?.user.id,
        },
      });
    } else {
      await prisma.forumLike.create({
        data: {
          user: {
            connect: {
              id: session?.user.id as string,
            },
          },
          forums: {
            connect: {
              id: id,
            },
          },
        },
      });
      // query for notification
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user.id,
        },
        select: {
          userImage: true,
          username:true,
          
        },
      });
      const userImage = user?.userImage as string;
      const fromUsername = user?.username as string
      /// will not create the notification if the user like his own post
      if(session?.user.id !==postOwner){
    await prisma.notifications.create({
      data: {
        userId: postOwner,
        from: session?.user.id as string,
        fromUserImage:userImage,    
        resourceId:route,
        type:"like",
        fromUsername,
      },
    });
  }
    }
    if (isAlreadyLiked) {
      return NextResponse.json({ isAlreadyLiked }, { status: 200 });
    }
    return NextResponse.json(
      { message: "Like created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 200 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return NextResponse.json({ userLikes: [] }, { status: 200 });
  }
  const userLikes: ForumLike[] = await prisma.forumLike.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  if (userLikes) return NextResponse.json({ userLikes }, { status: 200 });
}
