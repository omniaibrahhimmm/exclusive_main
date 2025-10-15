import AddToWishlistBtn from "@/component/shared/AddToWishlistBtn";
import AddtoCartBtn from "@/component/products/AddtoCartBtn";
import ProductItem from "@/component/products/ProductItem";
import ProductSwiper from "@/component/products/ProductSwiper";
import SectionTitle from "@/component/shared/SectionTitle";
import { IProduct } from "@/interface/product.interface";
import { getProductDetails, getProducts } from "@/services/product.service";
import { Stars } from "lucide-react";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
const { productId } = await params;

  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );
  const { data: products }: { data: IProduct[] } = await getProducts(
    8,
    product.category._id
  );

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ProductSwiper images={product.images} />
            </div>

            <div className="lg:col-span-1">
              <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
              <div className="flex items-center gap-x-1 mb-4">
                <Stars className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.ratingsAverage}
                </span>
              </div>
              <span className="text-2xl mb-6 block">{product.price} EGP</span>
              <p className="text-sm border-b border-b-gray-400 pb-6 mb-6">
                {product.description}
              </p>
              <div className="flex gap-5 mb-10">
                <AddtoCartBtn
                  productId={product._id}
                  className="grow cursor-pointer"
                  variant="destructive"
                />
                <AddToWishlistBtn productId={product._id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <SectionTitle title="Related Products" subTitle="Everything you want" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-32 gap-y-16 mb-16">
          {products &&
            products.map((p) => <ProductItem key={p._id} product={p} />)}
        </div>
      </section>
    </>
  );
}
