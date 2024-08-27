import { StudentActivity } from "@prisma/client";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox} from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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



const InputGradeModal = ({isOpen,onOpenChange,targetStud,onClose}:{isOpen:boolean, onOpenChange:()=>void,targetStud:StudentActivity|null,onClose:()=>void}) => {
  const [score, setScore] = useState<string>("0")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMess, setErrorMess] = useState<string>("")
  const {refresh} = useRouter()
  const onSubmit = async() => {
    setIsLoading(true)
    const parsedScore = Number(score)
    if (isNaN(parsedScore)) {
      setErrorMess("Score must be a valid number");
      return;
    }
  const res = await fetch("/api/classroom/classwork/score", {
      method:"PATCH",
      body:JSON.stringify({targetStud,score:parsedScore})
    })
    setIsLoading(false)
    if(!res.ok){
       setErrorMess("Something went wrong!")
       return ;
    }
    onClose()
    toast.success("Succesful input grades")
    refresh();

  }
  return (
    <Modal 
    isOpen={isOpen} 
    onOpenChange={onOpenChange}
    placement="top-center"
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Input Score</ModalHeader>
          <ModalBody>
           <Input  type="number" value={score}  onChange={(e) => setScore((e.target.value))} />
          {errorMess &&  <span className="text-red-500 text-sm font-semibold">{errorMess}</span>}
          </ModalBody>
          <ModalFooter>
            <Button  className="bg-red-500 text-white font-semibold" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button className="bg-green-500 text-black font-semibold"  onClick={onSubmit}>
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin"/> : "Submit"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
  )
}





const StudentWorkTab = ({
  teacherViewWork,
}: {
  teacherViewWork: StudentActivity[];
}) => {
  const {isOpen, onOpenChange, onOpen,onClose} = useDisclosure();
  const [targetStud, setTargetStud] = useState<StudentActivity | null> (null)

  const handleGrade = (stud:StudentActivity) => {

    onOpen()
    setTargetStud(stud)
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
                      as={Link}
                      target="_blank"
                      className="bg-blue-500 hover:bg-blue-500 text-white"
                      href={stud.fileSubmittedUrl as string}
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
