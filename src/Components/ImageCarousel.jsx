/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const goToNext = () => setCurrent((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full  mx-auto overflow-hidden rounded-xl shadow-lg">
      <img
        src={images[current]}
        alt={`slide-${current}`}
        className="w-full h-[250px] sm:h-[400px] object-contain transition duration-700 ease-in-out"
      />

      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        ❯
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
