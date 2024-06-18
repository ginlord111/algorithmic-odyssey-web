"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
const AccountDetails = () => {
  // TODO: CREATE A REGEX OR PATTERN THAT USER FORBIDDEN TO USE ANY SPECIAL CHARACTERS IN CHANGING USERNNAME TO PRESERBVE THE PARAMS
  const [edit, setEdit] = useState<boolean>(false);
  const { fetchUser, user } = userInfo();
  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, []);
  const accountDetailsForm = useForm<z.infer<typeof accountDetailsFormSchema>>({
    resolver: zodResolver(accountDetailsFormSchema),
    mode: "onSubmit",
  });
  async function onSubmit(data: z.infer<typeof accountDetailsFormSchema>) {
    const response = await fetch("/api/profile/edit/", {
      method: "POST",
      body: JSON.stringify({ data, userId: user?.id }),
    });
    if (response.ok) {
      router.refresh();
      router.push("/");
      toast.success("Edit profile successfully");
    }
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
                  <Input
                    placeholder="Username"
                    {...field}
                    defaultValue={user?.username as string}
                    disabled={!edit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Facebook"
                    {...field}
                    defaultValue={user?.facebook as string}
                    disabled={!edit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="X (Twitter)"
                    {...field}
                    defaultValue={user?.twitter as string}
                    disabled={!edit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Github"
                    {...field}
                    defaultValue={user?.github as string}
                    disabled={!edit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={accountDetailsForm.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Instagram"
                    {...field}
                    defaultValue={user?.instagram as string}
                    disabled={!edit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={accountDetailsForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="Mobile number" {...field} 
                  disabled={!edit}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="col-span-2 ml-auto flex">
            <Button
              className={`transition w-16 rounded-full px-10 text-white ${
                edit
                  ? "bg-red-600 hover:!bg-red-600 "
                  : "bg-blue-600 hover:!bg-blue-600 "
              }`}
              type="button"
              onClick={() =>
                setEdit((prev) => (prev ? (prev = false) : (prev = true)))
              }
            >
              {edit ? "Cancel" : "Edit"}
            </Button>
            {edit && (
              <Button
                className="transition w-16 rounded-full  text-white bg-blue-600 hover:!bg-blue-600 ml-3 "
                type="submit"
              >
                {accountDetailsForm.formState.isLoading ||
                accountDetailsForm.formState.isSubmitting ? (
                  <Loader2 className="w-fit animate-spin" />
                ) : (
                  <span>Save</span>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AccountDetails;
