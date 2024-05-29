import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
export async function POST(req: NextRequest) {
  try {
    const { id, forumLike } = await req.json();
    const session = await getServerSession(authOptions);
    console.log(forumLike, "FORUM LIKEEEE")
    if (forumLike) {
      const forumLike = await prisma.forumLike.findFirst({
        where: {
          forumId: id,
          userId: session?.user.id,
        },
      });
      const deleteLike = await prisma.forumLike.delete({
        where: {
          id: forumLike?.id,
        },
      });
      revalidatePath("/forum")
      if (deleteLike)
        return NextResponse.json(
          { message: "Succes  Unlike" },
          { status: 200 }
        );
    } else {
      const postLike = await prisma.forumLike.create({
        data: {
          user: {
            connect: {
              id: session?.user.id as string,
            },
          },
          forums: {
            connect: {
              id: id,
            },
          },
        },
      });
      revalidatePath("/forum")
      if (postLike)
        return NextResponse.json({ message: "Succes Like" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
