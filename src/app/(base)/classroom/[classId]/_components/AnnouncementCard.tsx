import { Avatar } from "@nextui-org/react";
import { ClassroomAnnouncement } from "@prisma/client";
import { generateHTML } from "@tiptap/html";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import React, { useMemo } from "react";
import tiptapExtensions from "@/utils/tiptapExtension";
import parse from "html-react-parser";
import timeDiff from "@/utils/timeCalc";
const AnnouncementCard = ({ data }: { data: ClassroomAnnouncement }) => {
  let tempContent;
  const extension = tiptapExtensions();
  if (data.content) {
    tempContent = generateHTML(data.content as JSONContent, extension);
  }
  const timeDiffCalc = useMemo(() => {
    return timeDiff(data.createdAt);
  }, [data.createdAt]);
  return (
    <div className="flex flex-col bg-white px-3 py-3 md:px-5 md:py-4 rounded-lg cursor-pointer space-y-3 md:space-y-4 border-1 border-[#dadce0]">
      <div className="flex space-x-3 md:space-x-4">
        <Avatar showFallback src={data.userImage} size="sm" />
        <div className="flex flex-col">
          <p className="font-semibold text-sm md:text-md tracking-wide">
            {data.fullName}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm">
           {timeDiffCalc}
          </p>
        </div>
      </div>
      <div className=" text-xs md:text-sm text-muted-foreground tracking-wide pl-3 md:pl-5 break-words">
        {tempContent && parse(`${tempContent}`) }
      </div>
      {data.image && (
        <div className="relative w-full h-40 md:h-64 lg:h-96 overflow-hidden">
          <Image
            src={data.image}
            alt="Announcement Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;
