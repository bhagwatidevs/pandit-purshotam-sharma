import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../css/Slider.css";

// Keep these local images as a fallback while the API is unavailable.
import newsImage1 from "../assets/FB_IMG_1780461868184.jpg";
import newsImage2 from "../assets/file_00000000850081f4b06b30d53259fc99.png";
import newsImage3 from "../assets/IMG-20260118-WA0866.jpg";
import newsImage4 from "../assets/IMG-20260118-WA0831.jpg";
import newsImage5 from "../assets/FB_IMG_1780460196000.jpg";
import newsImage6 from "../assets/FB_IMG_1780461589265.jpg";
import newsImage7 from "../assets/FB_IMG_1780461671980.jpg";

import api from "../services/api";
import { API_ENDPOINTS } from "../config/api";

const fallbackSlides = [
  {
    _id: "fallback-1",
    imageUrl: newsImage1,
    alt: "Formal portrait wearing a yellow kurta with folded hands",
    category: "Profile",
    title: "A Traditional Portrait",
    description:
      "A formal portrait in a yellow kurta, with folded hands and a tilak. The photograph offers a traditional introduction.",
  },
  {
    _id: "fallback-2",
    imageUrl: newsImage2,
    alt: "Formal portrait wearing an off-white kurta",
    category: "Profile",
    title: "A Formal Portrait",
    description:
      "A close-up portrait in an off-white kurta, photographed against a soft studio-style background.",
  },
  {
    _id: "fallback-3",
    imageUrl: newsImage3,
    alt: "Respectful greeting during a gathering",
    category: "Public Engagement",
    title: "A Moment of Respect",
    description:
      "A respectful greeting between attendees at a gathering, with several people dressed in traditional Indian attire.",
  },
  {
    _id: "fallback-4",
    imageUrl: newsImage4,
    alt: "Two people standing in a decorated indoor venue",
    category: "Event Appearance",
    title: "At a Special Venue",
    description:
      "Two people pose together inside an ornate venue, with a decorative floral display in the background.",
  },
  {
    _id: "fallback-5",
    imageUrl: newsImage5,
    alt: "Group photograph with people wearing traditional attire",
    category: "Public Engagement",
    title: "A Group Meeting",
    description:
      "A group photograph with attendees in traditional attire, capturing a moment from an indoor meeting or gathering.",
  },
  {
    _id: "fallback-6",
    imageUrl: newsImage6,
    alt: "Speaker holding a microphone in front of national flags",
    category: "Public Address",
    title: "Addressing an Audience",
    description:
      "A person speaks into a microphone in front of several national flags during a public event.",
  },
  {
    _id: "fallback-7",
    imageUrl: newsImage7,
    alt: "Seated spiritual scene with prayer beads and a religious text",
    category: "Spiritual Practice",
    title: "A Moment of Spiritual Study",
    description:
      "A seated devotional scene featuring prayer beads and an open religious text, suggesting a moment of reading or recitation.",
  },
];

const getSlidesFromResponse = (responseData) => {
  const records = Array.isArray(responseData)
    ? responseData
    : responseData?.slides || responseData?.data || [];

  return records
    .filter((slide) => slide && slide.isActive !== false)
    .map((slide) => ({
      ...slide,
      imageUrl: slide.imageUrl || slide.image || slide.thumbnail || "",
      alt: slide.alt || slide.title || "Astrology article",
    }))
    .filter((slide) => slide.imageUrl && slide.title);
};

const NewsSlider = () => {
  const [slides, setSlides] = useState(fallbackSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      try {
        // api is the same axios instance used by the rest of this project.
        const response = await api.get(API_ENDPOINTS.NEWS_SLIDES);
        const records = getSlidesFromResponse(response.data);

        if (isMounted) {
          // An empty API list is respected; admins can intentionally remove all slides.
          setSlides(records);
        }
      } catch (error) {
        // Keep the current bundled images visible if the API is temporarily unavailable.
        console.error("Unable to load news slider items:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="news-about-section">
      <motion.div
        className="news-about-heading"
        initial={{ y: 25, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
      
        <p className="news-title-intro">
          A visual glimpse of portraits, public engagements and moments
          connected with spiritual practice.
        </p>
      </motion.div>

      {!loading && slides.length > 0 && (
        <section
          className="news-slider-section"
          aria-label="Astrology profile and event photographs"
        >
          <motion.div
            initial={{ x: 70, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="news-slider-container"
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={4}
              slidesPerGroup={1}
              loop={slides.length > 4}
              speed={600}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 18 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="news-image-swiper"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide._id || slide.id || `${slide.title}-${index}`}>
                  <article className="news-slider-card">
                    <div className="news-slider-image-wrap">
                      <img
                        src={slide.imageUrl}
                        alt={slide.alt}
                        className="news-slider-photo"
                        loading="lazy"
                        draggable="false"
                      />
                    </div>

                    <div className="news-slider-content">
                      {slide.category && (
                        <span className="news-slider-category">
                          {slide.category}
                        </span>
                      )}
                      <h3 className="news-slider-card-title">
                        {slide.title}
                      </h3>
                      {slide.description && (
                        <p className="news-slider-description">
                          {slide.description}
                        </p>
                      )}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </section>
      )}
    </section>
  );
};

export default NewsSlider;
