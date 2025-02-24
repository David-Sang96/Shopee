import { UploadDropzone } from "@/app/api/uploadthing/uploadthing";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { removeImageOnUploadThing } from "@/server/actions/product-actions";
import { variantSchema } from "@/utils/schema-types/variant-schema-type";
import { X } from "lucide-react";
import Image from "next/image";
import { MouseEvent } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const VariantImages = () => {
  const { control, getValues, setError } =
    useFormContext<z.infer<typeof variantSchema>>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "variantImages",
  });

  const handleRemoveImage = async (
    e: MouseEvent<SVGSVGElement>,
    key: string,
    idx: number
  ) => {
    e.preventDefault();
    const { success, error } = await removeImageOnUploadThing(key);
    if (success) {
      toast.success(success);
      remove(idx);
    }
    if (error) toast.error(error);
  };

  return (
    <>
      <FormField
        control={control}
        name="variantImages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Image</FormLabel>
            <FormDescription>You can upload up to 10 images.</FormDescription>
            <FormControl>
              <UploadDropzone
                endpoint={"variantImageUploader"}
                className="ut-button:bg-primary ut-button:text-sm h-52 ut-allowed-content:text-primary ut-label:text-primary ut-upload-icon:text-primary/70 cursor-pointer"
                onBeforeUploadBegin={(files) => {
                  files.forEach((file) => {
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    });
                  });
                  return files;
                }}
                onUploadError={(err) => {
                  setError("variantImages", {
                    type: "validate",
                    message: err.message,
                  });
                }}
                onClientUploadComplete={(uploadedData) => {
                  const variantImages = getValues("variantImages");
                  variantImages.forEach((variantImage, idx) => {
                    if (variantImage.url.startsWith("blob:")) {
                      const uploadedImage = uploadedData.find(
                        (image) => image.name === variantImage.name
                      );
                      if (uploadedImage) {
                        update(idx, {
                          ...variantImage,
                          url: uploadedImage.url,
                          key: uploadedImage.key,
                        });
                      }
                    }
                  });
                }}
                config={{ mode: "auto" }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-1 flex-wrap ">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className={cn(
              "border border-primary p-1 rounded-sm relative",
              field.url.startsWith("blob:") && "animate-pulse"
            )}
          >
            <X
              className="size-[0.9rem] cursor-pointer bg-red-600 text-white rounded-sm absolute top-0 right-0"
              onClick={(e) => handleRemoveImage(e, field.key!, idx)}
            />
            <Image
              src={field.url}
              width={70}
              height={70}
              alt={field.name}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VariantImages;
