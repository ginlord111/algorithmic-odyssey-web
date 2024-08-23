import timeDiff from "@/utils/timeCalc";
import { Activity } from "@prisma/client";
import Image from "next/image";
import React, { useMemo } from "react";

const ClassworkList = ({ act,onClick }: { act: Activity,onClick:()=>void }) => {
  const imgSrc = act.fileType === "application/pdf" ? "/pdf.png" : act.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "/doc.png" : act.fileType?.includes("image") ? "/photo.png" : "/word-icon.png"
  const timeDiffCalc = useMemo(() => {
    return timeDiff(act.createdAt);
  }, [act.createdAt]);
  return (
    <div className="relative  border border-[#dadce0] rounded-md cursor-pointer bg-white"
    onClick={onClick}
    >
      <div className="py-3 px-5 flex items-center space-x-4">
        <div className="relative">
          <Image alt="File Type Image" src={imgSrc} width={40} height={20} />
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold tracking-wide text-md">
          {`${act.teacherName} posted a new activity: ${act.title}`}
          </p>
          <p className="text-sm text-muted-foreground">{timeDiffCalc}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassworkList;
