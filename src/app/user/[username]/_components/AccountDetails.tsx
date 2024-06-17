"use client";
import React, { useEffect, useMemo } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { accountDetailsFormSchema } from "@/types/form-types";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import userInfo from "@/app/hooks/getUserInfo";
const AccountDetails = () => {
  const {fetchUser, user} = userInfo()
  useEffect(()=>{
    fetchUser()
  },[])

  const accountDetailsForm = useForm<z.infer<typeof accountDetailsFormSchema>>({
    resolver: zodResolver(accountDetailsFormSchema),
    mode: "onChange",
    defaultValues: {
      username: user?.username as string,
    },
  });
  async function onSubmit(values: z.infer<typeof accountDetailsFormSchema>) {
    const formData = new FormData();
  }
  return (
    <div className="mt-10 lg:pl-[200px] pl-0">
      <Form {...accountDetailsForm}>
        <form
          onSubmit={accountDetailsForm.handleSubmit(onSubmit)}
          className="lg:grid lg:grid-cols-2 gap-5 cursor-pointer flex flex-col  justify-center lg:justify-start"
        >
          <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} defaultValue={user?.username as string}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter)</FormLabel>
                <FormControl>
                  <Input placeholder="X (Twitter)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input placeholder="Github" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <div className="col-span-2 ml-auto">
            <Button className=" w-16  bg-blue-600 hover:!bg-blue-600 rounded-full px-10 text-white">
                Edit
            </Button>
            </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountDetails;
