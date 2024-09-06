import timeDiff from "@/utils/timeCalc";
import { Avatar } from "@nextui-org/react";
import React, { useMemo } from "react";
import Link from "next/link";
import { CommentProps } from "@/types/types";
const CommentsList = ({
  id,
  comment,
  username,
  createdAt,
  hideComment,
  userImage,
}:CommentProps  & {
  hideComment:boolean;
}) => {
  const timeDiffCalc = useMemo(() => {
    return timeDiff(createdAt);
  }, [createdAt]);
  return (
    <div className={`relative space-y-8  pt-5 lg:mx-[200px] md:mx-[100px] mx-0 max-w-xl overflow-hidden w-full ${hideComment && 'hidden'} `}>
      <div className="flex border-b-2 border-b-gray-300 pb-3 gap-2 items-start ">
      <Link href={`/user/${username}`}> 
          <Avatar
            showFallback
            src={userImage}
            size="md"
          />
        </Link>
        <div className="flex flex-col bg-[#e6e6e6] items-start p-2 rounded-md px-3 w-full">
          <div className="flex items-center gap-3 justify-between w-full">
            <span className="font-bold text-sm ">{username}</span>
            <span className="text-muted-foreground text-sm">{timeDiffCalc}</span>
          </div>
          <div className="text-sm leading-6 rounded-md pt-2">
          {comment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
