"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/element/css/effect-coverflow";
register();

const OurSpecials = ({ items }) => {
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
        1200: {
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
      <h1 className="m-6 md:m-10">Our Specials</h1>
      <swiper-container
        init="false"
        class="flex p-2 h-[400px] w-5/6 lg:w-3/4 mx-auto right-0 left-0"
        ref={swiperElRef}
        navigation="true"
        pagination="true"
        space-between="16"
      >
        {items.map((item) => (
          <swiper-slide
            class="overflow-hidden rounded-2xl flex flex-col justify-start items-start bg-[var(--md-sys-color-surface-container-high)]"
            key={item.name}
          >
            <Image
              style={{
                height: "60%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "16px",
                flexShrink: "0",
              }}
              width={400}
              height={0}
              src={item.image}
              alt={item.name}
            />
            <h2 className="p-4 text-[var(--md-sys-color-on-surface)]">
              {item.name}
            </h2>
            <p className="mx-4 line-clamp-3 text-[var(--md-sys-color-on-surface-variant)]">
              {item.description}
            </p>
          </swiper-slide>
        ))}
      </swiper-container>
    </>
  );
};

export default OurSpecials;
