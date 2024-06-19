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
const noSpecialCharRegex:RegExp = /^[a-zA-Z0-9 _-]*$/; // REGEX FOR USER TO NOT PUT ANY SPEICAL CHARACTERS IN USERNAME
  export const accountDetailsFormSchema = z.object({
    username:z.optional(z.string().regex(noSpecialCharRegex, "Username cannot contain special characters").min(5, {
      message:"Username must be atleast 5 characters"
    })),
    facebook:z.optional(z.string().min(5, {
      message:"facebook Username must be atleast 5 characters"
    })),
    github:z.optional(z.string().min(5, {
      message:"Github Username must be atleast 5 characters"
    })),
    instagram:z.optional(z.string().min(5, {
      message:"Instagram Username must be atleast 5 characters"
    })),
    twitter:z.optional(z.string().min(5, {
      message:"twitter username must be atleast 5 characters"
    })),
    mobileNum:z.optional(z.number().min(5, {
      message:"twitter username must be atleast 5 characters"
    })),

  })


