import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import AboutAstrology from "./components/About";
import Services from "./components/Services";
import PhotoGallery from "./components/PhotoGallery";
import LatestArticles from "./components/LatestArticles";
import PressRelease from "./pages/PressRelease";
import InquiryForm from "./pages/InquiryForm";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceInfoPage from "./pages/ServiceInfoPage";
import AstrologyConsultationFull from "./Front/pages/Astrologyconsultation";
import JapFull from "./Front/pages/JAp";
import YagyaFull from "./Front/pages/Yagya";
import NewbornFull from "./Front/pages/Newborn";
import DrishtiFull from "./Front/pages/Drishti";
import MantraFull from "./Front/pages/Mantra";
import PoojaFull from "./Front/pages/Pooja";
import VastuFull from "./Front/pages/Vastu";
import StonechartFull from "./Front/pages/Stonechart";

import PageBanner from "./components/PageBanner";
import FloatingContact from "./components/FloatingContact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/know-more" element={<><PageBanner title="Know More" /><AboutAstrology /></>} />
        <Route path="/photo-gallery" element={<><PageBanner title="Photo Gallery" /><PhotoGallery /></>} />
        <Route path="/product" element={<><PageBanner title="Products" /><ProductsPage /></>} />
        <Route path="/products" element={<><PageBanner title="Products" /><ProductsPage /></>} />
        <Route path="/blog" element={<><PageBanner title="Blog" /><LatestArticles contentType="article" /></>} />
        <Route path="/press-release" element={<><PageBanner title="Press Release" /><PressRelease /></>} />
        <Route path="/inquiry-form" element={<><PageBanner title="Inquiry Form" /><InquiryForm /></>} />
        <Route path="/kundli" element={<ServiceInfoPage />} />
        <Route path="/horoscope" element={<ServiceInfoPage />} />
        <Route path="/vastu" element={<VastuFull />} />
        <Route path="/puja" element={<PoojaFull />} />
        <Route path="/jap" element={<JapFull />} />
        <Route path="/yagya-homam" element={<YagyaFull />} />
        <Route path="/drishti" element={<DrishtiFull />} />
        <Route path="/astrologyconsultation" element={<AstrologyConsultationFull />} />
        <Route path="/mantrahealing" element={<MantraFull />} />
        <Route path="/poojaservice" element={<PoojaFull />} />
        <Route path="/vastushastra" element={<VastuFull />} />
        <Route path="/newbornastrology" element={<NewbornFull />} />
        <Route path="/luckystonechart" element={<StonechartFull />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Compatibility redirects for links saved by older versions. */}
        <Route path="/knowmore" element={<Navigate to="/know-more" replace />} />
        <Route path="/gallery" element={<Navigate to="/photo-gallery" replace />} />
        <Route path="/pressrelease" element={<Navigate to="/press-release" replace />} />
        <Route path="/news-release" element={<Navigate to="/press-release" replace />} />
        <Route path="/inquiryform" element={<Navigate to="/inquiry-form" replace />} />
        <Route path="/latest-articles" element={<Navigate to="/blog" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingContact />
    </BrowserRouter>
  );
}

export default App;
