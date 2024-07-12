import prisma from "@/db";
import { verifyPassword } from "@/utils/verifyHashPass";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req:NextRequest) {
    const {email,password} = await req.json()

    const user = await prisma.user.findFirst({
        where:{
            email
        }
    })
  
      if (!user) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
      }
  
      const isValid = await verifyPassword(password, user.password as string)
  
      if (!isValid) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
      }

      return NextResponse.json({ message: "Login succesfully" }, { status: 200 });
}