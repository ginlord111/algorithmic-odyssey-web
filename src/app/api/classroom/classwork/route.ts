import { uploadGdrive } from "@/lib/gdrive";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "@/db";
import generateRandomString from "@/helper/generateRandomString";


/// function for temporary saving the file in the local folder
async function saveFile(file: File, filename: string) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), "uploads", filename);
  await fs.writeFile(filePath, buffer);
  return filePath;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const title =  JSON.parse(body.get("title") as string);
    const mimeType = JSON.parse(body.get("mimeType") as string);
    const file = body.get("file") as File ?? null;
    const instruction = JSON.parse(body.get("instruc") as string);
    const id =JSON.parse(body.get("id") as string);
    const classId = JSON.parse(body.get("classId") as string)

    // saving the file inside the upload folder
    const savedFilePath = await saveFile(file, file.name);

    // upload in my gdrive api and return the link
    const fileUpload = await uploadGdrive(file.name, mimeType);
    // delete the file
    await fs.unlink(savedFilePath);
    const slug = generateRandomString()
  await prisma.activity.create({
      data:{
        instruction,
        title,
        slug,
        fileType:file.type,
        fileUrl:fileUpload?.fileUrl as string ?? null,
        fileUrlDownload:fileUpload?.fileUrlDownload as string ?? null,
        teacher:{
          connect:{
            id,
          },
        },
        classroom:{
          connect:{
            id:classId,
          }
        }
      }
    })

    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
  } catch (error) {
    console.log(error, "ERROR");
    return NextResponse.json({ message: "ERROR" }, { status: 500 });
  }
}
