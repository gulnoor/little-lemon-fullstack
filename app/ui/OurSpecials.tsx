"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const OurSpecials = ({ items }) => {
  return (
    <section>
      <h1>Our Specials</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {items.map((item) => (
          <SwiperSlide key={item.name}>
            <h1>{item.name}</h1>
            <Image width={200} height={200} src={item.image} alt={item.name} />
            <p>{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default OurSpecials;
