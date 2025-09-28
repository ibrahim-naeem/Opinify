// Slider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import banner1LG from "../../assets/final-1.jpeg";
import banner1SM from "../../assets/final-2.jpeg";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      desktop: banner1LG,
      mobile: banner1SM,
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
        className="h-[90vh]"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <picture>
                {/* Desktop (≥1024px) */}
                <source media="(min-width: 1024px)" srcSet={slide.desktop} />
                {/* Tablet (≥768px) */}
                <source media="(min-width: 768px)" srcSet={slide.tablet} />
                {/* Mobile (<768px) fallback */}
                <img
                  src={slide.mobile}
                  alt={`Slide ${i}`}
                  className="h-full w-full "
                />
              </picture>
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
