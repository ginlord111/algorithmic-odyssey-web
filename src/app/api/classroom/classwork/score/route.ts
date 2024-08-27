import prisma from "@/db";
import { StudentActivity } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest){
  try {
    const {targetStud,score} = await req.json()
    const studAct:StudentActivity = targetStud
   await prisma.studentActivity.update({
    where:{
        id:studAct.id,
    },
    data:{
        score,
    }
   }) 
   return NextResponse.json({message:"SUCCESS"}, {status:200})
  } catch (error) {
    console.log(error, "ERROR")
    return NextResponse.json({message:error}, {status:500})
  }

    
}