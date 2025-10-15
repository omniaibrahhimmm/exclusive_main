import { ICategory } from "@/interface/category.interface";
import { getCategory } from "@/services/categories.service";
import React from "react";
import CategorySlider from "./CategorySlider";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@/components/ui/separator";

export default async function CategorySection() {
  const { data: categories }: { data: ICategory[] } = await getCategory();
  return (
    <section className="pb-20  px-4">
      <div className="container mx-auto">
        <SectionTitle title={"categories"} subTitle={"browse by category"} />
        <CategorySlider categories={categories} />
        <Separator />
      </div>
    </section>
  );
}
