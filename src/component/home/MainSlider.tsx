"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import slide3 from "@/assets/imgs/slider-image-3.jpeg";
import slide2 from "@/assets/imgs/slider-image-2.jpeg";

import slide1 from "@/assets/imgs/slider-image-1.jpeg";
import { Pagination, Autoplay } from "swiper/modules";

export default function MainSlider() {
  const images = [
    {
      path: slide1.src,
      label: "slide1",
    },
    {
      path: slide2.src,
      label: "slide2",
    },
    {
      path: slide3.src,
      label: "slide3",
    },
  ];
  const swiperOptions = {
    pagination: {
      clickable: true,
      bulletClass: "swiper-pagination-bullet !size-4 border-2",
      bulletActiveClass:
        "swiper-pagination-bullet-active !bg-red-500 border-white",
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay],
  };
  return (
    <section>
      <div>
        <div className="container mx-auto">
          <Swiper
            {...swiperOptions}
            className="main-slider"
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.path}
                  alt={image.label}
                  width={12800}
                  height={500}
                  loading="lazy"
                  className="w-full h-[21.5rem] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
