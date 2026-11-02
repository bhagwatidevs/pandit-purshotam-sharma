
import React from "react";

import omHeroVideo from "../assets/om-hero-bg.mp4";
import omHeroPoster from "../assets/om-hero-poster.jpg";
import heroOverlayImage from "../assets/card-img8.png";

import "../css/Hero.css";

const Hero = () => {
  return (
    <section className="hero-banner">

      {/* Background Video */}
      <video
        className="hero-banner__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={omHeroPoster}
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={omHeroVideo} type="video/mp4" />
      </video>

      {/* Image + Right Side Text */}
      <div className="hero-banner__overlay">

        {/* Left Side Image */}
        <img
          src={heroOverlayImage}
          alt="Astrology"
          className="hero-banner__image"
        />

        {/* Right Side Animated Text */}
        <div className="hero-banner__content">

          <p className="hero-banner__eyebrow">
            ज्योतिषीय ज्ञान एवं मार्गदर्शन
          </p>

          {/* Hindi Name */}
          <h1 className="hero-banner__hindi">
            पंडित पुरुषोत्तम शर्मा
            <span>(गौड़)</span>
          </h1>

          {/* Golden Divider */}
          <div className="hero-banner__divider"></div>

          {/* English Name */}
          <h2 className="hero-banner__english">
            Pandit Purshotam Sharma
            <span>(Gaur)</span>
          </h2>

        </div>

      </div>

    </section>
  );
};

export default Hero;
