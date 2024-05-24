import prisma from "@/db";
import { Forum } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest):Promise<any> {
  const url = new URL(req.url);         
  const cursor = url.searchParams.get("cursor");
  try {
   const forums = await prisma.forum.findMany({
    ...(cursor && {
      skip:1,
      cursor:{
        id:cursor
      },
    }),
    take:1,
   })
   if(forums.length ===0){
    return NextResponse.json({
      data:[],
      metaData:{
        lastCursor:null,
        nextQuery:false,
      }
    }, {status:200})
   }
   const lastForum:Forum = forums[forums.length -1]
   const newCursor = lastForum.id

   const nextForum = await prisma.forum.findMany({
    take:1,
    skip:1,
    cursor:{
      id:newCursor,
    }
   })
   const data = {
    data:forums,
    metaData:{
      lastCursor: newCursor !== undefined ? newCursor : null,
      hasNextPage: nextForum.length>0
    }
   }
    return NextResponse.json({data}, {status:200});
  } catch (error) {
    console.error('Error fetching forums:', error); // Log the actual error message
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
