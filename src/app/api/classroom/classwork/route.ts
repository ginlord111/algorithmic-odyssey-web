import { uploadGdrive } from "@/lib/gdrive";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/db";
import generateRandomString from "@/helper/generateRandomString";

/// function for temporary saving the file in the local folder
async function saveFile(file: File, filename: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join("/tmp", filename);
  //@ts-ignore
  await fs.writeFile(filePath, buffer);
  return filePath;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const title = JSON.parse(body.get("title") as string);
    const mimeType = JSON.parse(body.get("mimeType") as string);
    const file = (body.get("file") as File) ?? null;
    const instruction = JSON.parse(body.get("instruc") as string);
    const id = JSON.parse(body.get("id") as string);
    const classId = JSON.parse(body.get("classId") as string);
    const maxScore = JSON.parse(body.get("maxScore") as string);
    const actType = JSON.parse(body.get("actType") as string);
    // saving the file inside the upload folder
    const savedFilePath = await saveFile(file, file.name);

    // upload in my gdrive api and return the link
    const fileUpload = await uploadGdrive(file.name, mimeType);
    // delete the file
    await fs.unlink(savedFilePath);
    const slug = generateRandomString();
    const actId = await prisma.activity.create({
      data: {
        instruction,
        title,
        slug,
        fileType: file.type,
        fileUrl: (fileUpload?.fileUrl as string) ?? null,
        fileUrlDownload: (fileUpload?.fileUrlDownload as string) ?? null,
        isActivity: actType === "activity" ? true : false,
        maxScore,
        teacher: {
          connect: {
            id,
          },
        },
        classroom: {
          connect: {
            id: classId,
          },
        },
      },
    });

    // GET THE ALL STUDENTS IN THAT CLASSROOM
    const students = await prisma.classroom.findMany({
      where: {
        id: classId,
      },
      include: {
        students: true,
      },
    });
    const studentIds = students.flatMap((stud) => stud.students);

    // destructuring the data for the student id and class id to be in input in student act model
    // const data = studentIds.flatMap((student) => ({
    //   studentId: student.id, // The student's ID
    //   studentName:student.username as string,
    //   studentAvatar:student.userImage as string,
    //   studentEmail:student.email as string,
    //   activityId: actId.id, // The activity's ID
    // }));
    for (const student of studentIds) {
      await prisma.studentActivity.create({
        data: {
          student: {
            connect: {
              id: student.id,
            },
          },
          activity: {
            connect: {
              id: actId.id,
            },
          },
        },
      });
    }
    //     await prisma.studentActivity.createMany({
    // data,
    //   skipDuplicates:true,
    //     });

    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
  } catch (error) {
    console.log(error, "ERROR");
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.formData();
    const works = body.get("works") as File;
    const studentId = JSON.parse(body.get("studentId") as string) as string;
    const activityId = JSON.parse(body.get("activityId") as string) as string;
    const savedFilePath = await saveFile(works, works.name);
    const fileUpload = await uploadGdrive(works.name, works.type);
    await fs.unlink(savedFilePath);
    const studActId = await prisma.studentActivity.findFirst({
      where: {
        studentId,
        activityId,
      },
    });
    const submitted = await prisma.studentActivity.upsert({
      where: {
        id: studActId?.id ?? "",
      },
      update: {
        fileSubmittedUrl: fileUpload?.fileUrl ?? null,
        completedAt: new Date(),
        fileName: works.name,
        fileType: works.type,
        isCompleted: true,
      },
      create: {
        activity: {
          connect: {
            id: activityId,
          },
        },
        student: {
          connect: {
            id: studentId,
          },
        },
        fileSubmittedUrl: fileUpload?.fileUrl ?? null,
        completedAt: new Date(),
        fileName: works.name,
        fileType: works.type,

        isCompleted: true,
      },
    });

    return NextResponse.json({ submitted }, { status: 200 });
  } catch (error) {
    console.log(error, "ERROR");
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
