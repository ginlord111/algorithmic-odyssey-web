"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { createActivitySchema } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Tiptap from "@/components/tiptap/Tiptap";
import { JSONContent } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectItem } from "@nextui-org/react";
const CreateClasswork = ({
  setClickCreate,
  classId,
}: {
  setClickCreate: Dispatch<boolean>;
  classId: string;
}) => {
  const [file, setFile] = useState<File | null | undefined>(null);
  const [content, setContent] = useState<JSONContent | null>(null);
  const [actType, setActType] = useState<string>("activity")
  const { data: session } = useSession();
  const router = useRouter();
  const createActivityForm = useForm<z.infer<typeof createActivitySchema>>({
    resolver: zodResolver(createActivitySchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      instruc: "",
    },
  });

  const classworkType = [
    {
      name:"Assesment",
      value:"assesment"
    },
    {
      name:"Activity",
      value:"activity"
    }
  ]

  async function onSubmit(values: z.infer<typeof createActivitySchema>) {
    const formData = new FormData();
    // if there is any attach file
    if (file) {
      formData.append("file", file);
      formData.append("mimeType", JSON.stringify(file.type));
    }
    if(!values.dueDate && values.time){
      return createActivityForm.setError("dueDate", {
        message:"Please select a due date for the due time."
      })
      }
    if(values.dueDate){
      const dueDate = new Date(values.dueDate as string);
      if(values.time){
        const [hours, minutes]:Array<number> = values.time.split(":").map((val) => parseInt(val));  
        dueDate.setHours(hours);
        dueDate.setMinutes(minutes);
      }
      formData.append("dueDate", JSON.stringify(dueDate.toISOString()));
    }


    
    formData.append("title", JSON.stringify(values.title));
    formData.append("instruc", JSON.stringify(content));
    formData.append("id", JSON.stringify(session?.user.id));
    formData.append("classId", JSON.stringify(classId));
    formData.append("maxScore", JSON.stringify(values.maxScore));
    formData.append("actType", JSON.stringify(actType));
  
    if (values.maxScore > 100) {
      createActivityForm.setError("maxScore", {
        message: "Max score must be 100 or less",
      });
      return;
    }
    const response = await fetch(`/api/classroom/classwork`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return createActivityForm.setError("title", {
        message: "Something went wrong, Try again",
      });
    }
    router.refresh();
    toast.success("Classwork created succesfully");
    setClickCreate(false);
  }
  return (
    <div>
      <Form {...createActivityForm}>
        <form
          className="space-y-3"
          onSubmit={createActivityForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={createActivityForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
       <div className="mt-4 flex-col space-y-2">
        <p className="text-sm">Classwork type</p>
       <Select
              isRequired
              className="w-full"
              defaultSelectedKeys={["activity"]}
              value={actType}
              aria-label="Select Lang"
              onChange={(e)=>setActType(e.target.value)}
            >
              {classworkType.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.name}
                </SelectItem>
              ))}
            </Select>
       </div>
       <FormField
            control={createActivityForm.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due date (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Due date" {...field} type="date"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
                 <FormField
            control={createActivityForm.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Time (optional)" {...field} type="time"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={createActivityForm.control}
            name="maxScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max score (maxiumum is 100)</FormLabel>
                <FormControl>
                  <Input placeholder="Max score" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={createActivityForm.control}
            name="instruc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create Classwork</FormLabel>
                <FormControl>
                  <Tiptap
                    name={field.name}
                    onChange={field.onChange}
                    setContent={setContent}
                    setImageFile={
                      setFile as Dispatch<SetStateAction<File | null>>
                    }
                    imageFile={file}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end  justify-end space-x-5 mr-3">
            <Button
              className="bg-red-500"
              type="button"
              onClick={() => setClickCreate(false)}
            >
              Cancel
            </Button>
            <Button className="bg-blue-500" type="submit">
              {createActivityForm.formState.isLoading ||
              createActivityForm.formState.isSubmitting ? (
                <Loader2 className="w-7 h-7 animate-spin" />
              ) : (
                <span>Post</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateClasswork;
