"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginAction } from "@/server/actions/auth-actions";
import { loginSchema } from "@/utils/auth-schema-type";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, result, status } = useAction(loginAction);

  const onSubmit = ({ email, password }: z.infer<typeof loginSchema>) => {
    execute({ email, password });
  };

  return (
    <AuthForm
      formTitle="Login to your account"
      showProvider
      footerLabel="Don't have an account?"
      footerHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    className="text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    {...field}
                    className="text-sm"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" text-end text-[#884DEE] hover:underline hover:underline-offset-4 text-sm">
            <Link href={"/auth/forget-password"}>Forget password?</Link>
          </div>

          <Button
            type="submit"
            className={cn("w-full", status === "executing" && "animate-pulse")}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default LoginPage;
