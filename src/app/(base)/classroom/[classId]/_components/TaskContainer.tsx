import { Activity } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment } from "react";
import ClassworkList from "./ClassworkList";
import Image from "next/image";
const TaskContainer = ({
  tasks,
  isPending,
}: {
  tasks: Activity[];
  isPending?: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="mt-10">
      {tasks.length > 0 ? (
        <div className="flex flex-col space-y-8">
          {tasks.map((act) => (
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
            <span className="text-muted-foreground text-md">
              {isPending
                ? "Congratulations! You have no pending tasks at the moment."
                : "You have no graded tasks for today."}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskContainer;
