"use client";
import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@nextui-org/react";
import { z } from "zod";
import { commentFormSchema } from "@/types/form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ForumComment } from "@prisma/client";
import CommentsList from "./CommentsList";
import { Loader2 } from "lucide-react";
const CommentsContainer = ({ forumId }: { forumId: string }) => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [hideComment, setHideComment] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });
  const handleCancelComment = () => {
    setShowBtn((prev) => (prev = false));
    form.reset();
  };

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    try {
      const { comment } = values;
      await fetch("/api/forum/comment", {
        method: "POST",
        body: JSON.stringify({ comment, forumId }),
      });
      queryClient.invalidateQueries({ queryKey: ["forum-comment"] });
      setShowBtn((prev) => (prev = false));
      form.reset();
      // TODO: CONSIDRING INSTALL ZUSTAND TO MANAGE THE COUNT COMMENTS HERE
    } catch (error) {
      console.log(error);
    }
  }

  const revalidateComments = async () => {
    const params = new URLSearchParams({
      forumId: forumId,
    });
    const data = await fetch(`/api/forum/comment?${params}`);
    const response = await data.json();
    const { comments } = response;
    return comments;
  };

  const {
    data: forumComment,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["forum-comment"],
    queryFn: revalidateComments,
  });
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 relative pt-5 lg:mx-[200px] md:mx-[100px] mx-0 max-w-xl overflow-hidden w-full"
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
                      type="textarea"
                      {...field}
                      className="hover:bg-transparent !border-transparent focus:!outline-none  focus:underline-offset-0 hover:!border-none"
                      variant="flat"
                      onClick={() => setShowBtn((prev) => (prev = true))}
                    />
                    {showBtn && (
                      <div className="flex  gap-4 items-end w-full justify-end ">
                        <Button
                          className=" w-16 rounded-full "
                          variant="default"
                          onClick={handleCancelComment}
                        >
                          Cancel
                        </Button>
                        <Button className=" w-16  bg-blue-600 hover:!bg-blue-600 rounded-full px-10">
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
          <div className="flex items-end justify-end h-fit">
            <Button
              variant="link"
              className="h-fit text-sm w-fit underline"
              type="button"
              onClick={() => setHideComment((prev) => !prev)}
            >
              {hideComment ? (
                <span>Show comments</span>
              ) : (
                <span>Hide comments</span>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {forumComment ? (
        forumComment.length > 0 &&
        forumComment.map((comment: ForumComment) => (
          <Fragment key={comment.id}>
            <CommentsList {...comment} hideComment={hideComment} />
          </Fragment>
        ))
      ) : (
        <Loader2 className="h-10 w-full animate-spin flex items-center justify-center mt-5 " />
      )}
      {isFetching ||
        isLoading ||
        (isRefetching && (
          <Loader2 className="h-10 w-full animate-spin flex items-center justify-center mt-5 " />
        ))}
    </div>
  );
};

export default CommentsContainer;
