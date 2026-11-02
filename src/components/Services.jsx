
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "../css/service.css";

// Images
import decoration from "../assets/im.png";

import card1 from "../assets/card-img.png";
import card2 from "../assets/card-img2.png";
import card3 from "../assets/card-img3.png";
import card4 from "../assets/card-img4.png";
import card5 from "../assets/card-img5.png";
import card6 from "../assets/card-img6.png";

const servicesData = [
  {
    id: 1,
    title: "Astrology Consultation",
    description:
      "Get personalized horoscope readings and planetary insights to find clarity and direction in life.",
    image: card1,
    link: "/astrologyconsultation",
  },
  {
    id: 2,
    title: "Mantra Healing",
    description:
      "Discover traditional mantra practices for positivity, spiritual growth, peace, and inner balance.",
    image: card2,
    link: "/mantrahealing",
  },
  {
    id: 3,
    title: "Pooja Service",
    description:
      "Explore traditional pooja services performed with devotion for harmony, prosperity, and blessings.",
    image: card3,
    link: "/poojaservice",
  },
  {
    id: 4,
    title: "Vastu Shastra",
    description:
      "Get traditional Vastu guidance for your home and workplace to create a harmonious environment.",
    image: card4,
    link: "/vastushastra",
  },
  {
    id: 5,
    title: "Newborn Astrology",
    description:
      "Explore your newborn's birth chart and traditional astrological insights for their life journey.",
    image: card5,
    link: "/newbornastrology",
  },
  {
    id: 6,
    title: "Lucky Stone Chart",
    description:
      "Explore gemstone recommendations traditionally associated with your birth chart and planetary positions.",
    image: card6,
    link: "/luckystonechart",
  },
];

const Services = () => {
  return (
    <section className="astrology-services">
      {/* Section Heading */}
      <motion.div
        className="astrology-services__heading"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="astrology-services__title">
          Our Services
        </h2>

        <img
          src={decoration}
          alt=""
          className="astrology-services__decoration"
        />

        <p className="astrology-services__intro">
          We offer personalized astrology consultations, birth chart
          readings, and horoscope guidance to help you gain clarity
          and direction in life. Our expert astrologer provides insights
          for career, relationships, and personal growth.
        </p>
      </motion.div>

      {/* Services Slider */}
      <motion.div
        className="astrology-services__slider"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
       <Swiper
  modules={[Autoplay]}
  spaceBetween={25}
  slidesPerView={4}
  loop={true}
  speed={700}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  breakpoints={{
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  }}
  className="astrology-services__swiper"
>
      
          {servicesData.map((service) => (
            <SwiperSlide
              key={service.id}
              className="astrology-services__slide"
            >
              <div className="astrology-services__card">
                <div className="astrology-services__image-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="astrology-services__image"
                    loading="lazy"
                  />
                </div>

                <h3 className="astrology-services__card-title">
                  {service.title}
                </h3>

                <p className="astrology-services__description">
                  {service.description}
                </p>

                <Link
                  to={service.link}
                  className="astrology-services__link"
                >
                  Read More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Services;
