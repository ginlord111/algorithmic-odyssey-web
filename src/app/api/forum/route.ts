import prisma from "@/db"
import { NextResponse } from "next/server";
export async function GET(){
    const forums = await prisma.forum.findMany();
  return NextResponse.json(forums)
}