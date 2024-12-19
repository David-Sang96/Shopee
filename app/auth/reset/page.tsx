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
import { resetPasswordSchema } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { resetPassword } from "./actions";

const ResetPasswordPage = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });
  const { execute, status, result } = useAction(resetPassword, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success, {
          action: {
            label: "Open Mail",
            onClick() {
              window.open("https://mail.google.com");
            },
          },
        });
        form.reset();
      } else if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({ email }: z.infer<typeof resetPasswordSchema>) => {
    execute({ email });
  };

  return (
    <AuthForm
      formTitle="Reset your password"
      footerHref="/auth/login"
      footerLabel="Already have an account?"
      showProvider={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            className={cn(
              "w-full mt-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default ResetPasswordPage;
