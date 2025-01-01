"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProduct } from "../create-product/actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  price: number;
  title: string;
  description: string;
  image: string;
  variants: any;
};

const ActionCells = (row: Row<Product>) => {
  const product = row.original;
  const { execute } = useAction(deleteProduct, {
    onSuccess({ data }) {
      if (data?.success) toast.success(data.success);
      if (data?.error) toast.error(data.error);
    },
  });

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer text-primary focus:text-white focus:bg-primary/80 duration-200 max-sm:text-sm">
            <Link href={`/dashboard/create-product?pid=${product.id}`}>
              Update product
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-white focus:bg-red-500 duration-200 max-sm:text-sm"
            onClick={() => execute({ id: product.id })}
          >
            Delete product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const title = row.getValue("title") as string;
      return (
        <Image
          src={image}
          alt={title}
          width={50}
          height={50}
          className="rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <Icons.arrowUpDown
          aria-hidden="true"
          style={{ width: 18, height: 18 }}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span className="font-medium ">{title}</span>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <Icons.arrowUpDown
          aria-hidden="true"
          style={{ width: 18, height: 18 }}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return ActionCells(row);
    },
  },
];
