"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import CreateClasswork from "./CreateClasswork";
import { Activity } from "@prisma/client";
import ClassworkList from "./ClassworkList";
import { usePathname, useRouter } from "next/navigation";
const EmptyClasswork = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex ">
        <Image
          alt="Empty-Classwork"
          src="/empty-classwork.svg"
          width={350}
          height={200}
        />
      </div>
      <div className="flex flex-col text-center space-y-1 mt-5">
        <span className="tracking-wdie font-semibold">
          This is where you&apos;ll set up assignments and activities.
        </span>
        <span className="text-sm text-muted-foreground">
          You can input assignments and other tasks for the class and then
          categorize them into topics.
        </span>
      </div>
    </div>
  );
};

const Classwork = ({
  classId,
  classActs,
}: {
  classId: string;
  classActs: Activity[];
}) => {
  const [clickCreate, setClickCreate] = useState<boolean>(false);
  const router = useRouter()
const pathname = usePathname()

  return (
    <Fragment>
      {clickCreate ? (
        <CreateClasswork setClickCreate={setClickCreate} classId={classId} />
      ) : (
        <div>
          <div className="flex items-end justify-end py-5">
            <Button onClick={() => setClickCreate((prev) => !prev)}>
              Create +
            </Button>
          </div>
          {classActs.length > 0 ? (
            <div className="flex flex-col space-y-8">
              {classActs.map((act) => (
             <Fragment key={act.id}>
                 <ClassworkList act={act} 
                onClick={()=>router.push(`${pathname}/${act.slug}`, 
                )}
                />
             </Fragment>
              ))}
            </div>
          ) : (
            <Fragment>
              <EmptyClasswork />
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Classwork;
