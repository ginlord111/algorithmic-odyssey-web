"use client";
import React, { Key, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import SignInTab from "./_components/sign-in";
import SignUpTab from "./_components/sign-up";
const AuthPage = () => {
  const [selected, setSelected] = useState<"login" | Key>("sign-in" || "sign-up" ||"otp");
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center ">
      <Modal
        defaultOpen
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton
        size="2xl"
      >
        <ModalContent className="flex justify-center items-center p-2 py-8 overflow-auto">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <Card className="max-w-full lg:w-[540px] lg:h-[700px] md:w-[440px] md:h-[600px] w-[340px] h-[500px] ">
                  <CardBody className="overflow-hidden w-full ">
                    <Tabs
                      size="md"
                      aria-label="Tabs form"
                      selectedKey={selected as string}
                      onSelectionChange={(key) => setSelected(key)}
                      fullWidth
                      color="warning"
                      variant="bordered"
                    >
                      <Tab key="sign-in" title="Sign in">
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
