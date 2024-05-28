import prisma from "@/db";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const forumLike = async (id:string)=> {
try {
    const session = await getServerSession(authOptions)
    const postLike = await prisma.forumLike.create({
        data:{
            user:{
                connect:{
                id:session?.user.id
                }
            },
            forums:{
                connect:{
                 id:id
                }
            },
        },
    })
    console.log(postLike, "SUCCESSS LIKE")
} catch (error) {
    console.log(error)
}
}