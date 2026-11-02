import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import "../css/floatingContact.css";

// Number is the same one used in the footer (country code 91 + 10 digits).
const WHATSAPP_NUMBER = "919414237095";
const PHONE_NUMBER = "+919414237095";

const FloatingContact = () => (
  <div className="floating-contact">
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      className="floating-contact-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="WhatsApp"
    >
      <FaWhatsapp />
    </a>
    <a
      href={`tel:${PHONE_NUMBER}`}
      className="floating-contact-btn"
      aria-label="Call now"
      title="Call"
    >
      <IoCall />
    </a>
  </div>
);

export default FloatingContact;
