import { z } from "zod";

export const commentFormSchema = z.object({
    comment: z.string().max(100, {
      message: "Comment is maximum of 100 characters",
    }).min(1, {
      message: "Comment should not be blank",
    }),
  })

  
  export const postFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    caption: z.optional(z.string()),
  });


  export const accountDetailsFormSchema = z.object({
    username:z.string().min(5, {
      message:"Username must be atleast 5 characters"
    }),

  })


