"use client";
import React, { useEffect, useState } from "react";
import { ThumbsUp, MessageSquareText } from "lucide-react";
import { Button } from "@nextui-org/react";
import { isForumLike } from "@/helper/is-forum-like";
import { ForumLike } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
const ForumButtons = ({
  likes,
  forumId,
  userLikes = [],
}: {
  likes: number;
  forumId: string;
  userLikes: ForumLike[];
}) => {
  const [isClick, setIsClick] = useState<boolean | null>(null);
  const [likeCount, setLikesCount] = useState<number>(likes);
  const [likeForum, setLikForum] = useState<boolean>();
  const { data: session } = useSession()
  const handleLike = async (id: string) => {
    if (!id) return;
    /// if user is not authenitcated redirect to sign in
      if(!session?.user.id){
        signIn()
      }
    try {
      const response = await fetch("api/like", {
        method: "POST",
        body: JSON.stringify({ id}),
      });
      if (response.status === 400) {
        return;
      }

      const data = await response.json();
      const { isAlreadyLiked } = data;
      setLikesCount((like) => (isAlreadyLiked.length > 0 ? like - 1 : like + 1));
      setIsClick((active) =>
        isAlreadyLiked.length > 0 ? (active = false) : (active = true)
      );
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    const temp = isForumLike(userLikes, forumId);
    setLikForum(temp);
  }, [userLikes]);

  return (
    <div className="flex flex-row gap-4 mt-4">
      <Button
        isIconOnly
        size="md"
        onClick={() => handleLike(forumId)}
        color={isClick ?? likeForum ? "success" : "default"}
        className="p-1"
      >
        <ThumbsUp className="h-6 w-6 mr-1" />
        <span className="font-bold text-[15px] ">{likeCount}</span>
      </Button>
      <Button isIconOnly size="md" className="p-1">
        <MessageSquareText className="h-6 w-6 mr-1" />
        <span className="font-bold text-[15px] ">0</span>
      </Button>
    </div>
  );
};

export default ForumButtons;
