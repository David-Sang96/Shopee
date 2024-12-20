"use client";

import { resetPassword } from "@/app/auth/reset/actions";
import { cn } from "@/lib/utils";
import { resetPasswordSchema } from "@/types/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { Form, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import SettingsCard from "./SettingsCard";

type ChangePasswordProps = {
  email: string;
};

const ChangePassword = ({ email }: ChangePasswordProps) => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
    },
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
        setTimeout(() => {
          signOut({ callbackUrl: "/auth/login" });
        }, 3000);
      } else if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({ email }: z.infer<typeof resetPasswordSchema>) => {
    execute({ email });
  };

  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Change Password</p>
        <Form {...form}>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className={cn(
              "bg-primary text-white",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
            aria-label="Change Password"
            size={"sm"}
          >
            <Icons.key aria-hidden="true" style={{ width: 18, height: 18 }} />
          </Button>
        </Form>
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
