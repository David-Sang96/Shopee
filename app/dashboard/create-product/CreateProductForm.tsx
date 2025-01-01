"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/types/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";

import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createOrUpdateProduct, getSingleProduct } from "./actions";
import Tiptap from "./Tiptap";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  createdAt: Date | null;
};

const CreateProductForm = () => {
  const [clearEditor, setClearEditor] = useState(false);
  const [clearEditor2, setClearEditor2] = useState(false);
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const router = useRouter();
  const productId = Number(useSearchParams().get("pid"));

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  const { execute, status } = useAction(createOrUpdateProduct, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.success);
        form.reset();
        setClearEditor2(true);
        if (!data?.isCurrentPage) router.push("/dashboard/products");
      }
      if (data?.error) {
        toast.error(data.error);
      }
      setIsCurrentPage(false);
    },
  });

  useEffect(() => {
    if (productId) {
      isProductExit(productId);
    } else {
      form.setValue("title", "");
      form.setValue("description", "");
      form.setValue("price", 0);
      form.setValue("id", 0);
      setClearEditor(true);
    }
    async function isProductExit(id: number) {
      const { success, error } = await getSingleProduct(id);
      if (error) {
        toast.error(error);
        router.push("/dashboard/products");
      }
      if (success) {
        setProduct(success);
        form.setValue("title", success.title);
        form.setValue("description", success.description);
        form.setValue("price", success.price);
        form.setValue("id", success.id);
      }
    }
  }, [productId]);

  const onSubmit = ({
    id,
    title,
    description,
    price,
  }: z.infer<typeof productSchema>) => {
    execute({ id, title, description, price, isCurrentPage });
  };

  return (
    <Card className="dark:border-gray-700">
      <CardHeader>
        <CardTitle>{productId ? "Update" : "Create"} Product</CardTitle>
        <CardDescription>
          {productId ? `Update ${product?.title} ` : "Create a new product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="title"
                      {...field}
                      disabled={status === "executing"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Tiptap
                      val={field.value}
                      clearEditor={clearEditor}
                      clearEditor2={clearEditor2}
                      setClearEditor2={setClearEditor2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Icons.moneySign
                        style={{ width: 20, height: 20 }}
                        className="bg-muted rounded-md"
                      />
                      <Input
                        placeholder="Price..."
                        {...field}
                        type="number"
                        step={100}
                        min={0}
                        disabled={status === "executing"}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!productId && (
              <div className="flex items-center gap-2 justify-end">
                <Checkbox
                  checked={isCurrentPage}
                  onCheckedChange={() => setIsCurrentPage((prev) => !prev)}
                />
                <div className="text-sm">Stay on current page</div>
              </div>
            )}
            <Button
              type="submit"
              className="w-full dark:text-white"
              disabled={status === "executing"}
            >
              {productId ? "Update" : "Create"} product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProductForm;
