import { ForumLike } from "@prisma/client"

export const isForumLike = (userLikes:ForumLike[] =[], forumId:string) => {
if(userLikes.some((like)=>like.forumId === forumId)){
    return true
}
return false
}