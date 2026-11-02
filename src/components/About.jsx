import React from "react";
import "../css/about.css";
import { motion } from "framer-motion";
import gurujiImage from "../assets/IMG-20250812-WA0033.jpg";
import im from "../assets/im.png";

const GurujiSection = () => {
  // Apna WhatsApp number country code ke saath enter karein.
  // Example format: 91 followed by your 10-digit mobile number.


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="guruji-section">

        <motion.div
          className="news-title-section"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="news-title-heading">About Astrology</h2>

          <div className="news-title-decoration" aria-hidden="true">
            <img
              src={im}
              alt=""
              className="news-title-divider-img"
            />
          </div>


        </motion.div>









        <div className="guruji-container">
          {/* Guruji Image */}
          <div className="guruji-image-wrapper">
            <img
              src={gurujiImage}
              alt="Pandit Purshotam Sharma Gaur"
              className="guruji-image"
            />
          </div>

          {/* Guruji Information */}
          <div className="guruji-content">
            <div className="guruji-experience-badge">
              <span className="guruji-badge-line"></span>

              <div className="guruji-badge-content">
                <span className="guruji-badge-number">30</span>

                <div className="guruji-badge-text">
                  <span className="guruji-badge-plus">YEARS OF</span>
                  <span className="guruji-badge-label">EXPERIENCE</span>
                </div>
              </div>

              <span className="guruji-badge-line"></span>
            </div>

            <div className="guruji-text">
              <h2>PT. PURSHOTAM GAUR</h2>

              <p>
                Pandit Purshotam Sharma (Gaur), a distinguished
                astrologer and spiritual guide, is recognized for
                his deep knowledge of{" "}
                <strong>Vedic sciences</strong> and astrology.
                His insights help individuals find clarity and
                direction through the wisdom of ancient scriptures.
              </p>

              <p>
                Born in Bandikui near Jaipur, he was honored with
                the title <strong>“Brahman Ratna”</strong> by the
                Bhartiya Brahman Mahasabha. Guided by his father's
                teachings, he mastered Vedic knowledge and continues
                to assist people in discovering peace, success,
                and purpose in life.
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="guruji-contact-buttons">

            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        type="button"
        className="guruji-top-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <span aria-hidden="true">↑</span>
        Top
      </button>
    </>
  );
};

export default GurujiSection;