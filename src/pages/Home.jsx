import React from "react";

import Hero from "../components/Hero";

import AboutAstrology from "../components/About";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import ImageSlider from "../components/ImageSlider";
import PopularProducts from "../components/PopularProducts";
import LatestArticles from "../components/LatestArticles";
import PhotoGallery from "../components/PhotoGallery";
import NewsSlider from "../components/NewsSlider";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <AboutAstrology />
    <NewsSlider/>
      
     
      <WhyChooseUs />
      <Testimonials />
      {/* <ImageSlider /> */}
      <PopularProducts />
      <LatestArticles preview />
      <PhotoGallery preview />
    </>
  );
};

export default Home;
