import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
 try {
    const {score} = await req.json()
    const session = await getServerSession(authOptions)
    const userId = session && session.user.id
    console.log(userId, "USERID")
    const user = await prisma.user.update({
        where:{
            id:session?.user.id as string
        },
        data:{
            score,
        }
    }) 

    return NextResponse.json({user}, {status:200})
 } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
 }
}

