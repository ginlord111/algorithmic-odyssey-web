import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
export async function POST(req: NextRequest) {
  try {
    const { followerId, followingId, isFollowing } = await req.json();
    console.log(isFollowing, "IS FOLLOWING")
    if (isFollowing) {
      const followId = await prisma.follow.findFirst({
        where: {
          followerId: followerId as string,
          followingId: followingId as string,
        },
        select: {
          id: true,
        },
      });
     await prisma.follow.delete({
        where: {
          id: followId?.id,
        },
      });
  
        return NextResponse.json(
          { message: "Succesfully deleted" },
          { status: 200 }
        );
      
    } else {
     await prisma.follow.create({
        data: {
          follower: {
            connect: {
              id: followerId,
            },
          },
          following: {
            connect: {
              id: followingId,
            },
          },
        },
      });
        return NextResponse.json(
          { message: "Succesfully Followed User" },
          { status: 200 }
        );
      

    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userFollowings = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });
  console.log(userFollowings, "SESION ")
  if (userFollowings && userFollowings.following.length > 0) {
    const followings = userFollowings.following;
    return NextResponse.json({ followings }, { status: 200 });
  }
  return NextResponse.json({ followings:false }, { status: 400 });
}
