"use client";
import React, { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { classroomCodeForm } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/react";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { joinClassroomModal } from "@/store/store";
const JoinClassroomModal = ({
  user,
}: {
  user:User | null,
}) => {
  const router= useRouter();
  const {isOpen,onClose} = joinClassroomModal()
  const form = useForm<z.infer<typeof classroomCodeForm>>({
    resolver: zodResolver(classroomCodeForm),
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof classroomCodeForm>) => {
    const {code} = data;
    const {id} = user || {};
    const res = await fetch("api/classroom" , {
      method:"PATCH",
      body:JSON.stringify({code,id})
    });

    const response = await res.json()
    if(res && !res.ok){
      return form.setError("code", {
        message:response.error
      })
    }

    toast.success(response.message as string);
    onClose();
    router.refresh();


  }
  console.log(isOpen, "ISOEN")

  return (
    <Modal  isOpen={isOpen}
    hideCloseButton
    >
      <ModalContent className="flex ">
        { ()=> (
          <>
            <ModalBody className="p-10">
              <Form {...form}>
                <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter your classroom code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter classroom code"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 <div className="flex justify-end gap-2">
                 <Button color="danger"  onClick={onClose}>Close</Button>
                 <Button type="submit" color="primary">Enter code</Button>
                 </div>
                </form>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default JoinClassroomModal;
