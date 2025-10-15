"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { ICategory } from "@/interface/category.interface";

const swiperOptions = {
  spaceBetween: 0,
  slidesPerView: 1,
  breakpoints: {
    640: { spaceBetween: 5, slidesPerView: 2 },
    768: { spaceBetween: 10, slidesPerView: 3 },
    1200: { spaceBetween: 15, slidesPerView: 4 },
    1600: { spaceBetween: 20, slidesPerView: 6 }, // عدلتها من 30 → 6
  },
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },

  modules: [Pagination],
};

export default function CategorySlider({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <Swiper
      {...swiperOptions}
      className="category-slider mb-20"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {categories &&
        categories.map((category) => (
          <SwiperSlide key={category._id} className="mb-15">
            <Image
              src={category.image}
              alt={category.name}
              width={270}
              height={500}
              loading="lazy"
              className="w-full h-[15.625rem] object-contain bg-gray-100 mb-4"
            />
            <h3 className="font-medium">{category.name}</h3>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
