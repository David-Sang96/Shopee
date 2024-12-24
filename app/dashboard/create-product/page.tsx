import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import CreateProductForm from "./CreateProductForm";

const CreateProductPage = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  return <CreateProductForm />;
};

export default CreateProductPage;
