"use server";

import { actionClient } from "@/lib/safeAction";
import { db } from "@/server";
import { products } from "@/server/schema";
import { deleteProductSchema, productSchema } from "@/types/productSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createOrUpdateProduct = actionClient
  .schema(productSchema)
  .action(
    async ({
      parsedInput: { id, title, description, price, isCurrentPage },
    }) => {
      try {
        if (id) {
          const isProductExisted = await db.query.products.findFirst({
            where: eq(products.id, id),
          });

          if (!isProductExisted) return { error: "Product not found" };
          const updatedProduct = await db
            .update(products)
            .set({ title, description, price })
            .where(eq(products.id, isProductExisted.id))
            .returning();

          revalidatePath("/dashboard/products");
          return {
            success: `${updatedProduct[0].title} updated successfully`,
            isCurrentPage,
          };
        } else {
          const newProduct = await db
            .insert(products)
            .values({ title, description, price })
            .returning();
          revalidatePath("/dashboard/products");
          return {
            success: `${newProduct[0].title} created successfully`,
            isCurrentPage,
          };
        }
      } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
      }
    }
  );

export const getSingleProduct = async (id: number) => {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    });
    if (!product) return { error: "Product not found" };
    return { success: product };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      const product = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      revalidatePath("/dashboard/products");
      return { success: `${product[0].title} delete successfully` };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  });
