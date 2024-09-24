import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {

try {
  const user = await req.json()
  const userLevel = await prisma.user.findUnique({
    where:{
      id:user.id,
    },
    select:{
      level:true,
    }
  })



} catch (error) {
  console.log(error, "ERROR")
}
}


export async function GET(){
  const allUser = await prisma.user.findMany()
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

return NextResponse.json({users:allUser}, {status:200, headers})
}


