import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const url = new URL(req.url)
    const query = url.searchParams.get("query") as string
    console.log(query, "QUERYYY")
 
try {
    const usernameResult = await prisma.user.findMany({
        where:{
          username:{
               contains:query,
               mode:"insensitive"
          }
        }
      })
      
      const titleResult = await prisma.forum.findMany({
          where:{
              title:{
                  contains:query,
                  mode:'insensitive'
              }
          }
      })
      return NextResponse.json({ userData: usernameResult, forumData: titleResult }, {status:200})

} catch (error) {
    console.log(error)
    return NextResponse.json({message:"Error"}, {status:500})
}

}