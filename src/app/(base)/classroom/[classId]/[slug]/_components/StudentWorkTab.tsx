import { StudentActivity } from "@prisma/client";
import Image from "next/image";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Avatar,Button } from "@nextui-org/react";
import { useDisclosure} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { NavActState } from "@/types/types";
import { InputGradeModal } from "@/components/modal/InputGradeModal";
const EmptyStudentWork = () => {
  return (
    <div className="flex items-center justify-center flex-col space-y-4">
      <Image
        src="/empty-student-work.svg"
        alt="Empty Student Work"
        width={250}
        height={150}
      />
      <span className="text-muted-foreground font-semibold">
        No students have submitted their work yet
      </span>
    </div>
  );
};
const StudentWorkTab = ({
  teacherViewWork,
  setCurrentTab
}: {
  teacherViewWork: StudentActivity[];
  setCurrentTab:Dispatch<SetStateAction<NavActState>>
}) => {
  const {isOpen, onOpenChange, onOpen,onClose} = useDisclosure();
  const [targetStud, setTargetStud] = useState<StudentActivity | null> (null)
  const router = useRouter()
  const pathname = usePathname()
  const handleGrade = (stud:StudentActivity) => {

    onOpen()
    setTargetStud(stud)
  }

  const handleViewWorks = (stud:StudentActivity) =>{
    if(stud.fileSubmittedUrl){
      router.push(stud.fileSubmittedUrl)
    }
    else if(stud.codeSubmitted){
      router.replace(`${pathname}?tab=compiler&student=${stud.studentId}`)
      setCurrentTab("compiler")
    }
  }
  return (
    <div className="relative mt-10">
      <InputGradeModal isOpen={isOpen} onOpenChange={onOpenChange} targetStud={targetStud} onClose={onClose}/>
      {teacherViewWork.length > 0 ? (
        <Fragment>
          <Accordion variant="shadow" fullWidth>
            {teacherViewWork.map((stud, index) => (
              <AccordionItem
                key={index}
                aria-label={stud.studentName}
                startContent={
                  <Avatar
                    isBordered
                    radius="sm"
                    src={stud.studentAvatar}
                    alt={`${stud.studentName}'s avatar`}
                    className="w-10 h-10"
                  />
                }
                title={
                  <div className="flex items-center justify-between w-full">
                    <div className="text-lg font-semibold text-gray-800">
                      {stud.studentName}
                    </div>
                    {!stud.isCompleted  ? (
                      <span className="text-muted-foreground text-sm font-semibold italic">
                        No submissions yet
                      </span>
                    ) : 
                    stud.score ? 
                    (
                      <p className="text-muted-foreground text-sm font-semibold">
                        Graded: <span className="text-blue-500 font-bold">{stud.score}</span>
                      </p>
                    ) :
                    <span className="text-muted-foreground text-sm font-semibold italic">
                   Submitted
                  </span>
                    }
                  </div>
                }
                subtitle={
                  <div className="text-sm text-gray-500">
                    {stud.studentEmail}
                  </div>
                }
              >
                {stud.isCompleted && (
                  <div className="flex space-x-3 justify-end py-3 ">
                    <Button className="bg-purple-700 hover:bg-purple-700 text-white" 
                 onClick={()=>handleGrade(stud)}
                    >
                      Grade
                    </Button>
                    <Button
                      target="_blank"
                      className="bg-blue-500 hover:bg-blue-500 text-white"
                      onClick={()=>handleViewWorks(stud)}
                    >
                      View Works
                    </Button>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Fragment>
      ) : (
        <EmptyStudentWork />
      )}
    </div>
  );
};

export default StudentWorkTab;
