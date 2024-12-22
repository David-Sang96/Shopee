"use client";

import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { profileAvatarUpdate } from "@/app/dashboard/settings/actions";
import { avatarSchema } from "@/types/settingProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";

type AvatarUploadFormProps = {
  image: string;
  name: string;
  email: string;
};

const AvatarUploadForm = ({ image, name, email }: AvatarUploadFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof avatarSchema>>({
    resolver: zodResolver(avatarSchema),
    defaultValues: { image, email },
  });

  const { execute, status } = useAction(profileAvatarUpdate, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success);
      }
      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = ({ image, email }: z.infer<typeof avatarSchema>) => {
    execute({ image, email });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="image"
          control={form.control}
          render={(field) => (
            <FormItem className="max-lg:flex">
              <Avatar className="size-12 md:size-14 lg:mx-auto">
                {form.getValues("image") && (
                  <AvatarImage
                    src={form.getValues("image")}
                    alt="profile picture"
                    aria-label="user profile picture"
                  />
                )}
                <AvatarFallback className="bg-primary font-semibold text-white">
                  {name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <UploadButton
                className="scale-75 ut-button:bg-primary ut-label:text-red-500 ut-button:ring-primary "
                endpoint={"imageUploader"}
                onUploadBegin={() => {
                  setIsUploading(true);
                }}
                onUploadError={(error) => {
                  form.setError("image", {
                    type: "validate",
                    message: error.message,
                  });
                  setIsUploading(false);
                }}
                content={{
                  button({ ready }) {
                    if (ready) return <div>Upload Avatar</div>;
                    return <div>Uploading...</div>;
                  },
                }}
                onClientUploadComplete={(response) => {
                  form.setValue("image", response[0].url!);
                  form.handleSubmit(onSubmit)();
                  setIsUploading(false);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AvatarUploadForm;
