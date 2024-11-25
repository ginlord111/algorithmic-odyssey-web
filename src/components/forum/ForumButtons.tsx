"use client"

import React, { useEffect, useState } from "react"
import { ThumbsUp, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { isForumLike } from "@/helper/is-forum-like"
import { ForumLike } from "@prisma/client"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ForumButtonsProps {
  likes: number
  forumId: string
  userLikes?: ForumLike[]
  route: string
  comments: number
  postOwner: string
}

export default function ForumButtons({
  likes,
  forumId,
  userLikes = [],
  route,
  comments,
  postOwner,
}: ForumButtonsProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(likes)
  const [commentCount, setCommentCount] = useState<number>(comments)
  const { data: session } = useSession()

  useEffect(() => {
    const temp = isForumLike(userLikes, forumId)
    setIsLiked(temp)
  }, [userLikes, forumId])

  const handleLike = async () => {
    if (!forumId) return
    if (!session?.user.id) {
      return signIn()
    }

    try {
      const response = await fetch("/api/forum/like", {
        method: "POST",
        body: JSON.stringify({ id: forumId, postOwner, route }),
      })

      if (response.status === 400) return

      const data = await response.json()
      const { isAlreadyLiked } = data

      setLikeCount((prevCount) => (isAlreadyLiked.length > 0 ? prevCount - 1 : prevCount + 1))
      setIsLiked((prevState) => !prevState)
    } catch (error) {
      console.error("There was a problem with the like operation:", error)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        className={cn(
          "flex items-center space-x-1 transition-colors",
          isLiked && "text-primary hover:text-primary"
        )}
      >
        <ThumbsUp className={cn("h-4 w-4", isLiked && "text-blue-500 fill-blue-500")} />
        <span className="text-sm font-medium">{likeCount}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="flex items-center space-x-1"
      >
        <Link href={route}>
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium">{commentCount}</span>
        </Link>
      </Button>
    </div>
  )
}

