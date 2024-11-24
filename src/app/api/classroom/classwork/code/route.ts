import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    const {studentId,code,actId,codeLang} = await req.json()
    const studActId = await prisma.studentActivity.findFirst({
      where:{
        activityId:actId,
        studentId
      }
    })

    console.log(studActId, "PARAMSS")
//     await prisma.studentActivity.update({
//         where:{
//           id:studActId?.id as string,
//         },
//         data:{
// codeSubmitted:code,
// isCompleted:true,
// codeLang,
//         }
//     }) 

await prisma.studentActivity.upsert({
  where:{
   id:studActId?.id as string ?? "",
    },
    update:{
      codeSubmitted:code,
      isCompleted:true,
      codeLang,
    },
    create:{
    student:{
      connect:{
        id:studentId
      }
    },
    activity:{
      connect:{
        id:actId
      }
    },
    codeSubmitted:code,
    isCompleted:true,
    codeLang,

    }
})

    return NextResponse.json({message:"succesful"}, {status:200})
  } catch (error) {
    console.log(error, "ERROR")
    return NextResponse.json({message:"ERROR"}, {status:500})
  }
}