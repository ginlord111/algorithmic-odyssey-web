import prisma from "@/db";
import { uploadCloudinary } from "@/lib/cloudinary";
import { ClassroomAnnouncement } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    let imageUpload: any;
    const image = body.get("image") as unknown as File;
    if (image) {
      imageUpload = await uploadCloudinary(image, "algorithmic-oddysey");
    }
    const content = JSON.parse(body.get("content") as string);
    const classId = JSON.parse(body.get("classId") as string);
    const id = JSON.parse(body.get("userId") as string);
    await prisma.classroomAnnouncement.create({
      data: {
        image: imageUpload?.secure_url ?? null,
        content,
        user: {
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
     revalidatePath(`/classroom/${classId}`);
    return NextResponse.json(
      { message: "Class announcement posted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "ERROR")
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("classId") as string;
    const classroom = await prisma.classroom.findMany({
        where:{
            id,
        },
      include: {
        announcement:{
        orderBy:{
            createdAt:"desc"
        }
        },

      },
    });
    if (classroom.length > 0) {
      const classAnn = classroom.flatMap((c) => c.announcement);

      return NextResponse.json(
        {
          data: classAnn as ClassroomAnnouncement[],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          data: [],
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
