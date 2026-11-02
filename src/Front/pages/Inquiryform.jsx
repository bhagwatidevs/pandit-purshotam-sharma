import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaStarOfDavid } from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

import bg10 from "../../Front/assest/imgs/bg10.jpg";
import shape from "../../Front/assest/imgs/shape.svg";
import downlod from "../../Front/assest/imgs/download.png";

const Inquiryform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await axios.post("https://astrology-backend-1.onrender.com/api/contact", formData);
      setFeedback({ type: "success", message: res.data.message });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      const msg =
        error.response?.data?.error ||
        "Something went wrong. Please try again later.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div
        className="section-8  pt-20 pb-30 text-center text-white relative overflow-hidden"
        style={{ backgroundImage: `url(${bg10})`, backgroundSize: "100%" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-2xl font-semibold">Inquiry Form</h2>
          <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
            Home <FaStarOfDavid className="mx-2" /> Inquiry Form
          </p>
        </motion.div>
      </div>

      <div
        className="w-full h-[100px] rotate-180 mt-[-90px]"
        style={{ backgroundImage: `url(${shape})` }}
      ></div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="section-2 px-10 pb-10 text-center"
      >
        <div>
          <img src={downlod} alt="" className="m-auto my-10" />
        </div>
        <p className="md:mx-50">
          We’d love to hear from you! Fill out the form below and our team will
          get in touch with you soon to guide you with the right solutions.
        </p>
      </motion.div>

      {/* Contact Form Section */}
      <div className="md:flex-row-reverse md:flex overflow-hidden justify-between w-full py-20 px-10">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="md:w-[50%] md:ps-10"
        >
          <h2 className="text-2xl text-center mb-10 font-bold">
            Get in touch with us!
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mt-5">
              <label className="my-5 block text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label className="my-3 block text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="mt-5">
              <label className="my-5 block text-gray-600">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className="my-5 block text-gray-600">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Feedback message */}
            {feedback.message && (
              <p
                className={`text-sm mb-3 ${feedback.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {feedback.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg font-medium text-lg text-white duration-300 ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-400"
                }`}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </motion.div>

        {/* Static Contact Info */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="md:w-[50%] md:mt-0 mt-10"
        >
          <p className="flex gap-3 my-5">
            <CiLocationOn
              size={50}
              className="border text-orange-500 rounded-full p-2 border-orange-500"
            />
            Shree Ram Bhawan 13,14, Arihent Vatika, Opp. Shyam Nagar, New Sangner
            Road Near Mahatma Jyoti Rao Phule Mahila College Sodala-19, Jaipur,
            Rajasthan, INDIA
          </p>

          <p className="flex gap-3 my-5">
            <IoCallOutline
              size={30}
              className="border text-orange-500 rounded-full p-2 border-orange-500"
            />
            +91 9414237095
          </p>

          <p className="flex gap-3 my-5">
            <CiMail
              size={30}
              className="border text-orange-500 rounded-full p-2 border-orange-500"
            />
            ptpurshotam@gmail.com , info@panditpurshotamgaur.com
          </p>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113868.24069784686!2d75.63143504335937!3d26.891352599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db46785149661%3A0x2302338096a407b9!2sMahatma%20Jyoti%20Rao%20Phoole%20University!5e0!3m2!1sen!2sin!4v1761715703138!5m2!1sen!2sin"
              className="w-full h-100"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Inquiryform;
