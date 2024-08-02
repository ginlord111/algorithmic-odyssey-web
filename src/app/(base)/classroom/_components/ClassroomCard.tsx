import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { Classroom } from "@prisma/client";
const ClassroomCard = ({ sub }: { sub: Classroom }) => {
  return (
    <Card className="py-2 w-fit relative z-[1] h-[17em]">
      <CardHeader className="flex relative flex-col items-start">
        <Image
          src="https://www.gstatic.com/classroom/themes/English.jpg"
          width={350}
          height={250}
          alt="Subject Pic"
          className=" rounded-md"
        />

        <div className="absolute !text-white px-3">
          <p className="text-xl font-bold">{sub.className}</p>
          <p className="text-md font-semibold">{sub.sectionName}</p>
          <p className="text-md font-semibold">{sub.teacherName}</p>
            <Avatar 
            showFallback
            src={sub.teacherImage}
            alt="Teacher Profile Image"
            className="absolute left-[20em] border-1 border-[#cbd5e11a] top-[4em]"
            size="lg"
            />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">


      </CardBody>
    </Card>
  );
};

export default ClassroomCard;
