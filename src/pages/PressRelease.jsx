import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaSearch,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import api from "../services/api";
import { API_BASE_URL, API_ENDPOINTS } from "../config/api";
import divider from "../assets/im.png";
import "../css/pressRelease.css";

// Curated local coverage is used as a fallback until press releases are added
// in Admin Dashboard. Items returned by the API are always shown first.
import newspaperPreview from "../assets/IMG-20260118-WA0007.jpg";
import sachBedhadakArticle from "../assets/IMG-20260128-WA0073.jpg";
import janTVFeature from "../assets/IMG-20261011-WA0651.jpg";
import firstIndiaFeatureOne from "../assets/Screenshot_20261012_134940_YouTube.jpg";
import firstIndiaFeatureTwo from "../assets/Screenshot_20261012_134958_YouTube.jpg";
import gurujiRecognition from "../assets/IMG-20250812-WA0033.jpg";
import recognitionPoster from "../assets/file_0000000038dc82089db66a0d0449745b.png";
import gurujiPortrait from "../assets/file_00000000850081f4b06b30d53259fc99.png";
import Pressimg from "../Front/assest/imgs/Pressimg1.jpeg";
import Pressimg2 from "../Front/assest/imgs/Pressimg2.jpeg";
import Pressimg3 from "../Front/assest/imgs/Pressimg3.jpeg";
import Pressimg4 from "../Front/assest/imgs/Pressimg4.jpeg";
import Pressimg6 from "../Front/assest/imgs/press6.jpeg";
import Pressimg7 from "../Front/assest/imgs/press7.jpeg";
import Pressimg8 from "../Front/assest/imgs/press8.jpeg";
import Pressimg9 from "../Front/assest/imgs/press9.jpeg";
import Pressimg10 from "../Front/assest/imgs/press10.jpeg";
import Pressimg11 from "../Front/assest/imgs/press11.jpeg";
import Pressimg12 from "../Front/assest/imgs/press12.jpeg";
import Pressimg13 from "../Front/assest/imgs/press13.jpeg";
import Pressimg16 from "../Front/assest/imgs/press16.jpeg";
import Pressimg14 from "../Front/assest/imgs/press14.jpeg";
import Pressimg17 from "../Front/assest/imgs/press17.jpeg";
import Pressimg18 from "../Front/assest/imgs/press18.jpeg";
import Pressimg19 from "../Front/assest/imgs/press19.jpeg";
import img20 from "../Front/assest/imgs/img20.jpeg";
import img21 from "../Front/assest/imgs/img21.jpeg";
import img22 from "../Front/assest/imgs/img22.jpeg";
import img23 from "../Front/assest/imgs/img23.jpeg";
import img24 from "../Front/assest/imgs/img24.jpeg";
import img25 from "../Front/assest/imgs/img25.jpeg";
import img26 from "../Front/assest/imgs/img26.jpeg";
import img27 from "../Front/assest/imgs/img27.jpeg"; 
import img28 from "../Front/assest/imgs/img28.jpeg"; 
import img29 from "../Front/assest/imgs/img29.jpeg";
import img30 from "../Front/assest/imgs/img30.jpeg"; 
import img31 from "../Front/assest/imgs/img31.jpeg";
import img32 from "../Front/assest/imgs/img32.jpeg";
import img33 from "../Front/assest/imgs/img33.jpeg";
import img34 from "../Front/assest/imgs/img34.jpeg";
import img35 from "../Front/assest/imgs/img35.jpeg";
import img36 from "../Front/assest/imgs/img36.jpeg";
import img37 from "../Front/assest/imgs/img37.jpeg";
import img38 from "../Front/assest/imgs/img38.jpeg";
import img39 from "../Front/assest/imgs/img39.jpeg";
import img40 from "../Front/assest/imgs/img40.jpeg";
import img41 from "../Front/assest/imgs/img41.jpeg";
import img42 from "../Front/assest/imgs/img42.jpeg";
import img43 from "../Front/assest/imgs/img43.jpeg";
import img44 from "../Front/assest/imgs/img44.jpeg";
import img45 from "../Front/assest/imgs/img45.jpeg";
import img46 from "../Front/assest/imgs/img46.jpeg";
import img47 from "../Front/assest/imgs/img47.jpeg";
import img48 from "../Front/assest/imgs/img48.jpeg";
import img49 from "../Front/assest/imgs/img49.jpeg";
import img50 from "../Front/assest/imgs/img50.jpeg";
import img51 from "../Front/assest/imgs/img51.jpeg";
import img52 from "../Front/assest/imgs/img52.jpeg";
import img53 from "../Front/assest/imgs/img53.jpeg";
import img54 from "../Front/assest/imgs/img54.jpeg";
import img55 from "../Front/assest/imgs/img55.jpeg";
import img56 from "../Front/assest/imgs/img56.jpeg";
import img57 from "../Front/assest/imgs/img57.jpeg";
import img58 from "../Front/assest/imgs/img58.jpeg";
import img59 from "../Front/assest/imgs/img59.jpeg";
import img60 from "../Front/assest/imgs/img60.jpeg";
import img61 from "../Front/assest/imgs/img61.jpeg";
import img62 from "../Front/assest/imgs/img62.jpeg";
import img63 from "../Front/assest/imgs/img63.jpeg";
import img64 from "../Front/assest/imgs/img64.jpeg";
import img65 from "../Front/assest/imgs/img65.jpeg";
import img66 from "../Front/assest/imgs/img66.jpeg";
import img67 from "../Front/assest/imgs/img67.jpeg";
import img68 from "../Front/assest/imgs/img68.jpeg";
import img69 from "../Front/assest/imgs/img69.jpeg";
import img70 from "../Front/assest/imgs/img70.jpeg";
import img71 from "../Front/assest/imgs/img71.jpeg";
import img72 from "../Front/assest/imgs/img72.jpeg";
import img73 from "../Front/assest/imgs/img73.jpeg";
import img74 from "../Front/assest/imgs/img74.jpeg";
import img75 from "../Front/assest/imgs/img75.jpeg";

const localPressReleases = [
  
  {
    id: "local-press-2",
    title: "डॉ. गौड़ ज्योतिष तपस्वी सम्मान से हुए सम्मानित",
    description:
      "दैनिक हिंदी अखबार सच बेधड़क में प्रकाशित खबर। इसमें ज्योतिष महाकुंभ और ज्योतिषाचार्य डॉ. पंडित पुरुषोत्तम गौड़ को मिले सम्मान का उल्लेख है।",
    image: sachBedhadakArticle,
    publishedAt: "2026-01-28T12:00:00",
    dateLabel: "JAN 28, 2026",
    category: "Newspaper",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "local-press-3",
    title: "नवरात्रि विशेष: ज्योतिष और उपासना पर मीडिया कवरेज",
    description:
      "नवरात्रि एवं धार्मिक विषयों पर ज्योतिषीय मार्गदर्शन से संबंधित टीवी और मीडिया कवरेज।",
    image: janTVFeature,
    dateLabel: "TV & MEDIA FEATURE",
    category: "TV & Media",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "local-press-4",
    title: "First India TV पर विशेष ज्योतिषीय कार्यक्रम",
    description:
      "ज्योतिष, पूजा-पाठ और आध्यात्मिक विषयों पर प्रसारित कार्यक्रम की एक झलक।",
    image: firstIndiaFeatureOne,
    dateLabel: "TELEVISION COVERAGE",
    category: "TV & Media",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "local-press-5",
    title: "First India TV — धार्मिक मार्गदर्शन",
    description:
      "आध्यात्मिक और ज्योतिषीय परामर्श से जुड़े टेलीविजन फीचर का दूसरा दृश्य।",
    image: firstIndiaFeatureTwo,
    dateLabel: "TELEVISION COVERAGE",
    category: "TV & Media",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "local-press-6",
    title: "ज्योतिषाचार्य डॉ. पंडित पुरुषोत्तम गौड़",
    description:
      "ज्योतिषीय परामर्श, वैदिक ज्ञान और आध्यात्मिक मार्गदर्शन से जुड़े कार्यों का परिचय।",
    image: gurujiRecognition,
    dateLabel: "FEATURED PROFILE",
    category: "Recognition",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "local-press-7",
    title: "ज्योतिष एवं वैदिक परंपरा से जुड़ा विशेष उल्लेख",
    description:
      "डॉ. पंडित पुरुषोत्तम गौड़ से जुड़ी सार्वजनिक गतिविधियों और सम्मान की झलक।",
    image: recognitionPoster,
    dateLabel: "RECOGNITION",
    category: "Recognition",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "local-press-8",
    title: "वैदिक ज्योतिष परामर्श — विशेष परिचय",
    description:
      "ज्योतिषाचार्य डॉ. पंडित पुरुषोत्तम गौड़ के वैदिक ज्योतिष एवं मार्गदर्शन कार्य से जुड़ी तस्वीर।",
    image: gurujiPortrait,
    dateLabel: "MEDIA PHOTO",
    category: "Recognition",
    name: "Pandit Purushottam Gaur",
  },
  {
    id: "1",
    image: Pressimg,
    date: "OCT 27, 2025",
    title: "Astrology Experts Reveal Powerful Alignments for November 2025",
    description: "Pandit Purshotam Sharma (Gaur) ke anusar, November me Guru aur Shani ka yog jeevan me nayi disha pradan karega. Dharmik kriyaon ke liye yeh samay atyant shubh mana gaya hai.",
  },


  {
    id: "2",
    image: Pressimg2,
    date: "OCT 20, 2025",
    title: "Full Moon Brings New Energy in Aries",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Mesh Rashi me Poornima aatmavishwas aur nayi shuruaat laayegi. Naye prayas aur srijanatmak kaam ke liye samay anukul hai.",
  },
  {
    id: " 3",
    image: Pressimg3,
    date: "SEP 15, 2025",
    title: "Planetary Changes Impacting Career Paths",
    description: "Pandit Purshotam Sharma (Gaur) ke mutabik, Brihaspati ka Gochar vyavsay aur naukri me unnati laa sakta hai, jabki Ketu nirnay lene me saavdhani ka sanket deta hai.",
  },
  {
    id: "4",
    image: Pressimg4,
    date: "AUG 29, 2025",
    title: "Rahu & Ketu Transits: What It Means for You",
    description: "Pandit Purshotam Sharma (Gaur) ne kaha ki Rahu-Ketu ke parivartan se rishton aur arthik sthiti me badlaav sambhav hai. Dhairya aur dharmikta banaye rakhna avashyak hai.",
  },
  {
    id: "5",
    image: Pressimg16,
    date: "JUL 10, 2025",
    title: "Solar Eclipse Brings New Opportunities",
    description: "Pandit Purshotam Sharma (Gaur) ke anusar, Surya Grahan ke dauran jap aur dhyaan se jeevan me naye marg khul sakte hain. Ye samay aatm-chintan ka hai.",
  },
  {
    id: " 6",
    image: Pressimg6,
    date: "JUN 25, 2025",
    title: "Mercury Retrograde Survival Guide",
    description: "Budh vakri hone par sanchar aur samjhaute me kathinai aa sakti hai. Pandit Purshotam Sharma (Gaur) salah dete hain ki faisle dhairya se lein.",
  },
  {
    id: "7",
    image: Pressimg7,
    date: "MAY 18, 2025",
    title: "Venus Retrograde & Love Alignment",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Shukra vakri hone se prem sambandhon me pariksha ka samay ho sakta hai. Samajhdari aur vishwas se kaam lena uchit hai.",
  },
  {
    id: "8",
    image: Pressimg8,
    date: "APR 02, 2025",
    title: "New Moon & Manifestation Rituals",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Amavasya ke din manokamna purti ke liye sankalp aur sadhana atyant prabhavshali hoti hai.",
  },
  {
    id: "9",
    image: Pressimg9,
    date: "MAR 22, 2025",
    title: "Mars and Saturn Conjunction Brings Challenge",
    description: "Pandit Purshotam Sharma (Gaur) ke anusar, Mangal aur Shani ka yog vyakti ke karyakshetra me chunautiyan la sakta hai. Shant aur dhairyashil rehna zaruri hai.",
  },
  {
    id: "10",
    image: Pressimg10,
    date: "MAR 03, 2025",
    title: "Pisces Season Awakens Inner Intuition",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Meen Rashi ka samay aatm-chintan aur antar-gyan badhane ke liye upyukt hai.",
  },
  {
    id: "11",
    image: Pressimg11,
    date: "FEB 14, 2025",
    title: "Valentine’s Day Brings Venus Blessings",
    description: "Pandit Purshotam Sharma (Gaur) batate hain ki Shukra ke prabhav se prem aur samarpan ka yog ban raha hai. Rishte majboot hone ki sambhavna hai.",
  },
  {
    id: "12",
    image: Pressimg12,
    date: "JAN 31, 2025",
    title: "Saturn Transit in Aquarius: Big Shifts Ahead",
    description: "Pandit Purshotam Sharma (Gaur) ke mutabik, Shani Dev ke Kumbh me pravesh se karm aur dayitva ka samay aarambh ho raha hai. Mehnat safalta degi.",
  },
  {
    id: "13",
    image: Pressimg13,
    date: "JAN 10, 2025",
    title: "Capricorn New Moon Sets Practical Goals",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki ye Amavasya vyavaharik lakshyon ko sakar karne ka shubh samay hai.",
  },
  {
    id: " 14",
    image: Pressimg14,
    date: "DEC 21, 2024",
    title: "Winter Solstice Energy and Cosmic Renewal",
    description: "Pandit Purshotam Sharma (Gaur) ke anusar, ayanant kaal vyakti ko atma-shakti aur dhairya pradan karta hai. Is din dhyaan karna labhdayak hai.",
  },

  {
    id: " 16",
    image: Pressimg17,
    date: "NOV 23, 2024",
    title: "Lunar Eclipse Insights Explained",
    description: "Pandit Purshotam Sharma (Gaur) batate hain ki Chandra Grahan ke samay antar-mukh rehna aur man ki shuddhata banaye rakhna shubh hota hai.",
  },
  {
    id: "17",
    image: Pressimg18,
    date: "OCT 11, 2024",
    title: "Navratri Planetary Effects",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Navratri ke dauran Devi Upasana aur sankalp safalta deti hai. Grahon ka yog shakti prad hai.",
  },
  {
    id: "18",
    image: Pressimg19,
    date: "SEP 01, 2024",
    title: "Sun and Mercury Combine for Mental Strength",
    description: "Pandit Purshotam Sharma (Gaur) ke mutabik, Surya-Budh ka yog buddhi aur sanchar me bal pradan karega. Vidyarthiyon ke liye yeh samay anukul hai.",
  },

  {
    id: "19",
    image: Pressimg,
    date: "AUG 12, 2024",
    title: "Leo Season Boosts Confidence and Leadership",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Simha Rashi ke grah aatmavishwas aur netrutva gunon ko majboot karte hain.",
  },

  {
    id: "20",
    image: img20,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    description: "Pandit Purshotam Sharma (Gaur) kehte hain ki Simha Rashi ke grah aatmavishwas aur netrutva gunon ko majboot karte hain.",
  },
  {
    id: "21",
    image: img21,
    date: "Nov 12, 2025",
    title: "Leo Season Inspires Confidence and Strong Leadership",
    description: "Pandit Purshotam Sharma (Gaur) ke anusar, Simha Rashi ka prabhav aatmavishwas, sahas aur netrutva kshamata ko majboot banane mein sahayak mana jata hai.",
  },
 {
  id: "22",
  image: img22,
  date: "Nov 12, 2025",
  title: "Planetary Influences Shape Confidence and Decision-Making",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की चाल व्यक्ति के आत्मविश्वास, सोचने-समझने की क्षमता और जीवन में सही निर्णय लेने की दिशा को प्रभावित कर सकती है।"
},


 {
  id: "23",
  image: img23,
  date: "Nov 12, 2025",
  title: "Cosmic Shifts Bring New Perspectives and Opportunities",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों के बदलते प्रभाव से व्यक्ति के विचारों, कार्यक्षमता और जीवन के प्रति दृष्टिकोण में नए बदलाव देखने को मिल सकते हैं।"
},

 {
  id: "24",
  image: img24,
  date: "Nov 12, 2025",
  title: "Jupiter's Influence on Growth and New Opportunities",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, गुरु ग्रह का सकारात्मक प्रभाव ज्ञान, करियर में उन्नति और नए अवसरों की संभावनाओं को प्रोत्साहित कर सकता है।"
},
{
  id: "25",
  image: img25,
  date: "Nov 12, 2025",
  title: "Saturn's Transit Highlights Patience and Hard Work",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शनि का प्रभाव व्यक्ति को अनुशासन, धैर्य और मेहनत के महत्व को समझने तथा अपने लक्ष्य के प्रति समर्पित रहने की प्रेरणा देता है।"
},
{
  id: "26",
  image: img26,
  date: "Nov 12, 2025",
  title: "Positive Planetary Energy for Personal Transformation",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों के विशेष योग आत्मचिंतन, सकारात्मक सोच और जीवन में बेहतर बदलाव लाने के लिए प्रेरणा दे सकते हैं।"
},

{
  id: "27",
  image: img27,
  date: "Nov 12, 2025",
  title: "Mars Transit Brings Energy and Determination",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, मंगल ग्रह का प्रभाव साहस, ऊर्जा और कार्यों को पूरा करने के दृढ़ संकल्प को बढ़ावा देने से जुड़ा माना जाता है।"
},
{
  id: "28",
  image: img28,
  date: "Nov 12, 2025",
  title: "Venus Influence Strengthens Love and Relationships",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शुक्र ग्रह प्रेम, सौंदर्य और आपसी संबंधों का प्रतीक है। इसका प्रभाव रिश्तों में मधुरता और सामंजस्य का संदेश देता है।"
},
{
  id: "29",
  image: img29,
  date: "Nov 12, 2025",
  title: "Mercury Transit Favors Communication and Intelligence",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, बुध ग्रह बुद्धिमत्ता, संवाद और व्यापार से संबंधित माना जाता है। इसके प्रभाव से नए विचारों और बेहतर निर्णय लेने की प्रेरणा मिल सकती है।"
},
{
  id: "30",
  image: img30,
  date: "Nov 12, 2025",
  title: "Moon's Energy Encourages Emotional Balance",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, चंद्रमा मन और भावनाओं का कारक है। इसकी स्थिति व्यक्ति की मानसिक शांति, संवेदनशीलता और भावनात्मक संतुलन से जुड़ी होती है।"
},
{
  id: "31",
  image: img31,
  date: "Nov 12, 2025",
  title: "Sun's Influence Inspires Confidence and Success",
  description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, सूर्य आत्मविश्वास, नेतृत्व और ऊर्जा का प्रतीक है। इसका सकारात्मक प्रभाव व्यक्ति को अपने लक्ष्य की ओर आगे बढ़ने की प्रेरणा दे सकता है।"
},

 {
    id: "32",
    image: img32,
    date: "Nov 12, 2025",
    title: "Astrological Insights for Career Planning",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की पारंपरिक व्याख्या करियर से जुड़े विकल्पों पर विचार करने और अपनी क्षमताओं को पहचानने के लिए एक दृष्टिकोण दे सकती है।"
  },
  {
    id: "33",
    image: img33,
    date: "Nov 12, 2025",
    title: "The Moon's Role in Emotional Balance",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि ज्योतिष में चंद्रमा को मन और भावनाओं से जोड़ा जाता है। इसकी स्थिति को आत्मचिंतन और मानसिक संतुलन के संदर्भ में देखा जाता है।"
  },
  {
    id: "34",
    image: img34,
    date: "Nov 12, 2025",
    title: "Jupiter Symbolizes Learning and Expansion",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, गुरु ग्रह को ज्ञान, मार्गदर्शन और शिक्षा का प्रतीक माना जाता है। यह विषय व्यक्ति को सीखने और अपने अनुभवों से आगे बढ़ने की प्रेरणा देता है।"
  },
  {
    id: "35",
    image: img35,
    date: "Nov 12, 2025",
    title: "Saturn Teaches Patience and Responsibility",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शनि को अनुशासन, कर्म और जिम्मेदारी से संबंधित माना जाता है। इसका संदेश कठिन परिस्थितियों में धैर्य और निरंतर प्रयास बनाए रखना है।"
  },
  {
    id: "36",
    image: img36,
    date: "Nov 12, 2025",
    title: "Mercury Highlights Communication and Intellect",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि बुध ग्रह को बुद्धि, बातचीत और विश्लेषण क्षमता का कारक माना जाता है। स्पष्ट संवाद और सोच-समझकर लिए गए फैसले उपयोगी रहते हैं।"
  },
  {
    id: "37",
    image: img37,
    date: "Nov 12, 2025",
    title: "Venus Brings Attention to Love and Harmony",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शुक्र ग्रह प्रेम, कला और सामंजस्य का प्रतीक है। रिश्तों में सम्मान, विश्वास और मधुर व्यवहार बनाए रखना इस विचार का मुख्य संदेश है।"
  },
  {
    id: "38",
    image: img38,
    date: "Nov 12, 2025",
    title: "The Sun Represents Confidence and Vitality",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि सूर्य को आत्मबल, नेतृत्व और ऊर्जा से जोड़ा जाता है। यह विषय अपने गुणों को पहचानने और जिम्मेदारी के साथ आगे बढ़ने की प्रेरणा देता है।"
  },
  {
    id: "39",
    image: img39,
    date: "Nov 12, 2025",
    title: "Mars Encourages Courage and Determination",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, मंगल साहस, सक्रियता और दृढ़ इच्छाशक्ति का प्रतीक माना जाता है। किसी भी लक्ष्य को पाने के लिए ऊर्जा के साथ संयम रखना भी आवश्यक है।"
  },
  {
    id: "40",
    image: img40,
    date: "Nov 12, 2025",
    title: "Rahu and Ketu: A Journey of Reflection",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, राहु और केतु को ज्योतिष में बदलाव, इच्छाओं और आत्मचिंतन से जोड़ा जाता है। कठिन समय में विवेक और संतुलन बनाए रखना महत्वपूर्ण है।"
  },
  {
    id: "41",
    image: img41,
    date: "Nov 12, 2025",
    title: "Planetary Combinations and Fresh Possibilities",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, विभिन्न ग्रहों के योगों की व्याख्या जीवन के अवसरों और चुनौतियों को समझने का पारंपरिक तरीका है। हर निर्णय में परिस्थिति और व्यवहारिकता को महत्व देना चाहिए।"
  },
  {
    id: "42",
    image: img42,
    date: "Nov 12, 2025",
    title: "Positive Thinking and the Power of Self-Reflection",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) का कहना है कि आत्मचिंतन व्यक्ति को अपनी खूबियों और कमियों को समझने में मदद करता है। सकारात्मक सोच के साथ निरंतर प्रयास जीवन में उपयोगी दिशा दे सकते हैं।"
  },
  {
    id: "43",
    image: img43,
    date: "Nov 12, 2025",
    title: "A Thoughtful Approach to Financial Decisions",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, आर्थिक मामलों में धैर्य, योजना और विवेक का विशेष महत्व है। ज्योतिषीय संकेतों के साथ व्यावहारिक जानकारी के आधार पर निर्णय लेना बेहतर रहता है।"
  },
  {
    id: "44",
    image: img44,
    date: "Nov 12, 2025",
    title: "Astrology and the Value of Family Harmony",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि पारिवारिक जीवन में आपसी समझ और सम्मान महत्वपूर्ण भूमिका निभाते हैं। शांत बातचीत और एक-दूसरे की भावनाओं को समझना रिश्तों को मजबूत बनाता है।"
  },
  {
    id: "45",
    image: img45,
    date: "Nov 12, 2025",
    title: "Planetary Themes for Education and Focus",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शिक्षा के क्षेत्र में एकाग्रता, नियमित अभ्यास और सही मार्गदर्शन जरूरी हैं। ज्योतिषीय दृष्टिकोण को आत्मविश्वास बढ़ाने के लिए देखा जा सकता है।"
  },
  {
    id: "46",
    image: img46,
    date: "Nov 12, 2025",
    title: "Career Growth Through Discipline and Consistency",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, कामकाज में सफलता के लिए जिम्मेदारी निभाना और लगातार सीखते रहना महत्वपूर्ण है। योजनाबद्ध प्रयास व्यक्ति को अपने पेशेवर लक्ष्य स्पष्ट करने में मदद करते हैं।"
  },
  {
    id: "47",
    image: img47,
    date: "Nov 12, 2025",
    title: "Spiritual Practices for Inner Peace",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि ध्यान, प्रार्थना और नियमित साधना मन को स्थिर रखने में सहायक हो सकती हैं। आध्यात्मिक अभ्यास का उद्देश्य भीतर शांति और सकारात्मकता विकसित करना है।"
  },
  {
    id: "48",
    image: img48,
    date: "Nov 12, 2025",
    title: "Finding Balance Between Work and Personal Life",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, जीवन में कार्य और परिवार दोनों को उचित समय देना जरूरी है। संतुलित दिनचर्या, विश्राम और जिम्मेदारियों का सही प्रबंधन उपयोगी साबित हो सकता है।"
  },
  {
    id: "49",
    image: img49,
    date: "Nov 12, 2025",
    title: "Choosing New Beginnings with Care and Clarity",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शुभ समय पर विचार करना ज्योतिषीय परंपरा का हिस्सा है। किसी नई शुरुआत से पहले तैयारी, स्पष्ट लक्ष्य और सही योजना भी उतने ही आवश्यक हैं।"
  },
  {
    id: "50",
    image: img50,
    date: "Nov 12, 2025",
    title: "Wisdom and Patience in Long-Term Planning",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि बड़े लक्ष्य पाने के लिए दूरदृष्टि और निरंतरता जरूरी है। जल्दबाजी से बचकर सोच-समझकर कदम उठाना बेहतर परिणामों की दिशा में मदद कर सकता है।"
  },
  {
    id: "51",
    image: img51,
    date: "Nov 12, 2025",
    title: "Staying Calm While Facing Life's Challenges",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, चुनौतियों के समय धैर्य और स्पष्ट सोच बनाए रखना महत्वपूर्ण है। परिस्थितियों का शांतिपूर्वक आकलन करके समाधान की ओर बढ़ना समझदारी है।"
  },
  {
    id: "52",
    image: img52,
    date: "Nov 12, 2025",
    title: "Karma, Effort and the Path to Progress",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, कर्म और मेहनत को जीवन में विशेष महत्व दिया गया है। सकारात्मक सोच के साथ अपने कर्तव्यों का पालन करना आगे बढ़ने का अच्छा आधार बनता है।"
  },
  {
    id: "53",
    image: img53,
    date: "Nov 12, 2025",
    title: "Understanding Personality Through Astrological Traditions",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि पारंपरिक ज्योतिष में जन्मकुंडली के ग्रहों से स्वभाव और रुचियों की व्याख्या की जाती है। इसे आत्मविश्लेषण के एक पारंपरिक दृष्टिकोण के रूप में समझना चाहिए।"
  },
  {
    id: "54",
    image: img54,
    date: "Nov 12, 2025",
    title: "Planetary Cycles and Personal Development",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की दशा और गोचर को ज्योतिष में जीवन के अलग-अलग चरणों से जोड़कर देखा जाता है। हर चरण में सीखने और स्वयं को बेहतर बनाने का अवसर रहता है।"
  },
  {
    id: "53",
    image: img53,
    date: "Nov 12, 2025",
    title: "Self-Awareness During Times of Change",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, बदलाव के दौर में अपनी प्राथमिकताओं को समझना जरूरी है। आत्मविश्वास, धैर्य और सही सलाह के साथ नए हालात का सामना किया जा सकता है।"
  },
  {
    id: "53",
    image: img53,
    date: "Nov 12, 2025",
    title: "Strengthening Focus Through Calm and Clarity",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि मन को एकाग्र रखने के लिए नियमित दिनचर्या और स्पष्ट लक्ष्य उपयोगी होते हैं। ध्यान और सकारात्मक आदतें कठिन समय में संतुलन बनाए रखने में मदद कर सकती हैं।"
  },
  {
    id: "54",
    image: img54,
    date: "Nov 12, 2025",
    title: "Exploring New Directions with Confidence",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, नए अवसरों पर विचार करते समय अपनी क्षमता और परिस्थितियों का आकलन करना चाहिए। सोच-समझकर उठाया गया कदम आगे की राह को स्पष्ट कर सकता है।"
  },
  {
    id: "55",
    image: img55,
    date: "Nov 12, 2025",
    title: "The Importance of Mindful Daily Habits",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, अनुशासित दिनचर्या और अच्छे संस्कार जीवन को व्यवस्थित बनाने में सहायक होते हैं। छोटे-छोटे सकारात्मक प्रयास समय के साथ उपयोगी बदलाव ला सकते हैं।"
  },
  {
    id: "56",
    image: img56,
    date: "Nov 12, 2025",
    title: "Astrology and the Art of Making Wise Choices",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि निर्णय लेते समय जानकारी, अनुभव और विवेक को प्राथमिकता देनी चाहिए। ज्योतिषीय विचारों को मार्गदर्शन के एक पारंपरिक स्रोत के रूप में देखा जा सकता है।"
  },
  {
    id: "57",
    image: img57,
    date: "Nov 12, 2025",
    title: "A Closer Look at the Influence of Jupiter",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, गुरु ग्रह को ज्ञान, नैतिकता और सद्गुरु के मार्गदर्शन से जोड़ा जाता है। अध्ययन और अच्छी संगति से जीवन में सकारात्मक सीख मिल सकती है।"
  },
  {
    id: "58",
    image: img58,
    date: "Nov 12, 2025",
    title: "Building Strong Relationships Through Understanding",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, रिश्तों में संवाद, विश्वास और धैर्य का महत्व हमेशा बना रहता है। एक-दूसरे की बात सुनना और सम्मान देना आपसी संबंधों को बेहतर बनाता है।"
  },
  {
    id: "59",
    image: img59,
    date: "Nov 12, 2025",
    title: "The Role of Discipline in Achieving Goals",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि लक्ष्य तक पहुंचने के लिए नियमित मेहनत और समय का सही उपयोग जरूरी है। अनुशासन व्यक्ति को कठिनाइयों के बावजूद लगातार प्रयास करते रहने की प्रेरणा देता है।"
  },
  {
    id: "60",
    image: img60,
    date: "Nov 12, 2025",
    title: "Creativity, Inspiration and the Planet Venus",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, शुक्र ग्रह को सौंदर्य, संगीत और रचनात्मक अभिव्यक्ति से संबंधित माना जाता है। कला और सकारात्मक रुचियां जीवन में आनंद और संतुलन बढ़ा सकती हैं।"
  },
  {
    id: "61",
    image: img61,
    date: "Nov 12, 2025",
    title: "The Sun and the Spirit of Leadership",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, सूर्य नेतृत्व, आत्मसम्मान और स्पष्ट उद्देश्य का प्रतीक है। अच्छा नेतृत्व दूसरों को साथ लेकर चलने और जिम्मेदारी निभाने से विकसित होता है।"
  },
  {
    id: "62",
    image: img62,
    date: "Nov 12, 2025",
    title: "Mars and the Courage to Take Initiative",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि मंगल को पराक्रम और पहल करने की क्षमता से जोड़ा जाता है। किसी काम की शुरुआत करते समय साहस के साथ सही योजना बनाना जरूरी है।"
  },
  {
    id: "63",
    image: img63,
    date: "Nov 12, 2025",
    title: "Mercury's Message: Think Clearly, Speak Wisely",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, बुध संवाद और तार्किक सोच का प्रतिनिधित्व करता है। महत्वपूर्ण बातचीत में स्पष्ट शब्दों और तथ्यों के साथ अपनी बात रखना लाभदायक रहता है।"
  },
  {
    id: "64",
    image: img64,
    date: "Nov 12, 2025",
    title: "Moon Signs and the Language of Emotions",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, चंद्रमा की स्थिति को वैदिक ज्योतिष में मन और भावनाओं से जोड़कर देखा जाता है। अपनी भावनाओं को समझना और संतुलित प्रतिक्रिया देना महत्वपूर्ण है।"
  },
  {
    id: "65",
    image: img65,
    date: "Nov 12, 2025",
    title: "Rahu-Ketu: Lessons in Detachment and Awareness",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि राहु-केतु को इच्छाओं, मोह और वैराग्य के प्रतीक के रूप में समझा जाता है। आत्ममंथन व्यक्ति को अपनी प्राथमिकताएं स्पष्ट करने में मदद कर सकता है।"
  },
  {
    id: "66",
    image: img66,
    date: "Nov 12, 2025",
    title: "Making Progress One Step at a Time",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, निरंतर छोटे प्रयास भी बड़े लक्ष्यों की ओर ले जा सकते हैं। धैर्य, मेहनत और अपनी प्रगति की समीक्षा करना जरूरी है।"
  },
  {
    id: "67",
    image: img67,
    date: "Nov 12, 2025",
    title: "Traditional Astrology and the Value of Good Guidance",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, अनुभवी मार्गदर्शन से व्यक्ति अपने प्रश्नों पर नए दृष्टिकोण से विचार कर सकता है। किसी भी सलाह को समझदारी और व्यक्तिगत परिस्थितियों के साथ परखना चाहिए।"
  },
  {
    id: "68",
    image: img68,
    date: "Nov 12, 2025",
    title: "Shani's Influence: Commitment and Perseverance",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि शनि को कर्मफल, अनुशासन और धैर्य से संबंधित माना जाता है। निरंतर अभ्यास और ईमानदार प्रयास जीवन की महत्वपूर्ण सीख हैं।"
  },
  {
    id: "69",
    image: img69,
    date: "Nov 12, 2025",
    title: "A Fresh Perspective on Growth and Opportunity",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, जीवन में आगे बढ़ने के लिए नए विचारों को अपनाना और अनुभवों से सीखना आवश्यक है। अवसरों का लाभ लेने से पहले उनकी सही परख करनी चाहिए।"
  },
  {
    id: "70",
    image: img70,
    date: "Nov 12, 2025",
    title: "Nurturing Peace Through Prayer and Meditation",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, प्रार्थना और ध्यान से व्यक्ति अपने विचारों को शांत करने का प्रयास कर सकता है। नियमित साधना आत्मिक अनुशासन और सकारात्मक दृष्टिकोण को बढ़ावा देती है।"
  },
  {
    id: "71",
    image: img71,
    date: "Nov 12, 2025",
    title: "Balancing Ambition with Humility",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि ऊंचे लक्ष्य रखने के साथ विनम्रता और सीखने की भावना भी जरूरी है। सफलता के सफर में सहयोग और कृतज्ञता को महत्व देना चाहिए।"
  },
  {
    id: "72",
    image: img72,
    date: "Nov 12, 2025",
    title: "Understanding Change Through Vedic Astrology",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, वैदिक ज्योतिष में गोचर और दशाओं के माध्यम से समय के बदलावों का अध्ययन किया जाता है। इन विचारों के साथ व्यावहारिक निर्णय लेना भी आवश्यक है।"
  },
  {
    id: "73",
    image: img73,
    date: "Nov 12, 2025",
    title: "Building Confidence Through Knowledge and Experience",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ज्ञान और अनुभव आत्मविश्वास को मजबूत आधार देते हैं। लगातार सीखना, प्रश्न पूछना और अभ्यास करना व्यक्ति की क्षमता को निखार सकता है।"
  },
  {
    id: "74",
    image: img74,
    date: "Nov 12, 2025",
    title: "A Positive Outlook for the Journey Ahead",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) बताते हैं कि आशावादी दृष्टिकोण मुश्किल परिस्थितियों में भी समाधान खोजने की प्रेरणा देता है। धैर्य और कर्म के साथ आगे बढ़ना जीवन का महत्वपूर्ण संदेश है।"
  },
  {
    id: "75",
    image: img75,
    date: "Nov 12, 2025",
    title: "Astrological Perspective on New Possibilities",
    description: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की पारंपरिक व्याख्या नए विकल्पों पर विचार करने का अवसर देती है। सही जानकारी, धैर्य और मेहनत के साथ आगे की योजना बनाना जरूरी है।"
  },






]

const PAGE_SIZE = 4;

const getImage = (item) => {
  const value =
    item?.imageUrl ||
    item?.image_url ||
    item?.imageURL ||
    item?.thumbnailUrl ||
    item?.thumbnail ||
    item?.coverImage ||
    item?.photo ||
    item?.image ||
    "";

  // Some deployments return a relative path; make it resolve against the API.
  if (typeof value === "string" && value.startsWith("/")) {
    return `${API_BASE_URL}${value}`;
  }
  if (value && typeof value === "object") return value.url || value.secure_url || "";
  return typeof value === "string" ? value : "";
};

const getPublishedDate = (item) =>
  item?.publishedAt || item?.publishDate || item?.publishedDate || item?.createdAt || item?.date || null;

const formatDate = (value) => {
  if (!value) return "PRESS COVERAGE";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "PRESS COVERAGE";
  return date
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    .toUpperCase();
};

const getDescription = (item) =>
  item?.description ||
  item?.excerpt ||
  item?.summary ||
  (typeof item?.content === "string" ? item.content : "") ||
  "Read the latest news and media update about Pandit Purushottam Gaur.";

const extractRecords = (payload) => {
  if (Array.isArray(payload)) return payload;
  const possibleLists = [
    payload?.pressReleases,
    payload?.pressRelease,
    payload?.news,
    payload?.items,
    payload?.results,
    payload?.data,
  ];
  for (const candidate of possibleLists) {
    if (Array.isArray(candidate)) return candidate;
    if (candidate && typeof candidate === "object" && (candidate.title || candidate.name)) {
      return [candidate];
    }
  }
  return [];
};

const normaliseApiRecord = (item, index) => ({
  ...item,
  id: item?._id || item?.id || `api-press-${index}`,
  image: getImage(item),
  publishedAt: getPublishedDate(item),
  description: getDescription(item),
  category: item?.category || item?.type || "Press Release",
  name: item?.name || item?.author || item?.source || "Pandit Purushottam Gaur",
  dateLabel: item?.dateLabel || formatDate(getPublishedDate(item)),
  isApiRecord: true,
});

const PressRelease = () => {
  const [apiReleases, setApiReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRelease, setSelectedRelease] = useState(null);

  const loadPressReleases = useCallback(async ({ background = false } = {}) => {
    if (background) setIsRefreshing(true);
    else setIsLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.PRESS_RELEASE);
      const records = extractRecords(response?.data)
        .filter((item) => item && (item.title || item.name))
        .map(normaliseApiRecord)
        .sort((a, b) => {
          const aDate = new Date(getPublishedDate(a) || 0).getTime() || 0;
          const bDate = new Date(getPublishedDate(b) || 0).getTime() || 0;
          return bDate - aDate;
        });
      setApiReleases(records);
      setApiError("");
      setLastUpdated(new Date());
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Live press releases could not be loaded. Showing the featured media items instead."
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPressReleases();
  }, [loadPressReleases]);

  // When users return to this tab after publishing an item in the admin panel,
  // quietly refresh so new press releases appear without a manual page reload.
  useEffect(() => {
    const refreshOnFocus = () => {
      if (document.visibilityState === "visible") loadPressReleases({ background: true });
    };
    window.addEventListener("focus", refreshOnFocus);
    document.addEventListener("visibilitychange", refreshOnFocus);
    return () => {
      window.removeEventListener("focus", refreshOnFocus);
      document.removeEventListener("visibilitychange", refreshOnFocus);
    };
  }, [loadPressReleases]);

  const pressReleases = useMemo(() => {
    // Dynamic API items come before fallback coverage, so newly published
    // stories are immediately visible on the first page.
    const combined = [...apiReleases, ...localPressReleases];
    const seenIds = new Set();
    const seenTitles = new Set();
    return combined.filter((item) => {
      const id = String(item.id || item._id || "");
      const title = String(item.title || item.name || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
      if (!title || seenIds.has(id) || seenTitles.has(title)) return false;
      seenIds.add(id);
      seenTitles.add(title);
      return true;
    });
  }, [apiReleases]);

  const categories = useMemo(() => {
    const categoryNames = pressReleases
      .map((item) => String(item.category || "").trim())
      .filter(Boolean);
    return ["All", ...new Set(categoryNames)];
  }, [pressReleases]);

  const filteredReleases = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return pressReleases.filter((item) => {
      const categoryMatches = activeCategory === "All" || item.category === activeCategory;
      const searchableText = [item.title, item.description, item.category, item.name, item.author]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return categoryMatches && (!query || searchableText.includes(query));
    });
  }, [pressReleases, searchTerm, activeCategory]);

  const pageCount = Math.max(1, Math.ceil(filteredReleases.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, pageCount);
  const pagedReleases = filteredReleases.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }, [currentPage, pageCount]);

  useEffect(() => {
    if (!selectedRelease) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedRelease(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedRelease]);

  return (
    <main className="press-page">
      <section className="press-page-intro" aria-label="Press release introduction">
        <img src={divider} alt="" className="press-divider" />
        <p>Stay updated with our latest news, astrological insights, and celestial events.</p>
      </section>

      <section className="press-listing" aria-labelledby="recent-press-heading">
        <div className="press-listing-heading-row">
          <div>
            <h1 id="recent-press-heading">Recent Press Releases</h1>
            <p className="press-listing-subtitle">
              News, newspaper features and media coverage of Pandit Purushottam Gaur.
            </p>
          </div>
          <button
            type="button"
            className="press-refresh-button"
            onClick={() => loadPressReleases({ background: true })}
            disabled={isRefreshing}
          >
            <FaSyncAlt className={isRefreshing ? "press-refresh-spinning" : ""} aria-hidden="true" />
            {isRefreshing ? "Refreshing…" : "Refresh news"}
          </button>
        </div>

        <div className="press-tools" aria-label="Filter press releases">
          <label className="press-search-box">
            <FaSearch aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search headlines, news, categories…"
              aria-label="Search press releases"
            />
            {searchTerm && (
              <button type="button" className="press-search-clear" onClick={() => setSearchTerm("")} aria-label="Clear search">
                <FaTimes />
              </button>
            )}
          </label>
          <label className="press-category-filter">
            <span>Category</span>
            <select value={activeCategory} onChange={(event) => setActiveCategory(event.target.value)} aria-label="Filter by category">
              {categories.map((category) => <option value={category} key={category}>{category === "All" ? "All coverage" : category}</option>)}
            </select>
          </label>
        </div>

        <div className="press-results-line" aria-live="polite">
          <span>{filteredReleases.length} {filteredReleases.length === 1 ? "story" : "stories"}</span>
          {lastUpdated && <span>Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>}
        </div>

        {apiError && !isLoading && (
          <div className="press-feed-notice" role="status">
            <span>{apiError}</span>
            <button type="button" onClick={() => loadPressReleases({ background: true })}>Try again</button>
          </div>
        )}

        {isLoading ? (
          <div className="press-loading-grid" aria-label="Loading press releases">
            {Array.from({ length: PAGE_SIZE }, (_, index) => (
              <div className="press-skeleton-card" key={index}>
                <span className="press-skeleton-image" />
                <span className="press-skeleton-line short" />
                <span className="press-skeleton-line" />
                <span className="press-skeleton-line" />
                <span className="press-skeleton-line medium" />
              </div>
            ))}
          </div>
        ) : pagedReleases.length > 0 ? (
          <div className="press-news-grid">
            {pagedReleases.map((item, index) => {
              const releaseImage = item.image || getImage(item);
              const date = item.dateLabel || formatDate(getPublishedDate(item));
              return (
                <motion.article
                  className="press-news-card"
                  key={item.id || item._id || item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.05 }}
                >
                  <button
                    className="press-news-image-button"
                    type="button"
                    onClick={() => setSelectedRelease(item)}
                    aria-label={`Read ${item.title || "press release"}`}
                  >
                    {releaseImage ? (
                      <img src={releaseImage} alt={item.title || "Press release"} loading="lazy" />
                    ) : (
                      <span className="press-news-image-placeholder">Press Release</span>
                    )}
                  </button>
                  <div className="press-news-card-body">
                    <span className="press-news-date"><FaCalendarAlt aria-hidden="true" /> {date}</span>
                    <h2>{item.title || item.name || "Press Release"}</h2>
                    <p>{getDescription(item)}</p>
                    <button className="press-news-read-more" type="button" onClick={() => setSelectedRelease(item)}>
                      Read full release <FaArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="press-empty-state">
            <div className="press-empty-icon"><FaSearch aria-hidden="true" /></div>
            <h2>No press releases found</h2>
            <p>Try a different search term or choose another category.</p>
            <button type="button" onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}>
              Clear filters
            </button>
          </div>
        )}

        {filteredReleases.length > PAGE_SIZE && !isLoading && (
          <nav className="press-pagination" aria-label="Press release pages">
            <button
              type="button"
              className="press-page-button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safePage === 1}
            >
              <FaArrowLeft aria-hidden="true" /> Prev
            </button>
            <span className="press-page-count">Page {safePage} of {pageCount}</span>
            <button
              type="button"
              className="press-page-button"
              onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
              disabled={safePage === pageCount}
            >
              Next <FaArrowRight aria-hidden="true" />
            </button>
          </nav>
        )}

        {!apiReleases.length && !isLoading && !apiError && (
          <p className="press-fallback-note">
            Showing featured media coverage. Publish a new item from <Link to="/admin">Admin Dashboard → Press Releases</Link> and it will appear here automatically.
          </p>
        )}
      </section>

      {selectedRelease && (
        <div
          className="press-release-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedRelease(null);
          }}
        >
          <article className="press-release-modal" role="dialog" aria-modal="true" aria-labelledby="press-release-modal-title">
            <button className="press-release-modal-close" type="button" onClick={() => setSelectedRelease(null)} aria-label="Close press release">
              <FaTimes />
            </button>
            {(selectedRelease.image || getImage(selectedRelease)) && (
              <img
                className="press-release-modal-image"
                src={selectedRelease.image || getImage(selectedRelease)}
                alt={selectedRelease.title || "Press release"}
              />
            )}
            <div className="press-release-modal-body">
              <span className="press-news-date"><FaCalendarAlt aria-hidden="true" /> {selectedRelease.dateLabel || formatDate(getPublishedDate(selectedRelease))}</span>
              <h2 id="press-release-modal-title">{selectedRelease.title || selectedRelease.name || "Press Release"}</h2>
              <p>{getDescription(selectedRelease)}</p>
              {selectedRelease.category && <span className="press-modal-category">{selectedRelease.category}</span>}
              <span className="press-release-modal-author">{selectedRelease.name || selectedRelease.author || "Pandit Purushottam Gaur"}</span>
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default PressRelease;
