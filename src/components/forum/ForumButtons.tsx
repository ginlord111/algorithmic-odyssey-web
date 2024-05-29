"use client"
import React, { useEffect, useState } from 'react'
import { ThumbsUp, MessageSquareText } from "lucide-react";
import { Button } from "@nextui-org/react";
import { isForumLike } from '@/helper/is-forum-like';
const ForumButtons = ({likes,forumId,userLikes}:{likes:number, forumId:string,userLikes?:string[]}) => {
    const [isClick , setIsClick] = useState<boolean>(false)
    const [likesIncr, setLikesIncr] = useState<number>(likes)
    const [likeForum, setLikForum] = useState<boolean>()
    const handleLike =async(id:string) => {
      console.log(userLikes, "LIKE FORUM")
      setIsClick((active)=>active ? false :true);
      setLikesIncr((like)=> likeForum ? like-=1 : like+=1)
      if(!id)return;
     fetch("api/like", {
        method:"POST",
        body:JSON.stringify({id,forumLike:likeForum})
      })
    }
    useEffect(()=>{
      const temp = isForumLike(userLikes, forumId) 
      setLikForum(temp)
    },[likeForum, userLikes, forumId, likes])
  
  return (
    <div className="flex flex-row gap-4 mt-4">
            <Button isIconOnly size="md" onClick={()=> handleLike(forumId)} color={likeForum || isClick ? "success" : "default"} className='p-1'>
              <ThumbsUp className="h-6 w-6 mr-1" /> 
              <span className='font-bold text-[15px] '>{likesIncr}</span>
            </Button>
            <Button isIconOnly size="md" className='p-1'>
              <MessageSquareText className="h-6 w-6 mr-1" />
              <span className='font-bold text-[15px] '>0</span>
            </Button>
          </div>
  )
}

export default ForumButtons