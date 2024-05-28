"use client"
import React, { useState } from 'react'
import { ThumbsUp, MessageSquareText } from "lucide-react";
import { Button } from "@nextui-org/react";
import { forumLike } from '@/actions/forum-like';
const ForumButtons = ({likes,id}:{likes:number | undefined, id:string}) => {
    const [isClick , setIsClick] = useState<boolean>(false)
    const handleLike =async(id:string) => {
      setIsClick((active)=>!active);
      if(!id)return;
      fetch("api/like", {
        method:"POST",
        body:JSON.stringify({id})
      })
    }
  return (
    <div className="flex flex-row gap-4 mt-4">
            <Button isIconOnly size="md" onClick={()=> handleLike(id)} color={isClick ? "success" : "default"} className='p-1'>
              <ThumbsUp className="h-6 w-6 mr-1" /> 
              <span className='font-bold text-[15px] '>{likes}</span>
            </Button>
            <Button isIconOnly size="md" className='p-1'>
              <MessageSquareText className="h-6 w-6 mr-1" />
              <span className='font-bold text-[15px] '>{likes}</span>
            </Button>
          </div>
  )
}

export default ForumButtons