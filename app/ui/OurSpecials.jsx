"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/element/css/effect-coverflow";
import { EffectCards } from "swiper/modules";
register();

export const OurSpecials = ({ items }) => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      // console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      // console.log("slide changed");
    });
    const swiperParams = {
      breakpoints: {
        200: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperElRef.current, swiperParams);

    // and now initialize it
    swiperElRef.current.initialize();
  }, []);

  return (
    <>
      <h1 className="ml-4 md:ml-10">Our Specials</h1>
      <swiper-container
        init="false"
        class="flex rounded-3xl md:m-10 p-2 h-[500px]"
        ref={swiperElRef}
        navigation="true"
        pagination="true"
        space-between="16"
      >
        {items.map((item) => (
          <swiper-slide
            class=" overflow-hidden rounded-2xl p-6 flex flex-col justify-center items-center bg-[var(--md-sys-color-tertiary-container)]"
            key={item.name}
          >
            <h2 className="h-2/4 text-center  text-[var(--md-sys-color-on-tertiary-container)]">
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
