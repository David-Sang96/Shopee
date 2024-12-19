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
import { changePasswordSchema } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { changePassword } from "./actions";

const ChangePasswordPage = () => {
  const resetToken = useSearchParams().get("token");
  const router = useRouter();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
    },
  });

  const { execute, status, result } = useAction(changePassword, {
    onSuccess({ data }) {
      if (data?.success) {
        form.reset();
        router.push("/auth/login");
        toast.success(data.success);
      } else if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({
    password,
    confirmPassword,
  }: z.infer<typeof changePasswordSchema>) => {
    execute({
      password,
      confirmPassword,
      token: String(resetToken),
    });
  };

  return (
    <AuthForm
      formTitle="Update Password"
      footerHref="/auth/login"
      footerLabel="Already have an account?"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
                    {...field}
                    type="password"
                    disabled={status === "executing"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*******"
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
            className={cn(
              "w-full mt-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Change Password
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default ChangePasswordPage;
