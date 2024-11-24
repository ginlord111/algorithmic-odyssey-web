import timeDiff from "@/utils/timeCalc";
import { Activity } from "@prisma/client";
import Image from "next/image";
import React, { useMemo } from "react";
const ClassworkList = ({
  act,
  onClick,
  taskScore
}: {
  act: Activity;
  onClick: () => void;
  taskScore?:number
}) => {
  const imgSrc =
    act.fileType === "application/pdf"
      ? "/pdf.png"
      : act.fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ? "/doc.png"
      : act.fileType?.includes("image")
      ? "/photo.png"
      : "/word-icon.png";
  const timeDiffCalc = useMemo(() => {
    return timeDiff(act.createdAt);
  }, [act.createdAt]);
  return (
    <div
      className="relative  border border-[#dadce0] rounded-md cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="py-3 px-5 flex items-center space-x-4">
        <div className="relative">
          <Image alt="File Type Image" src={imgSrc} width={40} height={20} />
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold tracking-wide text-md">
            {`${act.teacherName} posted a new  ${act.isActivity ? "activity: " : "assesment: "}${act.title}`}
          </p>
          <p className="text-sm text-muted-foreground">{timeDiffCalc}</p>
        </div>
      {taskScore && (
          <div className="flex flex-grow  justify-end">
          <p className="text-muted-foreground font-semibold text-sm italic">
            Grade: <span className="text-red-500">{taskScore}</span>/{" "}
            <span className="text-green-500">{act.maxScore}</span>
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default ClassworkList;
