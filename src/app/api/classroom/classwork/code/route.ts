import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    const {studentId,code,actId} = await req.json()


    await prisma.studentActivity.update({
        where:{
     studentId,
     activityId:actId
        },
        data:{
codeSubmitted:code,
isCompleted:true,
        }
    }) 

    return NextResponse.json({message:"succesful"}, {status:200})
  } catch (error) {
    console.log(error, "ERROR")
    return NextResponse.json({message:"ERROR"}, {status:500})
  }
}