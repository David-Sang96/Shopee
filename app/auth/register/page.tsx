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
import { registerSchema } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerUser } from "./actions";

const RegisterPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(registerUser, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Mail",
            onClick() {
              window.open("https://mail.google.com");
            },
          },
        });
        form.reset();
        router.push("/auth/login");
      } else if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({
    email,
    password,
    name,
  }: z.infer<typeof registerSchema>) => {
    execute({ name, email, password });
  };

  return (
    <AuthForm
      formTitle="Register account"
      footerHref="/auth/login"
      footerLabel="Already have an account?"
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Joshua"
                    {...field}
                    disabled={status === "executing"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com..."
                    {...field}
                    disabled={status === "executing"}
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
                    placeholder="********"
                    {...field}
                    type="password"
                    disabled={status === "executing"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn("w-full", status === "executing" && "animate-pulse")}
            disabled={status === "executing"}
          >
            Register
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default RegisterPage;
