import prisma from "@/db"
import { authOptions } from "@/utils/authOptions"
import { NextApiRequest } from "next"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
export async function POST(req:NextRequest){
    try {
        const {id} = await req.json()
        const session = await getServerSession(authOptions)
        const postLike = await prisma.forumLike.create({
            data:{
                user:{
                    connect:{
                    id:session?.user.id as string
                    }
                },
                forums:{
                    connect:{
                     id:id
                    }
                },
            },
        })
    return NextResponse.json({message:"Succes"}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error}, {status:200})
    }
}