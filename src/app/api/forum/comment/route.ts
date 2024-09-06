import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { ForumComment } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
try {
    const { comment,forumId,postOwner,postOwnerUsername,title,titleId } = await req.json();
    const session = await getServerSession(authOptions)
  await prisma.forumComment.create({
        data:{
            comment,
            user: {
                connect: {
                  id: session?.user.id as string,
                },
              },
              forum: {
                connect: {
                  id: forumId,
                },
              },
        }
    })
    const user = await prisma.user.findUnique({
          where:{
            id:session?.user.id
          },
    });
      /// will not create the notification if the user comment his own post
    if(session?.user.id !==postOwner){
    await prisma.notifications.create({
      data:{
        userId:postOwner,
        from: session?.user.id as string,
        fromUserImage:user?.userImage as string,    
        resourceId:`/forum/${postOwnerUsername}/comments/${titleId}/${title}`,
        type:"comment",
        fromUsername:user?.username as string
      }
    })
  }
    return NextResponse.json({message:"Comment Succesfully"}, {status:200})
} catch (error) {
  console.log(error)
}
}


export async function GET(req:NextRequest){
try {
  const url = new URL(req.url);
  const forumId = url.searchParams.get("forumId");
  const comments:ForumComment[] = await prisma.forumComment.findMany({
    where:{
      forumId:forumId as string
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  return NextResponse.json({comments}, {status:200})
} catch (error) {
  console.log(error)
  return NextResponse.json({message:"error"}, {status:500})
}
}