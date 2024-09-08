import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { ActivityComments } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { comment, activityId } = await req.json();
    const session = await getServerSession(authOptions);
    await prisma.activityComments.create({
      data: {
        comment,
        activity: {
          connect: {
            id: activityId,
          },
        },
        user: {
          connect: {
            id: session?.user.id as string,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Succesful Commented" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET(req:NextRequest){
    try {
        const url = new URL(req.url);
        const activityId = url.searchParams.get("activityId")
        const comments:ActivityComments[] = await prisma.activityComments.findMany({
            where:{
                activityId:activityId as string
            }
        })

        return NextResponse.json({comments}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"error"}, {status:500})
    }
}
