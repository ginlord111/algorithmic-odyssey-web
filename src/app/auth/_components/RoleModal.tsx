import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useRoleStore } from "@/store/store";
interface RoleModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
const RoleModal = ({ isOpen, onOpenChange, onClose }: RoleModalProps) => {
  const [role, setRole] = useState<string | "student" | "teacher">("student");
  const router = useRouter();
  const {setRoles} = useRoleStore()
  const handleSignup = async () => {
    Cookies.set("userRole", role)
    setRoles(role)
    await signIn("github", {
      params: {
        state: { role }, // State object containing the role
      },
    });
    router.push("/");
  };
  console.log(role, " ROLEEE");
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
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
              Who are you?
            </ModalHeader>
            <ModalBody>
              <RadioGroup
                label="Select type of account"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <Radio value="student">Student</Radio>
                <Radio value="teacher">Teacher</Radio>
              </RadioGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose} onClick={handleSignup}>
                Sign up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
