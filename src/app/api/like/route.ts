import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { ForumLike } from "@prisma/client";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { id, forumLike } = await req.json();
    const session = await getServerSession(authOptions);
    const isAlreadyLiked = await prisma.forumLike.findMany({
      where:{
        AND:[
          {
            userId:session?.user.id
          },
          {
            forumId:id
          }
        ]
      }
    })
    console.log(isAlreadyLiked, "IS ALREADY LIKE")
    if (isAlreadyLiked.length>0) {
      const forumLike = await prisma.forumLike.findFirst({
        where: {
          forumId: id,
          userId: session?.user.id,
        },
      });
      const deleteLike = await prisma.forumLike.delete({
        where: {
          id: forumLike?.id,
        },
      });
  

    } else {
      const postLike = await prisma.forumLike.create({
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
  
    }
  if(isAlreadyLiked) {
    revalidatePath("/forum")
    return NextResponse.json({isAlreadyLiked}, { status: 200 });
  }
  revalidatePath("/forum")
  return NextResponse.json({ message: 'Like created successfully' }, { status: 201 }); 
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 200 });
  }
}


export async function GET(){
  const session = await getServerSession(authOptions)
  const userLikes:ForumLike[] = await prisma.forumLike.findMany({
      where:{
          userId:session?.user.id
      },
  })
  if(userLikes) return NextResponse.json({userLikes}, {status:200})
}