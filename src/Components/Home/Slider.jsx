// Slider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import bg1 from "../../assets/bg-1.png";
import bg2 from "../../assets/bg-2.png";
import bg3 from "../../assets/bg-3.jpeg";
import bg4 from "../../assets/bg-4.jpeg";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: bg1,
      heading: "Discover Nature",
      text: "Experience the beauty of untouched landscapes.",
    },
    {
      img: bg2,
      heading: "Adventure Awaits",
      text: "Step into the wild and embrace the unknown paths.",
    },
    {
      img: bg3,
      heading: "Adventure Awaits",
      text: "Step into the wild and embrace the unknown paths.",
    },
    {
      img: bg4,
      heading: "Adventure Awaits",
      text: "Step into the wild and embrace the unknown paths.",
    },
  ];

  return (
    <div className="w-[100vw] overflow-hidden  mt-[80px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect="fade"
        speed={1000}
        className="h-[84vh] md:h-[91vh]"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="h-[100vh] bg-center bg-[length:550px_950px] md:bg-[length:100%_100%] lg:bg-[length:90%_100%] xl:bg-[length:80%_100%] bg-no-repeat "
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Dark overlay */}
              {/* <div className="absolute inset-0 bg-black/50"></div> */}

              {/* Text */}
              <div className="relative z-5 h-full flex flex-col justify-center items-start px-6 sm:px-12">
                {/* <motion.h2
                  initial={{ x: -100, opacity: 0 }}
                  animate={
                    activeIndex === i
                      ? { x: 0, opacity: 1 }
                      : { x: -100, opacity: 0 }
                  }
                  transition={{ duration: 0.8 }}
                  className="ml-4 sm:ml-12 text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white"
                >
                  {slide.heading}
                </motion.h2>

                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  animate={
                    activeIndex === i
                      ? { x: 0, opacity: 1 }
                      : { x: -100, opacity: 0 }
                  }
                  transition={{ duration: 1, delay: 0.3 }}
                  className="ml-4 sm:ml-12 max-w-md text-sm sm:text-base lg:text-lg text-white"
                >
                  {slide.text}
                </motion.p> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom styles */}
      <style jsx global>{`
        /* White arrows (hidden on small devices) */
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }

        /* White pagination bullets */
        .swiper-pagination-bullet {
          background: #3e36c7 !important;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background: #3e36c7 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
