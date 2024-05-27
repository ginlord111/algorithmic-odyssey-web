import React, { useMemo } from "react";
import { Avatar } from "@nextui-org/react";

import Image from "next/image";
import { Forum } from "@prisma/client";
import timeDiff from "@/utils/timeCalc";
import ForumButtons from "./ForumButtons";
const ForumContainer = ({
  id,
  userId,
  authorUsername,
  forumImage,
  title,
  caption,
  createdAt,
}: Forum) => {
  const timeDiffCalc = useMemo(() => {
    return timeDiff(createdAt);
  }, [createdAt]);
  return (
    <div className="relative pt-20 max-w-4xl flex ">
      <div className="h-fit w-full pb-[50px]">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-row gap-2 justify-start text-xs ">
            <Avatar
              showFallback
              src="https://images.unsplash.com/broken"
              size="sm"
            />
         <div className="flex flex-col gap-1">
         <p className=" tracking-wide ">{authorUsername}</p>
            {/* <strong className='pl-1'>.</strong> */}
            <p className="text-gray-500 ">{timeDiffCalc}</p>
         </div>
          </div>
          <div className="text-lg font-bold tracking-wider pt-5 title pb-2">
            {title}
          </div>
          <div className="text-sm text-gray-500 tracking-wide">{caption}</div>
          {forumImage && (
            <div className="w-[50%] !h-[50%] relative mx-auto md:mx-0">
              <Image
                src={forumImage}
                alt="Animated GIF"
                className="rounded-lg mt-2"
                width={2020}
                height={40}
                unoptimized={true}
              />
            </div>
          )}
<ForumButtons />
        </div>
      </div>
    </div>
  );
};

export default ForumContainer;