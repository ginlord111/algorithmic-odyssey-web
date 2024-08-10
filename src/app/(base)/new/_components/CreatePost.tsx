"use client";
import Tiptap from "@/components/tiptap/Tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { postFormSchema } from "@/types/form-types";
import { JSONContent } from "@tiptap/react";
import { toast } from "sonner";
const CreatePost = () => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [content, setContent] = useState<JSONContent | null>(null)
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      caption: "DSADSA",
    },
  });
  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    const formData = new FormData();
    // / IF THERE IS NO IMAGE THEN THE CAPTION IS TEXT
    if (imageFile) {
      formData.append("image", imageFile);
    } 
      formData.append("caption", JSON.stringify(values.caption));
      formData.append("content", JSON.stringify(content))
    formData.append("title", JSON.stringify(values.title));
    const response = await fetch(`api/forum`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      router.push("/forum")
      toast.success("Post created successfully");
    }
  }
  console.log(imageFile, "image")
  return (
    <div className="h-fit mt-20">
      <MaxWidthWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your title here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Tiptap
                      name={field.name}
                      onChange={field.onChange}
                      setImageFile={setImageFile as Dispatch<SetStateAction<File | null>> }
                      setContent={setContent}
                      imageFile={imageFile}
                    />
                   
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-bold text-lg text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isLoading || form.formState.isSubmitting ? (
                <Loader2 className="w-7 h-7 animate-spin" />
              ) : (
                <span>Create Post</span>
              )}
            </Button>
          </form>
        </Form>
      </MaxWidthWrapper>
    </div>
  );
};

export default CreatePost;
