"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/element/css/effect-coverflow";
register();

export const OurSpecials = ({ items }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  return (
    <>
      <h1 className="ml-10">Our Specials</h1>
      <swiper-container
        class="flex rounded-3xl  m-10 p-6 h-[500px]"
        ref={swiperElRef}
        slides-per-view="3"
        navigation="true"
        pagination="true"
        space-between="16"
      >
        {items.map((item) => (
          <swiper-slide
            class=" overflow-hidden rounded-2xl p-6 flex flex-col justify-center items-center bg-[var(--md-sys-color-tertiary-container)]"
            key={item.name}
          >
            <h2 className="h-2/4 text-center tex align-baseline text-[var(--md-sys-color-on-tertiary-container)]">
              {item.name}
            </h2>
            <Image
              style={{
                height: "60%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
              width={300}
              height={0}
              src={item.image}
              alt={item.name}
            />
            <p className="p-6 overflow-clip text-ellipsis h-2/4">
              {item.description}
            </p>
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  );
};

export default OurSpecials;
