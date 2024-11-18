import { z } from "zod";
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
const noSpecialCharRegex: RegExp = /^[a-zA-Z0-9 _-]*$/; // REGEX FOR USER TO NOT PUT ANY SPEICAL CHARACTERS IN USERNAME
export const commentFormSchema = z.object({
  comment: z
    .string()
    .max(100, {
      message: "Comment is maximum of 100 characters",
    })
    .min(1, {
      message: "Comment should not be blank",
    }),
});

export const postFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  caption: z.optional(z.string()),
});

export const accountDetailsFormSchema = z.object({
  username: z.optional(
    z
      .string()
      .regex(noSpecialCharRegex, "Username cannot contain special characters")
      .min(5, {
        message: "Username must be atleast 5 characters",
      })
  ),
  facebook: z.optional(
    z.string().min(5, {
      message: "facebook Username must be atleast 5 characters",
    })
  ),
  github: z.optional(
    z.string().min(5, {
      message: "Github Username must be atleast 5 characters",
    })
  ),
  instagram: z.optional(
    z.string().min(5, {
      message: "Instagram Username must be atleast 5 characters",
    })
  ),
  twitter: z.optional(
    z.string().min(5, {
      message: "twitter username must be atleast 5 characters",
    })
  ),
  mobileNum: z.optional(
    z.number().min(5, {
      message: "twitter username must be atleast 5 characters",
    })
  ),
});

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    username: z.optional(
      z
        .string()
        .regex(noSpecialCharRegex, "Username cannot contain special characters")
        .min(5, {
          message: "Username must be atleast 5 characters",
        })
    ),
    fullName: z
      .string()
      .regex(noSpecialCharRegex, "Full name cannot contain special characters")
      .min(5, {
        message: "Fullname must be atleast 5 characters",
      }),
    password: z.string().min(6, {
      message: "Password must be atleast 6 characters",
    }),
    confirmPass: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPass, {
    path: ["confirmPass"],
    message: "Passwords do not match",
  });

export const signInFormSchema = z.object({
  email: z.string().email(),
  username: z.optional(
    z
      .string()
      .regex(noSpecialCharRegex, "Username cannot contain special characters")
      .min(5, {
        message: "Username must be atleast 5 characters",
      })
  ),
  password: z.string().min(6, {
    message: "Password must be atleast 6 characters",
  }),
});

export const classroomCodeForm = z.object({
  code: z.string().min(6, {
    message: "Code must be atleast 6 character",
  }),
  fullName: z.optional(z
    .string()
    .regex(noSpecialCharRegex, "Full name cannot contain special characters")
    .min(5, {
      message: "Fullname must be atleast 5 characters",
    })),
});

export const createClassroomForm = z.object({
  classroomName: z.string().min(6, {
    message: "Classroom name must be atleast 6 characters",
  }),
  fullName: z.optional(z
    .string()
    .regex(noSpecialCharRegex, "Full name cannot contain special characters")
    .min(5, {
      message: "Fullname must be atleast 5 characters",
    })),
  sectionName: z.string(),
  classCode: z.string().min(6, {
    message: "Classroom code must be atleast 6 characters and unique",
  }),
});

export const announcementSchema = z.object({
  announcement: z.string().min(10, {
    message: "Your classroom announcement must be atleast 10 characters",
  }),
});

export const createActivitySchema = z.object({
  instruc: z.string().min(5, {
    message: "Your classroom instruction must be atleast 5 characters",
  }),
  title: z.string().min(5, {
    message: "Title must be atleast 5 characters",
  }),
  maxScore: z
    .string()
    .transform((val) => Number(val)) // Transform the string to a number
    .refine((val) => !isNaN(val), {
      message: "Max score must be a valid number",
    }),
    dueDate:z.optional(z.string()),
    time:z.optional(z.string())
});

export const searchSchema = z.object({
  search: z.string(),
});
