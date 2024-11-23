import { NotepadText,Calendar } from "lucide-react";
import { Activity } from "@prisma/client";
import React, { useMemo } from "react";
import tiptapExtensions from "@/utils/tiptapExtension";
import { JSONContent } from "@tiptap/react";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import Link from "next/link";
import timeDiff from "@/utils/timeCalc";
import ActivityComment from "./ActivityComment";
import dueDateDiff from "@/utils/dueDateCalc";

const InstructionTab = ({ act }: { act: Activity }) => {
  const extension = tiptapExtensions();
  const instruction = generateHTML(act.instruction as JSONContent, extension);
  const timeDiffCalc = useMemo(() => {
    return timeDiff(act.createdAt);
  }, [act.createdAt]);
  return (
    <div className="relative mt-16 px-[4rem]">
      <div className="flex flex-col space-y-3 pb-6 border-b-1 border-[#e0e0e0]">
        <div className="flex justify-between w-full">
        <span className="text-lg font-bold">{act.isActivity ? "Activity" : "Assesment"}</span>
        {act.dueDate && <span className="text-muted-foreground   font-semibold"><Calendar className="w-5 h-5  inline-block"/> {dueDateDiff(act.dueDate)}</span>}
        </div>
       
        <div className="flex space-x-3">
          <div className="p-1 bg-[#5F6368] h-fit rounded-full">
            <NotepadText className="w-6 h-6 text-white  " />
          </div>
          <span className="md:text-3xl text-xl font-semibold tracking-wider">
            {act.title}
          </span>
        </div>
        <span className="text-muted-foreground text-sm">{timeDiffCalc}</span>
      </div>
      <div className="flex flex-col mt-5 space-y-2">
        <span className="font-semibold italic">Instructions:</span>
        <div className="tracking-wide font-semibold">
          {parse(`${instruction}`)}
        </div>
        <div className="flex justify-end gap-6 p-6">
          <Link
            href={act.fileUrl}
            target="_blank"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            View File
          </Link>
          <Link
            href={act.fileUrlDownload}
            target="_blank"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
          >
            Download File
          </Link>
        </div>
      </div>
  <div className="mt-20">
  <ActivityComment activityId={act.id}/>
  </div>
    </div>
  );
};

export default InstructionTab;
