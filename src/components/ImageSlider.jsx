import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../css/imageSlider.css";

import crad7 from "../assets/card-img7.png";
import crad8 from "../assets/card-img8.png";
import crad9 from "../assets/card-img9.png";
import crad10 from "../assets/card-img10.png";
import crad11 from "../assets/card-img11.png";

const images = [crad7, crad8, crad9, crad10, crad11];

const ImageSlider = () => {
  return (
    <section className="image-slider-section">
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="image-slider-container"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="astrology-image-swiper"
        >
          {images.map((img, index) => (
            <SwiperSlide key={img}>
              <div className="image-slider-item">
                <img
                  src={img}
                  alt={`Astrology slide ${index + 1}`}
                  className="image-slider-photo"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default ImageSlider;