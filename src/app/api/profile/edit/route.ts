import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
const {data,userId} = await req.json()
const {username, facebook, github, instagram,twitter} = data;
//TODO: VALIDATE THE USERNAME IF ITS UNIQUE OR NOT THE SAME TO THE OTHER USER USERNAME
try {
    await prisma.user.update({
        where:{
          id:userId,
        },
        data:{
          username,
          facebook,
          github,
          instagram,
          twitter,
        }
      })
      
      return NextResponse.json({message:"Success"}, {status:200})
} catch (error) {
    return NextResponse.json({error})
}
}