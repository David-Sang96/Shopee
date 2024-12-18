"use client";

import AuthForm from "@/components/auth/AuthForm";
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
import { loginSchema } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login } from "./actions";

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { execute, status, result } = useAction(login);

  const onSubmit = ({ email, password }: z.infer<typeof loginSchema>) => {
    execute({ email, password });
  };

  return (
    <AuthForm
      formTitle="Login to your account"
      footerHref="/auth/register"
      footerLabel="Don't have an account?"
      showProvider
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
                  <Input placeholder="example@gmail.com..." {...field} />
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
                  <Input placeholder="********" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/auth"}
            className="text-sm mt-2 inline-block hover:underline hover:text-green-600 hover:underline-offset-2 duration-300"
          >
            Forgot Password?
          </Link>
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
