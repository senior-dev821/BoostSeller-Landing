// components/Common/PhoneCarousel.tsxs
"use client"; // only if you're in app/ folder, to make sure Swiper runs on client side

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

export default function PhoneCarousel() {
  return (
    <div className="relative mx-auto h-[620px] w-[580px]">
			<Image
				src="/images/phones/phone_frame.png"
				alt="Phone Frame"
				fill
				className="z-1"
			/>
			<div className="absolute top-[2.4%] left-[27%] h-[85%] w-[42%] z-[-1] overflow-hidden rounded-[30px]">
				{/* Swiper inside phone frame */}
				<Swiper
					modules={[Autoplay]}
					slidesPerView={1}
					loop
					autoplay={{ delay: 3000, disableOnInteraction: false }}
					className="h-full w-full"
				>
					<SwiperSlide>
						<Image
							src="/images/phones/phone1.jpg"
							alt="Screen 1"
							fill
							className="object-cover"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src="/images/phones/phone2.jpg"
							alt="Screen 2"
							fill
							className="object-cover"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src="/images/phones/phone3.jpg"
							alt="Screen 3"
							fill
							className="object-cover"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src="/images/phones/phone4.jpg"
							alt="Screen 4"
							fill
							className="object-cover"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src="/images/phones/phone5.jpg"
							alt="Screen 5"
							fill
							className="object-cover"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src="/images/phones/phone6.jpg"
							alt="Screen 6"
							fill
							className="object-cover"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
  );
}
