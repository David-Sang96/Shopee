import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(4, { message: "Please enter at least 4 characters" }),
  description: z.string().min(30, {
    message: "Please enter at least 30 characters",
  }),
  price: z.coerce
    .number({ invalid_type_error: "Please enter a number" })
    .positive({ message: "Please enter a positive number" }),
  isCurrentPage: z.boolean().optional(),
});

export const deleteProductSchema = z.object({
  id: z.number({ message: "Id is required" }),
});
