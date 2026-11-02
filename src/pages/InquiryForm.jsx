
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStarOfDavid } from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

import bg10 from "../assets/bg10.jpg";
import shape from "../Front/assest/imgs/shape.svg";
import downlod from "../Front/assest/imgs/shape.svg";

import "../css/inquiryform.css";

const Inquiryform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await axios.post(
        "https://astrology-backend-1.onrender.com/api/contact",
        formData
      );

      setFeedback({
        type: "success",
        message: res.data.message || "Your inquiry has been submitted successfully!",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";

      setFeedback({
        type: "error",
        message: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="inquiry-page">

   

     

      {/* ================= INTRO SECTION ================= */}

      <motion.section
        className="inquiry-intro"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
       

        <span className="inquiry-section-tag">
          GET IN TOUCH
        </span>

        <h2>We Would Love To Hear From You!</h2>

        <p>
          Whether you have questions about astrology consultations,
          horoscope readings, pooja services or spiritual guidance,
          feel free to contact us. Fill out the inquiry form and
          our team will get in touch with you soon.
        </p>
      </motion.section>

      {/* ================= CONTACT & FORM SECTION ================= */}

      <section className="inquiry-content">
        <div className="inquiry-layout">

          {/* CONTACT FORM */}

          <motion.div
            className="inquiry-form-card"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="inquiry-form-heading">
              <span className="inquiry-section-tag">
                SEND AN INQUIRY
              </span>

              <h2>Get In Touch With Us!</h2>

              <p>
                Please fill in the details below. We will contact
                you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="inquiry-form-grid">

                {/* FULL NAME */}

                <div className="inquiry-field">
                  <label htmlFor="inquiry-name">
                    Full Name <span>*</span>
                  </label>

                  <input
                    id="inquiry-name"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* EMAIL */}

                <div className="inquiry-field">
                  <label htmlFor="inquiry-email">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="inquiry-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                  />
                </div>

                {/* PHONE */}

                <div className="inquiry-field inquiry-field--full">
                  <label htmlFor="inquiry-phone">
                    Phone Number
                  </label>

                  <input
                    id="inquiry-phone"
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* MESSAGE */}

                <div className="inquiry-field inquiry-field--full">
                  <label htmlFor="inquiry-message">
                    Your Message <span>*</span>
                  </label>

                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your inquiry or message here..."
                  />
                </div>

              </div>

              {/* SUCCESS / ERROR MESSAGE */}

              {feedback.message && (
                <div
                  className={`inquiry-feedback inquiry-feedback--${feedback.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {feedback.message}
                </div>
              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="inquiry-submit-btn"
              >
                <span>
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </span>

                {!loading && <span className="inquiry-submit-arrow">→</span>}
              </button>

              <p className="inquiry-form-note">
                * Required fields. Your information will be used
                to respond to your inquiry.
              </p>

            </form>
          </motion.div>

          {/* CONTACT INFORMATION */}

          <motion.aside
            className="inquiry-contact-card"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="inquiry-contact-heading">
              <span>CONTACT INFORMATION</span>

              <h2>Let's Connect</h2>

              <p>
                Reach out to us for astrology guidance and other
                spiritual services. We are happy to assist you.
              </p>
            </div>

            <div className="inquiry-contact-list">

              {/* ADDRESS */}

              <div className="inquiry-contact-item">
                <div className="inquiry-contact-icon">
                  <CiLocationOn />
                </div>

                <div>
                  <h3>Our Location</h3>

                  <p>
                    Shree Ram Bhawan 13,14, Arihent Vatika,
                    Opp. Shyam Nagar, New Sangner Road,
                    Near Mahatma Jyoti Rao Phule Mahila College,
                    Sodala-19, Jaipur, Rajasthan, India.
                  </p>
                </div>
              </div>

              {/* PHONE */}

              <div className="inquiry-contact-item">
                <div className="inquiry-contact-icon">
                  <IoCallOutline />
                </div>

                <div>
                  <h3>Call Us</h3>

                  <a href="tel:+919414237095">
                    +91 9414237095
                  </a>
                </div>
              </div>

              {/* EMAIL */}

              <div className="inquiry-contact-item">
                <div className="inquiry-contact-icon">
                  <CiMail />
                </div>

                <div>
                  <h3>Email Us</h3>

                  <a href="mailto:ptpurshotam@gmail.com">
                    ptpurshotam@gmail.com
                  </a>

                  <a href="mailto:info@panditpurshotamgaur.com">
                    info@panditpurshotamgaur.com
                  </a>
                </div>
              </div>

            </div>

            {/* GOOGLE MAP */}

            <div className="inquiry-map-section">
              <h3>Find Us On Map</h3>

              <div className="inquiry-map">
                <iframe
                  title="Pandit Purshotam Gaur location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113868.24069784686!2d75.63143504335937!3d26.891352599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db46785149661%3A0x2302338096a407b9!2sMahatma%20Jyoti%20Rao%20Phoole%20University!5e0!3m2!1sen!2sin!4v1761715703138!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

          </motion.aside>

        </div>
      </section>

    </main>
  );
};

export default Inquiryform;
