import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/serviceInfoPage.css";

const serviceContent = {
  "/kundli": {
    title: "Kundli Consultation",
    description: "Get a personalized birth-chart consultation based on your birth date, time, and place. Share your details with us to request an appointment.",
  },
  "/horoscope": {
    title: "Horoscope Guidance",
    description: "Request personalized horoscope guidance for your questions about life, relationships, career, or personal growth.",
  },
  "/vastu": {
    title: "Vastu Consultation",
    description: "Ask for traditional Vastu guidance for your home or workplace. Submit an inquiry and our team can follow up with you.",
  },
  "/puja": {
    title: "Puja & Remedies",
    description: "Request information about traditional puja services and spiritual remedies, including appointment availability.",
  },
  "/jap": {
    title: "Jap",
    description: "Contact us to enquire about traditional jap and mantra practices for your spiritual needs.",
  },
  "/yagya-homam": {
    title: "YAGYA (HOMAM)",
    description: "Enquire about traditional yagya and homam ceremonies, their purpose, and appointment arrangements.",
  },
  "/drishti": {
    title: "Drishti",
    description: "Enquire about traditional Drishti-related spiritual guidance and available remedies.",
  },
  "/astrologyconsultation": {
    title: "Astrology Consultation",
    description: "Request a personalized astrology consultation for your questions about career, relationships, family, and personal growth.",
  },
  "/mantrahealing": {
    title: "Mantra Healing",
    description: "Enquire about traditional mantra practices for spiritual focus, peace, and personal wellbeing.",
  },
  "/poojaservice": {
    title: "Pooja Service",
    description: "Request details about traditional pooja services, appointment availability, and preparation.",
  },
  "/vastushastra": {
    title: "Vastu Shastra",
    description: "Request traditional Vastu guidance for a home, office, or commercial space.",
  },
  "/newbornastrology": {
    title: "Newborn Astrology",
    description: "Enquire about birth-chart details and traditional astrological guidance for a newborn.",
  },
  "/luckystonechart": {
    title: "Lucky Stone Chart",
    description: "Request a consultation about gemstone traditions and chart-based recommendations.",
  },
};

const ServiceInfoPage = () => {
  const location = useLocation();
  const content = serviceContent[location.pathname] || {
    title: "Our Services",
    description: "Explore our astrology and spiritual guidance services.",
  };

  return (
    <main className="service-info-page">
      <section className="service-info-card">
        <p className="form-eyebrow">Pandit Purshotam Gaur</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <Link
          to="/inquiry-form"
          state={{ service: content.title }}
          className="service-info-cta"
        >
          Enquire / Book an Appointment
        </Link>
      </section>
    </main>
  );
};

export default ServiceInfoPage;
