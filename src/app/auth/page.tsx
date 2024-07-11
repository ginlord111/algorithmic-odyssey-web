"use client";
import React, { Key, useState } from "react";
import { signUpFormSchema } from "@/types/form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { z } from "zod";
import SignInTab from "./_components/sign-in";
import SignUpTab from "./_components/sign-up";
import OTPComponent from "../otp/_components/otp";
const AuthPage = () => {
  const [selected, setSelected] = useState<"login" | Key>("login" || "sign-up" ||"otp");
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    console.log(data, "DATAAA");
  }
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Modal
        defaultOpen
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
        size="2xl"
      >
        <ModalContent className="flex justify-center items-center p-2 py-8 ">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <Card className="max-w-full w-[540px] h-[700px] ">
                  <CardBody className="overflow-auto w-full ">
                    <Tabs
                      fullWidth-
                      size="md"
                      aria-label="Tabs form"
                      selectedKey={selected as string}
                      onSelectionChange={(key) => setSelected(key)}
                      fullWidth
                      color="warning"
                      variant="bordered"
                    >
                      <Tab key="Sign in" title={"Sign in"}>
                      <SignInTab setSelected={setSelected} />
                    </Tab>

                 
                    <Tab key="sign-up" title="Sign up">
                     <SignUpTab
                      setSelected={setSelected} />
                    </Tab>
                
                  


                      {/* OTP */}
                 
                    </Tabs>
                  </CardBody>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AuthPage;
