"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

export default function PhoneCarousel() {
  return (
    <div className="relative mx-auto w-full max-w-[400px] md:max-w-[500px] lg:max-w-[580px] aspect-[29/31]">
      {/* Phone Frame */}
      <Image
        src="/images/phones/phone_frame.png"
        alt="Phone Frame"
        fill
        className="z-10 object-contain"
        priority
      />

      {/* Swiper inside phone frame */}
      <div className="absolute top-[6.5%] left-[27%] h-[78%] w-[42%] z-[-1] overflow-hidden rounded-[12px] md:rounded-[20px] lg:rounded-[25px]">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="h-full w-full"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <SwiperSlide key={num}>
              <Image
                src={`/images/phones/phone${num}.jpg`}
                alt={`Screen ${num}`}
                fill
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
