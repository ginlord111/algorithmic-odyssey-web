import prisma from "@/db"
import { authOptions } from "@/utils/authOptions"
import { getServerSession } from "next-auth"

export const getUserForumLike = async() =>{
    const session = await getServerSession(authOptions)
const userLikes = await prisma.forumLike.findMany({
    where:{
        userId:session?.user.id
    }
})
if(userLikes) return userLikes;
}