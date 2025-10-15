import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { getProducts } from "@/services/product.service";
import { IProduct } from "@/interface/product.interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductItem from "../products/ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);
  console.log(products);

  return (
    <section className="pb-20  px-4">
      <div className="container mx-auto">
        <SectionTitle title={"products"} subTitle={"browse by products"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-32 gap-y-16 mb-16">
          {products &&
            products.map((product) => (
            <ProductItem  key={product._id} product={product}/>
            ))}
        </div>
        <div className="flex justify-center">
          <Button variant={"destructive"} asChild>
            <Link href={"/products"}> View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
