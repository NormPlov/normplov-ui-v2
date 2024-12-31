import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SliderUniversity() {
  // State to track active slide index
  const [activeIndex, setActiveIndex] = useState(0);
  
  // List of image URLs
  const images = [
    "/assets/cover-rupp.png",
    "/assets/ict-cover.png",
    "/assets/cover-ruea.png",
    "https://www.aub.edu.kh/tc/assets/image/banner-A-1.jpg",
    "https://foodstem-euproject.itc.edu.kh/wp-content/uploads/2021/05/Web-URDSE2-1024x576.jpg"
  ];

  // Change the active index every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4500); 

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  return (
    <div id="gallery" className="relative w-full z-10 bg-gray-900" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative w-full lg:h-96 md:w-full md:h-[310px] h-[240px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full lg:h-full md:h-[460px] h-[300px] transition-all duration-1000 ease-in-out ${
              index === activeIndex ? 'block opacity-80' : 'hidden opacity-50'
            }`}
            data-carousel-item
          >
            <Image
              src={image}
              width={200}
              height={200}
              className="absolute block w-full lg:w-full md:w-full lg:h-full md:h-[460px] h-[300px] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`carousel image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
