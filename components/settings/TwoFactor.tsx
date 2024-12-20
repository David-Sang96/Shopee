"use client";

import { toggleTowFactorAuth } from "@/app/dashboard/settings/actions";
import { cn } from "@/lib/utils";
import { twoFactorSchema } from "@/types/settingProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Switch } from "../ui/switch";
import SettingsCard from "./SettingsCard";

type TwoFactorProps = {
  isTwoFactorEnabled: boolean;
  userId: string;
  email: string;
};

const TwoFactor = ({ isTwoFactorEnabled, userId, email }: TwoFactorProps) => {
  const form = useForm<z.infer<typeof twoFactorSchema>>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      isTwoFactorEnabled,
      userId,
      email,
    },
  });

  const { execute, status } = useAction(toggleTowFactorAuth, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({
    isTwoFactorEnabled,
    userId,
    email,
  }: z.infer<typeof twoFactorSchema>) => {
    execute({ isTwoFactorEnabled, userId, email });
  };

  return (
    <SettingsCard>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="isTwoFactorEnabled"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex justify-between items-center">
                <div className="max-sm:w-3/4">
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>
                    {isTwoFactorEnabled ? "Disable" : "Enable"} two factor
                    authentication for your account
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    defaultChecked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={status === "executing"}
                    aria-readonly
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn(
              "w-full",
              status === "executing" && "animate-pulse",
              isTwoFactorEnabled ? "bg-red-500 hover:bg-red-600" : "bg-primary"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </form>
      </Form>
    </SettingsCard>
  );
};

export default TwoFactor;
