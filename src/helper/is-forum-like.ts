export const isForumLike = (userLikes:string[]|undefined, forumId:string) => {
if(userLikes?.find((like)=>like === forumId)){
    return true
}
return false
}