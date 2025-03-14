import Products from "@/components/products";
import { db } from "@/server";

export default async function Home() {
  const productsWithVariants = await db.query.products.findMany({
    with: { variants: { with: { variantImages: true, variantTags: true } } },
    // orderBy: (variants, { asc }) => [asc(variants.id)],
  });
  // Use console.dir() with depth: null to fully display the nested objects:
  // console.dir(productsWithVariants, { depth: null });

  return (
    <section className="">
      <h2>Nav</h2>
      <Products productsWithVariants={productsWithVariants} />
    </section>
  );
}
