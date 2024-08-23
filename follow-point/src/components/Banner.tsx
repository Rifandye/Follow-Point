"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

export default function Banner() {
  const bannerImages = ["/banner1.png", "/banner2.png", "/banner3.png"];
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        autoHeight={true}
        pagination={{ clickable: true }}
      >
        {bannerImages.map((imageSrc, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <Image
                src={imageSrc}
                alt="Banner"
                width={1000}
                height={1000}
                quality={100}
                style={{ objectFit: "contain" }}
              ></Image>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
