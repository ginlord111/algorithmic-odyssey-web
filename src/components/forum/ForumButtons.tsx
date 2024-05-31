"use client";
import React, { useEffect, useState } from "react";
import { ThumbsUp, MessageSquareText } from "lucide-react";
import { Button } from "@nextui-org/react";
import { isForumLike } from "@/helper/is-forum-like";
import { ForumLike } from "@prisma/client";

const ForumButtons = ({
  likes,
  forumId,
  userLikes =[],
}: {
  likes: number;
  forumId: string;
  userLikes: ForumLike[];
}) => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [likesIncr, setLikesIncr] = useState<number>(likes);
  const [likeForum, setLikForum] = useState<boolean>();
  const [newUserLike, setNewUserLike] = useState<ForumLike[]>()
  const handleLike = async (id: string) => {
    setIsClick((active) => !active);
    setLikesIncr((like) => likeForum ? like - 1 : like + 1);

    if (!id) return;

    try {
        const response = await fetch("api/like", {
            method: "POST",
            body: JSON.stringify({ id, forumLike: likeForum }),
        });
          if(response.status === 400){
            return;
          }

        const data = await response.json();
        const {isAlreadyLiked} = data
        setNewUserLike(isAlreadyLiked)
        console.log(data, "is already likye")
       
    
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
  useEffect(() => {
    console.log(newUserLike, "NW USER LIKE")
    const temp = isForumLike(newUserLike ?? userLikes, forumId);
    setLikForum(temp);
    console.log(temp, "LIKE FORUM")
  }, [likeForum, userLikes, forumId, likes, newUserLike]);
  return (
    <div className="flex flex-row gap-4 mt-4">
      <Button
        isIconOnly
        size="md"
        onClick={() => handleLike(forumId)}
        color={likeForum || isClick ? "success" : "default"}
        className="p-1"
      >
        <ThumbsUp className="h-6 w-6 mr-1" />
        <span className="font-bold text-[15px] ">{likesIncr}</span>
      </Button>
      <Button isIconOnly size="md" className="p-1">
        <MessageSquareText className="h-6 w-6 mr-1" />
        <span className="font-bold text-[15px] ">0</span>
      </Button>
    </div>
  );
};

export default ForumButtons;
