import { Activity } from "@prisma/client";
import React, { Fragment } from "react";
import ClassworkList from "./ClassworkList";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PendingTask = ({ studentActs }: { studentActs: Activity[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="mt-10">
      {studentActs.length > 0 ? (
        <div className="flex flex-col space-y-8">
          {studentActs.map((act) => (
            <Fragment key={act.id}>
              <ClassworkList
                act={act}
                onClick={() => router.push(`${pathname}/${act.slug}`)}
              />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-2">
          <Image
            src="/no-pending-task.svg"
            alt="No Pending Task"
            width={250}
            height={150}
          />
          <span className="text-muted-foreground text-md">
            Congratulations! You have no pending tasks at the moment.
          </span>
        </div>
      )}
    </div>
  );
};

export default PendingTask;
