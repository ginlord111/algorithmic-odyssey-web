import prisma from "@/db";
import { Forum } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { uploadCloudinary } from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
export async function GET(req: NextRequest): Promise<any> {
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  try {
    const forums = await prisma.forum.findMany({
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      take: 1,
    });
    if (forums.length === 0) {
      return NextResponse.json(
        {
          data: [],
          metaData: {
            lastCursor: null,
            nextQuery: false,
          },
        },
        { status: 200 }
      );
    }
    const lastForum: Forum = forums[forums.length - 1];
    const newCursor = lastForum.id;

    const nextForum = await prisma.forum.findMany({
      take: 1,
      skip: 1,
      cursor: {
        id: newCursor,
      },
    });
    const data = {
      data: forums,
      metaData: {
        lastCursor: newCursor !== undefined ? newCursor : null,
        hasNextPage: nextForum.length > 0,
      },
    };
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching forums:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  let imageUpload:any
  const body = await req.formData();
  const image = body.get("image") as unknown as File;
  if(image){
     imageUpload = await uploadCloudinary(image, "algorithmic-oddysey");
  }
  const captions = JSON.parse(body.get("caption") as string);
  const title = JSON.parse(body.get("title") as string);
  console.log(imageUpload, "image upload");
  console.log(title, "TITLE");
 
    const createForum = await prisma.forum.create({
      data: {
        caption: captions ?? null,
        title: title,
        forumImage: imageUpload?.secure_url ?? null,
        user: {
          connect: {
            id: session?.user.id,
          },
        },
      },
      select: {
        caption: true,
        forumImage: true,
        title: true,
      },
    });
    console.log(createForum, "create forum");
}