import React, { useMemo } from "react";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import { Forum, ForumLike } from "@prisma/client";
import timeDiff from "@/utils/timeCalc";
import ForumButtons from "./ForumButtons";
import Link from "next/link";
import { cn } from "@/lib/utils";
const ForumContainer = ({
  id,
  authorUsername,
  forumImage,
  title,
  caption,
  createdAt,
  _count,
  userLikes,
  titleId,
}: Forum & {
  _count:{
    forumLikes:number;
    comments?:number;
  },
  userLikes?:ForumLike[],
}) => {
  const timeDiffCalc = useMemo(() => {
    return timeDiff(createdAt);
  }, [createdAt]);
  return (
    <div className="relative pt-20 md:mx-[200px] mx-0">
      <div className="h-fit w-full pb-[10px]  border-b-1 border-muted-foreground">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row gap-2 justify-start text-xs cursor-pointer "
         
          >
            <Link href={`user/${authorUsername}`} className="flex gap-2"> 
            <Avatar
              showFallback
              src="https://images.unsplash.com/broken"
              size="sm"
            />
            <div className="flex flex-col">
              <p className=" tracking-wide ">{authorUsername}</p>
              {/* <strong className='pl-1'>.</strong> */}
              <p className="text-gray-500 ">{timeDiffCalc}</p>
            </div>
            </Link>
          </div>
          <div className="text-lg font-bold tracking-wider pt-5 title pb-2">
            {title}
          </div>
          <div className="text-sm text-black dark:text-white tracking-wide">{caption}</div>
          {forumImage && (
        <div className="relative w-full max-w-md md:max-w-lg"
        >
          <Link href={`user/${authorUsername}/comments/${titleId}/${title}`}> 
        <Image
          src={forumImage}
          alt="Animated GIF"
          className={cn("rounded-md mt-2 w-full h-auto")}/// adjust the photo size here // TODO : FIX THIS DYNAMIC CLASSNAME
          width={320}
          height={400}
          unoptimized={true}
          priority
        />
        </Link>
      </div>
          )}
          <ForumButtons likes={_count.forumLikes} forumId={id} userLikes={userLikes} route={`user/${authorUsername}/comments/${titleId}/${title}`}
            comments={_count.comments as number}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumContainer;
