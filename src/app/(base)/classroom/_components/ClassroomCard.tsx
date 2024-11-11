"use client"
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { Classroom } from "@prisma/client";
import { useRouter } from "next/navigation";
const ClassroomCard = ({ sub }: { sub: Classroom, }) => {
  const router = useRouter()
  
  const handleClickCard = () => {
    router.push(`/classroom/${sub.id}`);
  
  }
  return (
    <div  onClick={handleClickCard}> 
    <Card className="py-2 w-full relative z-[1] h-[17em] transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100" >
      <CardHeader className="flex relative flex-col items-start cursor-pointer h-[50%] rounded-md">
    <div className="relative w-full h-full ">
    <Image
          src="https://www.gstatic.com/classroom/themes/English.jpg"
          alt="Subject Pic"
          layout="fill" 
          objectFit="cover" 
          className=" rounded-md "
        />
    </div>

        <div className="absolute !text-white px-3">
          <p className="text-xl font-bold hover:underline transition">{sub.className}</p>
          <p className="text-md font-semibold hover:underline transition">{sub.sectionName}</p>
          <p className="text-md font-semibold hover:underline transition">{sub.teacherName}</p>
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
    </div>
  );
};

export default ClassroomCard;
