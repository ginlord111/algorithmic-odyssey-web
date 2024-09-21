"use client";
import React, { Key, useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getUserCode, verifyEmail } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const OTPComponent = () => {
  const [selected, setSelected] = useState<"login" | Key>("otp");
  const [value, setValue] = useState<string | null>(null);
  const [emailCode, setEmailCode] = useState("");
  const [message ,setMessage] = useState<string>("")
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const getUserCodeFn = async () => {
      const email = searchParams.get("to");
      const userCode = await getUserCode(email as string);

      setEmailCode(userCode as string);
    };

    getUserCodeFn();
  }, [session?.user.id, emailCode, setEmailCode, searchParams]);

  useEffect(() => {
  
    if (value?.length ===6 && value !== emailCode) {
      setMessage("Invalid code, try again");
      return;
    }
    if (value === emailCode) {
      const userVerifyFn = async () => {
        const email = searchParams.get("to");
        /// REDIRECT IT TO THE SIGN IN
        const isVerify = await verifyEmail(email as string);
        if (isVerify) {
          router.push("/auth");
          toast.success("Sign up succesfully, Now login your account");
        }
        else{
          return;
        }
      };

      userVerifyFn();
    }
   
  }, [value]);

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
                <Card className="max-w-full w-[540px] h-[400px] ">
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
                      <Tab
                        key="otp"
                        title="OTP"
                        className="flex items-center flex-col w-full h-full"
                      >
                        <span className="text-muted-foreground font-semibold pb-[90px] mt-10 ">
                          We send OTP to your email
                        </span>
                        <InputOTP
                          maxLength={6}
                          value={value as string}
                          onChange={(value) => setValue(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="w-[70px] h-[60px]"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-[70px] h-[60px]"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-[70px] h-[60px]"
                            />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={3}
                              className="w-[70px] h-[60px]"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-[70px] h-[60px]"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-[70px] h-[60px]"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      <span className="text-red-500 font-semibold mt-5">{message}</span>
                      </Tab>
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

export default OTPComponent;
