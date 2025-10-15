import { getProducts } from "@/services/product.service";
import { IProduct } from "@/interface/product.interface";

import ProductItem from "@/component/products/ProductItem";
export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts();
  console.log(products);

  return (
    <section className="pb-20  px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-32 gap-y-16 mb-16">
          {products &&
            products.map((product) => <ProductItem key={product._id} product={product} />)}
        </div>
        {/* pagination */}
      </div>
    </section>
  );
}
