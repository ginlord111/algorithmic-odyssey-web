"use client"
import Tiptap from '@/app/(base)/new/_components/Tiptap'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
const CreatePost = () => {
    const formSchema = z.object({
        title: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        description:z.string().min(2, {
          message:"kekw"
        })
      })
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode:"onChange",
        defaultValues: {
          title: "",
          description:"",
        },
      });
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
  return (
    <div className='h-screen relative mt-20'>  
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Caption</FormLabel>
            <FormControl>
<Tiptap  name ={field.name} onChange={field.onChange} />
            </FormControl>
            {/* <FormDescription>
              This is your public display name.
            </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit"  className='w-full font-bold text-lg text-white'>Submit</Button>
    </form>
  </Form>
  </MaxWidthWrapper>
  </div>
  )
}

export default CreatePost