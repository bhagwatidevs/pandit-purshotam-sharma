import React from "react";
import { motion } from "framer-motion";

import "../css/whychooseus.css";

import bgbannere2 from "../assets/bg5.jpg";
import shape from "../assets/shape.svg";
import downlod from "../assets/im.png";

import bgstarimg from "../assets/choose.png";
import bgstarimg2 from "../assets/choose2.png";
import bgstarimg3 from "../assets/choose3.png";
import bgstarimg4 from "../assets/choose4.png";
import bgstarimg5 from "../assets/choose5.png";

const reasons = [
  {
    image: bgstarimg,
    title: "Decades of Astrological Experience",
    description:
      "With 30+ years of deep study and practice, Pandit Purshotam Gaur Ji offers accurate and insightful predictions based on authentic Vedic principles.",
  },
  {
    image: bgstarimg2,
    title: "Government-Recognized & Gold Medalist Astrologer",
    description:
      "Honoured and awarded by the Rajasthan Government, Pandit Ji’s achievements reflect his credibility, dedication, and excellence in astrology.",
  },
  {
    image: bgstarimg3,
    title: "Personalized & Practical Remedies",
    description:
      "Every solution provided is based on individual Kundli analysis — simple, effective, and rooted in traditional scriptures.",
  },
  {
    image: bgstarimg4,
    title: "Thousands of Satisfied Devotees Worldwide",
    description:
      "From resolving life challenges to guiding spiritual growth, Pandit Ji has helped countless people through astrological guidance.",
  },
  {
    image: bgstarimg5,
    title: "Trusted Name in Vedic Astrology",
    description:
      "Known for honesty, ethics, and results-driven guidance, Pandit Purshotam Gaur Ji is a trusted name for people seeking direction and peace.",
  },
];

const WhyChooseUs = () => {
  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="why-choose-section"
      style={{
        "--why-bg": `url(${bgbannere2})`,
        "--why-shape": `url(${shape})`,
      }}
    >
      {/* Top Decorative Shape */}
      <div className="why-choose-shape why-choose-shape-top" />

      {/* Heading */}
      <div className="why-choose-heading">
        <h2>Why Choose Us</h2>

        <img src={downlod} alt="" className="why-choose-divider" />

        <p>
          We combine deep astrological expertise with a personalized
          approach to deliver accurate, meaningful insights. Our
          trusted guidance empowers you to make informed decisions
          and align your life with your true potential.
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="why-choose-grid">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="why-choose-card"
          >
            <img
              src={reason.image}
              alt={reason.title}
              className="why-choose-image"
            />

            <div className="why-choose-card-text">
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Decorative Shape */}
      <div className="why-choose-shape why-choose-shape-bottom" />
    </motion.section>
  );
};

export default WhyChooseUs;