import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Link } from "@nextui-org/react";
import {  ArrowLeft, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Key, SetStateAction, Dispatch } from "react";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/types/form-types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
const SignInTab = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<Key>>;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    const { email, password } = data;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res && !res.ok) {
      signInForm.setError("email", {
        message: res.error as string,
      });
      signInForm.setError("email", {
        message: res.error as string,
      });
    } else {
      router.push("/");
      toast.success("Login succesfully");
    }
  }

  const handleSignInGithub = async () => {
    await signIn("github", {
      callbackUrl: "/",
    });
  };
  const handleSignUpGoogle = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };
  return (
    <Form {...signInForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={signInForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={signInForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-center text-small">
          Need to create an account?{" "}
          <Link
            size="sm"
            className="cursor-pointer hover:underline ml-1"
            onPress={() => setSelected("sign-up")}
          >
            Sign up
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button className="w-full bg-[#003459]"   type="submit">
            {signInForm.formState.isLoading ||
            signInForm.formState.isSubmitting ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <span>Sign in</span>
            )}
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center space-y-3">
        <span className="text-muted-foreground text-sm font-semibold mt-8">
          Or sign in with
        </span>
        <Button onClick={handleSignInGithub} className="px-10 space-x-2" variant={"secondary"} type="button" >
          <span>Github</span>  <Image src="/github-icon.png"  alt="Github icon" width={40} height={40} />
          </Button>

          <Button className="px-10 flex space-x-2" type="button" variant={'secondary'} onClick={handleSignUpGoogle}>
           <span>Google</span> <Image src="/google-icon.png"  alt="Google icon" width={25} height={25} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 -ml-4 text-muted-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
      </div>
    </Form>
  );
};

export default SignInTab;
