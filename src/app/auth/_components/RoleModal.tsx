"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/types/types";
import { submitRole } from "@/actions/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const RoleModal = () => {
  const [role, setRole] = useState<UserRole>("student");
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  useEffect(() => {
    if (!username) {
      setUsername(searchParams.get("to") as string);
    }
  }, [username]);

  console.log(username, "username")
  const onSubmit = async () => {
    setIsLoading(true)
    const res = await submitRole(username, role);

    if (res.status === 500) {
      setIsLoading(false)
      setMessage(res.message as string);
      return;
    }
    setIsLoading(false)
    toast.success("Succesful select role");
    router.push("/");
  };
  return (
    <Modal
      backdrop="opaque"
      isOpen={true}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p> Who are you?</p>
              <span className="text-red-500 text-xs">
                Note: If you dont select a role, 'Student' will be set as the
                default
              </span>
            </ModalHeader>
            <ModalBody>
              <RadioGroup
                label="Select type of account"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              >
                <Radio value="student">Student</Radio>
                <Radio value="teacher">Teacher</Radio>
              </RadioGroup>
              <span className="text-red-500 text-sm font-semibold">
                {message}
              </span>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} onClick={onSubmit}>
              {
                isLoading ? (<Loader2 className="animate-spin w-6 h-6"/>) : (
                  "Choose"
                )
              }
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
