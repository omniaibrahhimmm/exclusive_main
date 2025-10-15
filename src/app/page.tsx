import CategorySection from "@/component/home/CategorySection";
import MainSlider from "@/component/home/MainSlider";
import ProductsSection from "@/component/home/ProductsSection";
import { GridSkiliton } from "@/component/shared/GridSkiliton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainSlider />
      <Suspense fallback={<GridSkiliton />}>
        <CategorySection />
      </Suspense>

      <Suspense fallback={<GridSkiliton />}>
        <ProductsSection />
      </Suspense>
    </>
  );
}
