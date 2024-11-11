import React, { useState } from "react";
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
import {  Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { UserRole } from "@/types/types";
import { generateToken } from "@/utils/tokenGenerator";
import Image from "next/image";
interface signUpError {
  emailError: string;
  usernameError: string;
}
const SignUpTab = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<Key>>;
}) => {
  const [role, setRole] = useState<UserRole>("student");
  const router = useRouter();
  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
  });
  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    const { email, password, username,fullName } = data;
    const token = generateToken();
    await fetch("api/email", {
      method: "POST",
      body: JSON.stringify({ email, username, token }),
    });
    const res = await fetch("api/sign-up", {
      method: "POST",
      body: JSON.stringify({ email, password, username, role, token,fullName }),
    });
    /// SEND VERIFICATION CODE HERE
    if (!res.ok && res.status === 409) {
      const error: signUpError = await res.json();
      if (error.emailError) {
        signUpForm.setError("email", {
          message: error.emailError,
        });
      } else if (error.usernameError) {
        signUpForm.setError("username", {
          message: error.usernameError,
        });
      }
    } else {
      router.replace(`/otp?to=${email}`);
    }
  }
  const handleSignUpGithub = async () => {
    await signIn("github");
  };
  const handleSignUpGoogle = async () => {
    await signIn("google");
  };
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
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <p className="text-xs "><span className="text-red-400 font-semibold">Note: </span>This will display in classroom</p>
              <FormControl>
                <Input placeholder="Full name" {...field} />
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
        <RadioGroup
          label="Select type of account"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        >
          <Radio value="student">Student</Radio>
          <Radio value="teacher">Teacher</Radio>
        </RadioGroup>
        <Button type="submit" className="w-full bg-[#003459]">
          {signUpForm.formState.isLoading ||
          signUpForm.formState.isSubmitting ? (
            <Loader2 className="w-7 h-7 animate-spin" />
          ) : (
            <span>Sign up</span>
          )}
        </Button>
        <div className="flex flex-col items-center justify-center mt-4 space-y-3 pb-2">
          <span className="text-sm text-muted-foreground font-bold">
            Or sign up with
          </span>
          <Button onClick={handleSignUpGithub} className="px-10 space-x-2" variant={"secondary"} type="button" >
          <span>Github</span>  <Image src="/github-icon.png"  alt="Github icon" width={40} height={40} />
          </Button>

          <Button className="px-10 flex space-x-2" type="button" variant={'secondary'} onClick={handleSignUpGoogle}>
           <span>Google</span> <Image src="/google-icon.png"  alt="Google icon" width={25} height={25} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpTab;
