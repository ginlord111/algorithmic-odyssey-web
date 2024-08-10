"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { announcementSchema } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { JSONContent } from "@tiptap/react";
import Tiptap from "@/components/tiptap/Tiptap";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AnnouncementCard from "./AnnouncementCard";
import userInfo from "@/store/store";
import { toast } from "sonner";
import { ClassroomAnnouncement } from "@prisma/client";
import { Loader2 } from "lucide-react";
const Announcement = ({classId}:{classId:string}) => {
  const [clickAnn, setClickAnn] = useState<boolean>(false);
  const [content, setContent] = useState<JSONContent | null>(null);
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [classAnn, setClassAnn] = useState<ClassroomAnnouncement[]>([])
  const router = useRouter()
  const announcementForm = useForm<z.infer<typeof announcementSchema>>({
    resolver: zodResolver(announcementSchema),
    mode: "onChange",
    defaultValues: {
      announcement: "",
    },
  });

const params = new URLSearchParams({
  classId,
})

  const {fetchUser, user} = userInfo()
  useEffect(() => {
    fetchUser();
  }, []);


useEffect(()=> {
const fetchClassAnnouncement = async () => {
const response = await fetch(`/api/classroom/announcement?${params}`)

if(response.ok){
 const res = await response.json()
 setClassAnn(res.data)
}
else{
  return;
}
}
fetchClassAnnouncement()
},[announcementForm.formState.isSubmitted])

  async function onSubmit(values: z.infer<typeof announcementSchema>) {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    } 
    formData.append("announcement", JSON.stringify(values.announcement));
    formData.append("content", JSON.stringify(content))
    formData.append("userId", JSON.stringify(user?.id))
    formData.append("classId", JSON.stringify(classId))
    const response = await fetch("/api/classroom/announcement", {
      method:"POST",
      body:formData,
    })
    if (response && response.ok) {
      announcementForm.reset()
      setClickAnn((prev)=>prev=false)
      toast.success("Classroom posted succesfully");
      router.refresh()
    }
  }

  const handleCancel = () => {
    setClickAnn((prev) => !prev);
    setImageFile(null)

  }

  return (
    <div className="flex flex-col lg:mx-36 mx-0 mt-10 space-y-20">
      <div className="relative bg-white px-5 py-4 rounded-lg cursor-pointer shadow-md">
        {clickAnn ? (
          <Form {...announcementForm}>
            <form
              onSubmit={announcementForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={announcementForm.control}
                name="announcement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post announcement to class</FormLabel>
                    <FormControl>
                      <Tiptap
                        name={field.name}
                        onChange={field.onChange}
                        setContent={setContent}
                        setImageFile={
                          setImageFile as Dispatch<SetStateAction<File | null>>
                        }
                        imageFile={imageFile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-6 justify-end">
                <Button
                  type="button"
                  className="bg-red-500"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button className="bg-blue-500" type="submit">
                {announcementForm.formState.isLoading || announcementForm.formState.isSubmitting ? (
                <Loader2 className="w-7 h-7 animate-spin text-white" />
              ) : (
                <span>Post</span>
              )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div
            className="flex items-center"
            onClick={() => setClickAnn((prev) => !prev)}
          >
            <Avatar showFallback src={user?.userImage as string} size="md" />
            <p className="text-sm text-muted-foreground tracking-wide pl-5">
              Announce something to your class
            </p>
          </div>
        )}
      </div>

      {classAnn.map((ann: ClassroomAnnouncement) => (
        <AnnouncementCard data={ann} />
      ))}
    </div>
  );
};

export default Announcement;
