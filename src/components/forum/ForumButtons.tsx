"use client"
import React, { useState } from 'react'
import { ThumbsUp, MessageSquareText } from "lucide-react";
import { Button } from "@nextui-org/react";
const ForumButtons = () => {
    const [isClick , setIsClick] = useState<boolean>(false)
  return (
    <div className="flex flex-row gap-4 mt-4">
            <Button isIconOnly size="sm" onClick={()=>setIsClick((active)=>!active)} color={isClick ? "success" : "default"}>
              <ThumbsUp className="h-5 w-5" /> 
            </Button>
            <Button isIconOnly size="sm">
              <MessageSquareText className="h-5 w-5" />
            </Button>
          </div>
  )
}

export default ForumButtons