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

      // await prisma.notifications.update({
      //   where:{
      //     resourceId:{
      //       contains:username,
      //     },
      //   },
      //   data:{
          
      //   }
      // })
      
      return NextResponse.json({message:"Success"}, {status:200})


      /// TODO : UPDATE ALSO THE USERNAME IN THE NOTIFICATION MODEL
} catch (error) {
    return NextResponse.json({error})
}
}