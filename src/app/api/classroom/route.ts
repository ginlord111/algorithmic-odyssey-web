import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
 try {
    const {classroomName, sectionName, classCode,id} = await req.json()
    
    // check if the classcode is unique
    const isClasscodeUnique = await prisma.classroom.findUnique({
        where:{
            code:classCode
        }
    })
    if(!isClasscodeUnique){
         await prisma.classroom.create({
            data:{
                className:classroomName,
                sectionName:sectionName,
                code:classCode,
            teacher:{
                connect:{
                    id,
                }
            },
            
            }
        });
        return NextResponse.json(
            { message: "Succesfully Created Classroom" },
            { status: 200 }
          );
    }
      
      return NextResponse.json({
        error:"Classcode is already exist and not unique"
      }, {
        status:404
      })
    

 } catch (error) {
    console.log(error)
    throw new Error("Classcode is already exist and not unique")
 }
}


export async function PATCH (req:NextRequest) {
  const {id, code} = await req.json()

  const checkCode = await prisma.classroom.findUnique({
    where:{
      code,
    },

  })
  if(!checkCode) {
    return NextResponse.json({error:"Classroom not found"}, {status:404});
  }

  await prisma.user.update({
    where:{
      id,
    },
    data:{
      classrooms:{
        connect:{
          id:checkCode.id
        }
      }
    }
  });

  return NextResponse.json({message:"Succesful join classroom"} , {status:200})
  

}