import prisma from "@/db";
import { StudentActivity } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const { targetStud, score, feedBackVal, teacherId } = await req.json();
    const studAct: StudentActivity = targetStud;
    const teacherFeedBack = await prisma.teacherFeedBack.create({
      data: {
        teacher: {
          connect: {
            id: teacherId,
          },
        },
        studentScore: score.toString(),
        feedback: feedBackVal,
        studActId:targetStud.id
      },
    });
    await prisma.studentActivity.update({
      where: {
        id: studAct.id,
      },
      data: {
        score,
        isGraded: true,
        ...(teacherFeedBack && {
          teacherFeedback: {
            connect: {
              id: teacherFeedBack.id,
            },
          },
        }),
      },
    });

    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
  } catch (error) {
    console.log(error, "ERROR");
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
