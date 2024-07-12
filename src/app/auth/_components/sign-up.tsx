import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpFormSchema } from "@/types/form-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { Github, Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
interface signUpError{
  emailError:string;
  usernameError:string;
}
const SignUpTab = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<Key>>;
}) => {
  const router = useRouter();
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
  });
  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    const { email, password, username } = data;

    /// SEND VERIFICATION CODE HERE
    const res = await fetch("api/sign-up", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    });
    if (!res.ok && res.status === 409) {
      const error:signUpError = await res.json();
      if (error.emailError) {
        signUpForm.setError("email", {
          message: error.emailError,
        });
      }
     else if(error.usernameError){
      signUpForm.setError("username", {
        message: error.usernameError,
      });
     }
    } else {
      router.replace(`/otp?to=${email}`);
    }
  }
  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="confirmPass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {" "}
          {signUpForm.formState.isLoading ||
          signUpForm.formState.isSubmitting ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <span>Sign up</span>
          )}
        </Button>
      </form>
      <div className="flex flex-col items-center justify-center mt-7 space-y-3">
        <span className="text-sm text-muted-foreground font-bold">
          Or sign up with
        </span>
        <Button
          onClick={async () => {
            await signIn("github");
            router.push("/");
          }}
          className="px-10"
          variant="secondary"
          type="button"
        >
          <Github className="w-6 h-6" />
        </Button>

        <Button className="px-10" variant="secondary" type="button">
          <Mail />
        </Button>
      </div>
    </Form>
  );
};

export default SignUpTab;
