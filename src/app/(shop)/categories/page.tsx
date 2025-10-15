// src/app/category/page.tsx
export const dynamic = "force-dynamic";

import CategorySlider from "@/component/home/CategorySlider";
import { getCategory } from "@/services/categories.service";

export default async function CategoryPage() {
  const categories = await getCategory();

  if ("error" in categories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{categories.error}</p>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Categories</h1>

        {/* Slider */}
        <CategorySlider categories={categories.data || []} />
      </div>
    </section>
  );
}
