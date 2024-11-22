import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
} from "@nextui-org/react";
import { StudentActivity } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export const InputGradeModal = ({
  isOpen,
  onOpenChange,
  targetStud,
  onClose,
  teacherId,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  targetStud: StudentActivity | null;
  onClose: () => void;
  teacherId?: string;
}) => {
  const [score, setScore] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<string>("");
  const [feedBackVal, setFeedBackVal] = useState<string>("You did great!");
  const { refresh } = useRouter();
  const onSubmit = async () => {
    setIsLoading(true);
    const parsedScore = Number(score);
    if (isNaN(parsedScore)) {
      setErrorMess("Score must be a valid number");
      return;
    }
    const res = await fetch("/api/classroom/classwork/score", {
      method: "PATCH",
      body: JSON.stringify({ targetStud, score: parsedScore, feedBackVal,teacherId }),
    });
    setIsLoading(false);
    if (!res.ok) {
      setErrorMess("Something went wrong!");
      return;
    }
    onClose();
    toast.success("Succesful input grades");
    refresh();
  };

  console.log(feedBackVal, "VALUE");
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Input Score
            </ModalHeader>
            <ModalBody>
              <Input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              <span className="text-sm text-muted-foreground">Feedback</span>
              <Input
                defaultValue="You did Great"
                onChange={(e) => setFeedBackVal(e.target.value)}
              />
              {errorMess && (
                <span className="text-red-500 text-sm font-semibold">
                  {errorMess}
                </span>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-red-500 text-white font-semibold"
                variant="flat"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                className="bg-green-500 text-black font-semibold"
                onClick={onSubmit}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
