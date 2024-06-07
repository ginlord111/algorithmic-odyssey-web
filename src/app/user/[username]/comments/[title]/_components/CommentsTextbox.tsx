"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input} from "@nextui-org/react";
import { z } from "zod";
import { commentFormSchema } from "@/types/form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const CommentsTextbox = () => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  async function onSubmit(values: z.infer<typeof commentFormSchema>) {}
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });
  const handleCancelComment = () => {
  setShowBtn((prev) => prev=false)
 form.reset()
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 relative pt-5 md:mx-[200px] mx-0"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col relative border-1 border-gray-500 rounded-3xl p-1">
                  <Input
                    placeholder="Add a comment"
                    {...field}
                    className="hover:bg-transparent !border-transparent focus:!outline-none  focus:underline-offset-0 hover:!border-none"
                    variant="flat"
                    onClick={() => setShowBtn((prev) => prev=true)}
                  />
                  {showBtn && (
                    <div className="flex  gap-4 items-end w-full justify-end ">
                      <Button className=" w-20 rounded-full " variant="default"onClick={handleCancelComment}>
                        Cancel
                      </Button>
                      <Button className=" w-20  bg-blue-600 hover:!bg-blue-600 rounded-full">
                        Comment
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
};

export default CommentsTextbox;
