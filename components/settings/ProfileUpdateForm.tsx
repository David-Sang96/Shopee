import { updateProfileName } from "@/app/dashboard/settings/actions";
import { cn } from "@/lib/utils";
import { settingProfileSchema } from "@/types/settingProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type ProfileUpdateFormProps = {
  name: string;
  email: string;
  setOpen: (val: boolean) => void;
  open: boolean;
};

const ProfileUpdateForm = ({
  name,
  email,
  setOpen,
  open,
}: ProfileUpdateFormProps) => {
  const form = useForm<z.infer<typeof settingProfileSchema>>({
    resolver: zodResolver(settingProfileSchema),
    defaultValues: {
      name,
      email,
    },
  });
  const { execute, status, result } = useAction(updateProfileName, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success);
        setOpen(!open);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({ name, email }: z.infer<typeof settingProfileSchema>) => {
    execute({ name, email });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 px-4 md:px-0"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-right">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="JohnDoe.."
                  {...field}
                  className="col-span-2"
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
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default ProfileUpdateForm;
