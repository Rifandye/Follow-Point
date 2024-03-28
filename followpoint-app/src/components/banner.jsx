"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

export default function Banner() {
  const bannerImages = ["/1.png", "/2.png", "/3.png"];

  return (
    <div className="banner flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        autoHeight={true}
      >
        {bannerImages.map((imageSrc, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={imageSrc}
                alt={`Banner ${index + 1}`}
                className="w-4/5 h-5/6 object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
