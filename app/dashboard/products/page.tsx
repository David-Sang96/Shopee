import placeHolderImage from "@/public/placehoder.jpg";
import { db } from "@/server";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";

const ProductsPage = async () => {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  const productData = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      variants: [],
      image: placeHolderImage.src,
    };
  });

  return (
    <section className="pb-4">
      <DataTable columns={columns} data={productData} />
    </section>
  );
};

export default ProductsPage;
