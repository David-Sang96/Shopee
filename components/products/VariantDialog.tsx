import { VariantsWithImagesAndTags } from "@/lib/InferTypes";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type VariantDialogProps = {
  children: ReactNode;
  editMode: boolean;
  productId?: number;
  variant?: VariantsWithImagesAndTags;
};

const VariantDialog = ({
  children,
  editMode,
  productId,
  variant,
}: VariantDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update" : "Create"} product variant
          </DialogTitle>
          <DialogDescription>Manage your product variants</DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VariantDialog;
