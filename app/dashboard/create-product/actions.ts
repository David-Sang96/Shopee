import { actionClient } from "@/lib/safeAction";
import { productSchema } from "@/types/productSchema";

export const createProduct = actionClient
  .schema(productSchema)
  .action(async ({ parsedInput: { title, description, price } }) => {
    if (title) return { success: "" };
    return { error: "" };
  });
