import prisma from "@/db";
import { user } from "@nextui-org/react";
import { User } from "@prisma/client";
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
  const allUser:User[] = (await prisma.user.findMany({}))
  
const sortUser = allUser.sort((a:any,b:any) => {if(a.gameState.levels[0].isCompleted && b.gameState.levels[0].isCompleted){
return b.gameState.levels[0].points - a.gameState.levels[0].points;

}
if(a.gameState.levels[0].isCompleted === b.gameState.levels[0].isCompleted){
  return 0;
}
return a.gameState.levels[0].isCompleted ? -1 : 1;
})

console.log(sortUser, "SORTED USER")  

  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');

return NextResponse.json({users:sortUser}, {status:200, headers})
}




