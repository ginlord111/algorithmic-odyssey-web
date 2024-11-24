import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();

  try {
    await prisma.bugReport.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Succes" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
