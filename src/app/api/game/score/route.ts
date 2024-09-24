import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const headers = new Headers();
headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
headers.set('Access-Control-Allow-Methods', 'GET, POST');
headers.set('Access-Control-Allow-Headers', 'Content-Type');
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

    return NextResponse.json({user}, {status:200, headers})
 } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
 }
}

