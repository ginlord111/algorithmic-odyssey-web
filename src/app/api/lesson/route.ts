import prisma from "@/db";
import { LessonProgressProps } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace with a specific origin if needed
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true", // Enables credentials
  };
export async function POST(req: NextRequest, res: NextResponse) {
  const { student_id, key, value } = await req.json();
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: student_id,
      },
      select: {
        lessonProgress: true,
      },
    });

    if (!data) {
      NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
   const lessonProgress = data?.lessonProgress as unknown as LessonProgressProps
   lessonProgress.progress[key] = value;
   console.log(lessonProgress.progress, "PLSSSS")
   await prisma.user.update({
    where:{
        id:student_id,
    },
      data:{
        lessonProgress:lessonProgress as any,
      }
    }
   );
    return NextResponse.json({message:"Success"}, {status:200, headers:corsHeaders}); 
  } catch (error) {
    console.log(error);
   return NextResponse.json({ error }, { status: 500, headers:corsHeaders });
  }
}
