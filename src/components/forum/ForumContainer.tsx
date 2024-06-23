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
  className,
  userImage,
  followBtnComponent,
}: Forum & {
  _count:{
    forumLikes:number;
    comments?:number;
  },
  userLikes?:ForumLike[],
  className?:string,
  followBtnComponent?:React.JSX.Element
}) => {
  const timeDiffCalc = useMemo(() => {
    return timeDiff(createdAt);
  }, [createdAt]);
  return (
    <div className={cn("relative pt-20 lg:mx-[300px] md:mx-[100px] mx-0 max-w-xl overflow-hidden w-full",className)}>
      <div className="h-fit w-full pb-[10px]  border-b-1 border-muted-foreground">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row gap-2 justify-start text-xs cursor-pointer w-full "
         
          > 
          {/**TODO: ADD USER IMAGE IN FORUM SCHEMA */}
            <Link href={`/user/${authorUsername}`} className="flex gap-2"> 
            <Avatar
              showFallback
              src={userImage}
              size="md"
            />
            <div className="flex flex-col">
              <p className=" tracking-wide text-black font-semibold text-md">{authorUsername}</p>
              {/* <strong className='pl-1'>.</strong> */}
              <p className="text-gray-500 ">{timeDiffCalc}</p>
            </div>
            </Link>
          {/* TODO: FETCH IF THE USER IS ALREADY FOLLOWING THE OTHER USER AND PASS IT ON AS PROPS HERE CHECH FORUM BTN USERLIKES PROPS FOR REFERENCE */}
            <div className="ml-auto">
              {followBtnComponent}
            </div>
          </div>
          <div className="text-lg font-bold tracking-wider pt-5 title pb-2">
            {title}
          </div>
          <div className="text-sm text-black dark:text-white tracking-wide">{caption}</div>
          {forumImage && (
        <div className="relative w-full max-w-md md:max-w-xl overflow-hidden"
        >
          <Link href={`/forum/${authorUsername}/comments/${titleId}/${title}`}> 
        <Image
          src={forumImage}
          alt="Animated GIF"
          className={cn("rounded-md mt-2 w-full h-auto")}/// adjust the photo size here // TODO : FIX THIS DYNAMIC CLASSNAME
          width={320}
          height={400}
          unoptimized={true}
          loading="lazy"
        />
        </Link>
      </div>
          )}
          <ForumButtons likes={_count.forumLikes} forumId={id} userLikes={userLikes} route={`/forum/${authorUsername}/comments/${titleId}/${title}`}
            comments={_count.comments as number}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumContainer;
