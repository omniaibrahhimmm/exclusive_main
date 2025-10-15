"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const swiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },

  modules: [Pagination],
};
export default function ProductSwiper({ images }: { images: string[] }) {
  return (
    <>
      <Swiper
        {...swiperOptions}
        className="main-slider"
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`${image}-${index}`}
              width={500}
              height={500}
              className="rounded-2xl shadow-md w-full object-contain  mx-auto h-[38.5rem]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
