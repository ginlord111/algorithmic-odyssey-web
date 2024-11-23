"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClassroomForm } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@nextui-org/react";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClassroomModal } from "@/store/store";
const CreateClassroomModal = ({
  user,
}: {
  user: User | null;
}) => {
  const {isOpen,onClose} = createClassroomModal()
  const { refresh } = useRouter();
  const form = useForm<z.infer<typeof createClassroomForm>>({
    resolver: zodResolver(createClassroomForm),
    mode: "onSubmit",
  });
  const onSubmit = async (data: z.infer<typeof createClassroomForm>) => {
    console.log("KEKWWWW")
    try {
      const { classroomName, sectionName, classCode,fullName } = data;
      const { id } = user || {};
      const res = await fetch("api/classroom", {
        method: "POST",
        body: JSON.stringify({ classroomName, sectionName
          , classCode, id,fullName }),
      });
      const response = await res.json()
      if (res.ok) {
        toast.success("Succesful created classroom");
        onClose()
        refresh();
      }
      else{
        form.setError("classCode", {
          message: response.error as string,
        });
      }
    } catch (error) {
      form.setError("classCode", {
        message: error as string,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} hideCloseButton>
      <ModalContent className="flex ">
        {() => (
          <>
            <ModalBody className="p-10">
              <h1 className="text-lg font-bold">Create Classroom</h1>
              <Form {...form}>
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {user && !user.fullName && (
                     <FormField
                     control={form.control}
                     name="fullName"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel>Full name</FormLabel>
                         <FormControl>
                           <Input
                             placeholder="Your full name"
                             {...field}
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                  )}

                  <FormField
                    control={form.control}
                    name="classroomName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Subject name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sectionName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter section name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="classCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classroom code</FormLabel>
                        <span className="text-xs text-red-400 tracking-wide block pb-2">
                          Note:classroom code must be unique
                        </span>
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
                    <Button
                      color="danger"
                      onClick={() =>
                        onClose()
                      }
                    >
                      Close
                    </Button>
                    <Button color="primary"
                    type="submit"
                    >
                      {form.formState.isLoading ||
                      form.formState.isSubmitting ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : (
                        <span>Create Classroom </span>
                  
                      )}
                    </Button>
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

export default CreateClassroomModal;
