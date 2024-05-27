"use client";
import Tiptap from "@/app/(base)/new/_components/Tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
const CreatePost = () => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    caption: z.optional(z.string()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      caption: "DSADSA",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    // formData.append("upload_preset","qyqo8wev")
    if (imageFile && values.caption === "") {
      formData.append("image", imageFile);
    } else {
      formData.append("caption", JSON.stringify(values.caption));
    }
    formData.append("title", JSON.stringify(values.title));
    fetch(`api/forum`, {
      method: "POST",
      body: formData,
    }).then((data) => {
      console.log(data, "DATAAA");
      if (data.ok) {
        router.push("/forum");
      }
    });
  }
  return (
    <div className="h-screen relative mt-20">
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
                  {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
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
                      setImageFile={setImageFile}
                    />
                  </FormControl>
                  {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-bold text-lg text-white"
              disabled={form.formState.isLoading }
            >
              {" "}
              {form.formState.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
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
