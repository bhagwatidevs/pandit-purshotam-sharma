import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStarOfDavid } from "react-icons/fa";
import downlod from "../../Front/assest/imgs/download.png";
import bg10 from "../../Front/assest/imgs/bg10.jpg";
import shape from "../../Front/assest/imgs/shape.svg";
import Pressimg from "../../Front/assest/imgs/Pressimg1.jpeg";
import Pressimg2 from "../../Front/assest/imgs/Pressimg2.jpeg";
import Pressimg3 from "../../Front/assest/imgs/Pressimg3.jpeg";
import Pressimg4 from "../../Front/assest/imgs/Pressimg4.jpeg";
import Pressimg6 from "../../Front/assest/imgs/press6.jpeg";
import Pressimg7 from "../../Front/assest/imgs/press7.jpeg";
import Pressimg8 from "../../Front/assest/imgs/press8.jpeg";
import Pressimg9 from "../../Front/assest/imgs/press9.jpeg";
import Pressimg10 from "../../Front/assest/imgs/press10.jpeg";
import Pressimg11 from "../../Front/assest/imgs/press11.jpeg";
import Pressimg12 from "../../Front/assest/imgs/press12.jpeg";
import Pressimg13 from "../../Front/assest/imgs/press13.jpeg";
import Pressimg16 from "../../Front/assest/imgs/press16.jpeg";
import Pressimg14 from "../../Front/assest/imgs/press14.jpeg";
import Pressimg17 from "../../Front/assest/imgs/press17.jpeg";
import Pressimg18 from "../../Front/assest/imgs/press18.jpeg";
import Pressimg19 from "../../Front/assest/imgs/press19.jpeg";
import img20 from "../../Front/assest/imgs/img20.jpeg";
import img21 from "../../Front/assest/imgs/img21.jpeg";
import img22 from "../../Front/assest/imgs/img22.jpeg";
import img23 from "../../Front/assest/imgs/img23.jpeg";
import img24 from "../../Front/assest/imgs/img24.jpeg";
import img25 from "../../Front/assest/imgs/img25.jpeg";
import img26 from "../../Front/assest/imgs/img26.jpeg";
import img27 from "../../Front/assest/imgs/img27.jpeg"; 
import img28 from "../../Front/assest/imgs/img28.jpeg"; 
import img29 from "../../Front/assest/imgs/img29.jpeg";
import img30 from "../../Front/assest/imgs/img30.jpeg"; 
import img31 from "../../Front/assest/imgs/img31.jpeg";
import img32 from "../../Front/assest/imgs/img32.jpeg";
import img33 from "../../Front/assest/imgs/img33.jpeg";
import img34 from "../../Front/assest/imgs/img34.jpeg";
import img35 from "../../Front/assest/imgs/img35.jpeg";
import img36 from "../../Front/assest/imgs/img36.jpeg";
import img37 from "../../Front/assest/imgs/img37.jpeg";
import img38 from "../../Front/assest/imgs/img38.jpeg";
import img39 from "../../Front/assest/imgs/img39.jpeg";
import img40 from "../../Front/assest/imgs/img40.jpeg";
import img41 from "../../Front/assest/imgs/img41.jpeg";
import img42 from "../../Front/assest/imgs/img42.jpeg";
import img43 from "../../Front/assest/imgs/img43.jpeg";
import img44 from "../../Front/assest/imgs/img44.jpeg";
import img45 from "../../Front/assest/imgs/img45.jpeg";
import img46 from "../../Front/assest/imgs/img46.jpeg";
import img47 from "../../Front/assest/imgs/img47.jpeg";
import img48 from "../../Front/assest/imgs/img48.jpeg";
import img49 from "../../Front/assest/imgs/img49.jpeg";
import img50 from "../../Front/assest/imgs/img50.jpeg";
import img51 from "../../Front/assest/imgs/img51.jpeg";
import img52 from "../../Front/assest/imgs/img52.jpeg";
import img53 from "../../Front/assest/imgs/img53.jpeg";
import img54 from "../../Front/assest/imgs/img54.jpeg";
import img55 from "../../Front/assest/imgs/img55.jpeg";
import img56 from "../../Front/assest/imgs/img56.jpeg";
import img57 from "../../Front/assest/imgs/img57.jpeg";
import img58 from "../../Front/assest/imgs/img58.jpeg";
import img59 from "../../Front/assest/imgs/img59.jpeg";
import img60 from "../../Front/assest/imgs/img60.jpeg";
import img61 from "../../Front/assest/imgs/img61.jpeg";
import img62 from "../../Front/assest/imgs/img62.jpeg";
import img63 from "../../Front/assest/imgs/img63.jpeg";
import img64 from "../../Front/assest/imgs/img64.jpeg";
import img65 from "../../Front/assest/imgs/img65.jpeg";
import img66 from "../../Front/assest/imgs/img66.jpeg";
import img67 from "../../Front/assest/imgs/img67.jpeg";
import img68 from "../../Front/assest/imgs/img68.jpeg";
import img69 from "../../Front/assest/imgs/img69.jpeg";
import img70 from "../../Front/assest/imgs/img70.jpeg";
import img71 from "../../Front/assest/imgs/img71.jpeg";
import img72 from "../../Front/assest/imgs/img72.jpeg";
import img73 from "../../Front/assest/imgs/img73.jpeg";
import img74 from "../../Front/assest/imgs/img74.jpeg";
import img75 from "../../Front/assest/imgs/img75.jpeg";



const Press = () => {
 const pressData = [
  {
    id: 1,
    img: Pressimg,
    date: "OCT 27, 2025",
    title: "Astrology Experts Reveal Powerful Alignments for November 2025",
    desc: "Pandit Purshotam Sharma (Gaur) ke anusar, November me Guru aur Shani ka yog jeevan me nayi disha pradan karega. Dharmik kriyaon ke liye yeh samay atyant shubh mana gaya hai.",
  },
  {
    id: 2,
    img: Pressimg2,
    date: "OCT 20, 2025",
    title: "Full Moon Brings New Energy in Aries",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Mesh Rashi me Poornima aatmavishwas aur nayi shuruaat laayegi. Naye prayas aur srijanatmak kaam ke liye samay anukul hai.",
  },
  {
    id: 3,
    img: Pressimg3,
    date: "SEP 15, 2025",
    title: "Planetary Changes Impacting Career Paths",
    desc: "Pandit Purshotam Sharma (Gaur) ke mutabik, Brihaspati ka Gochar vyavsay aur naukri me unnati laa sakta hai, jabki Ketu nirnay lene me saavdhani ka sanket deta hai.",
  },
  {
    id: 4,
    img: Pressimg4,
    date: "AUG 29, 2025",
    title: "Rahu & Ketu Transits: What It Means for You",
    desc: "Pandit Purshotam Sharma (Gaur) ne kaha ki Rahu-Ketu ke parivartan se rishton aur arthik sthiti me badlaav sambhav hai. Dhairya aur dharmikta banaye rakhna avashyak hai.",
  },
  {
    id: 5,
    img: Pressimg16,
    date: "JUL 10, 2025",
    title: "Solar Eclipse Brings New Opportunities",
    desc: "Pandit Purshotam Sharma (Gaur) ke anusar, Surya Grahan ke dauran jap aur dhyaan se jeevan me naye marg khul sakte hain. Ye samay aatm-chintan ka hai.",
  },
  {
    id: 6,
    img: Pressimg6,
    date: "JUN 25, 2025",
    title: "Mercury Retrograde Survival Guide",
    desc: "Budh vakri hone par sanchar aur samjhaute me kathinai aa sakti hai. Pandit Purshotam Sharma (Gaur) salah dete hain ki faisle dhairya se lein.",
  },
  {
    id: 7,
    img: Pressimg7,
    date: "MAY 18, 2025",
    title: "Venus Retrograde & Love Alignment",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Shukra vakri hone se prem sambandhon me pariksha ka samay ho sakta hai. Samajhdari aur vishwas se kaam lena uchit hai.",
  },
  {
    id: 8,
    img: Pressimg8,
    date: "APR 02, 2025",
    title: "New Moon & Manifestation Rituals",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Amavasya ke din manokamna purti ke liye sankalp aur sadhana atyant prabhavshali hoti hai.",
  },
  {
    id: 9,
    img: Pressimg9,
    date: "MAR 22, 2025",
    title: "Mars and Saturn Conjunction Brings Challenge",
    desc: "Pandit Purshotam Sharma (Gaur) ke anusar, Mangal aur Shani ka yog vyakti ke karyakshetra me chunautiyan la sakta hai. Shant aur dhairyashil rehna zaruri hai.",
  },
  {
    id: 10,
    img: Pressimg10,
    date: "MAR 03, 2025",
    title: "Pisces Season Awakens Inner Intuition",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Meen Rashi ka samay aatm-chintan aur antar-gyan badhane ke liye upyukt hai.",
  },
  {
    id: 11,
    img: Pressimg11,
    date: "FEB 14, 2025",
    title: "Valentine’s Day Brings Venus Blessings",
    desc: "Pandit Purshotam Sharma (Gaur) batate hain ki Shukra ke prabhav se prem aur samarpan ka yog ban raha hai. Rishte majboot hone ki sambhavna hai.",
  },
  {
    id: 12,
    img: Pressimg12,
    date: "JAN 31, 2025",
    title: "Saturn Transit in Aquarius: Big Shifts Ahead",
    desc: "Pandit Purshotam Sharma (Gaur) ke mutabik, Shani Dev ke Kumbh me pravesh se karm aur dayitva ka samay aarambh ho raha hai. Mehnat safalta degi.",
  },
  {
    id: 13,
    img: Pressimg13,
    date: "JAN 10, 2025",
    title: "Capricorn New Moon Sets Practical Goals",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki ye Amavasya vyavaharik lakshyon ko sakar karne ka shubh samay hai.",
  },
  {
    id: 14,
    img: Pressimg14,
    date: "DEC 21, 2024",
    title: "Winter Solstice Energy and Cosmic Renewal",
    desc: "Pandit Purshotam Sharma (Gaur) ke anusar, ayanant kaal vyakti ko atma-shakti aur dhairya pradan karta hai. Is din dhyaan karna labhdayak hai.",
  },

  {
    id: 16,
    img: Pressimg17,
    date: "NOV 23, 2024",
    title: "Lunar Eclipse Insights Explained",
    desc: "Pandit Purshotam Sharma (Gaur) batate hain ki Chandra Grahan ke samay antar-mukh rehna aur man ki shuddhata banaye rakhna shubh hota hai.",
  },
  {
    id: 17,
    img: Pressimg18,
    date: "OCT 11, 2024",
    title: "Navratri Planetary Effects",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Navratri ke dauran Devi Upasana aur sankalp safalta deti hai. Grahon ka yog shakti prad hai.",
  },
  {
    id: 18,
    img: Pressimg19,
    date: "SEP 01, 2024",
    title: "Sun and Mercury Combine for Mental Strength",
    desc: "Pandit Purshotam Sharma (Gaur) ke mutabik, Surya-Budh ka yog buddhi aur sanchar me bal pradan karega. Vidyarthiyon ke liye yeh samay anukul hai.",
  },
  {
    id: 19,
    img: Pressimg,
    date: "AUG 12, 2024",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Simha Rashi ke grah aatmavishwas aur netrutva gunon ko majboot karte hain.",
  },
   {
    id: 20,
    img: img20,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Simha Rashi ke grah aatmavishwas aur netrutva gunon ko majboot karte hain.",
  },
  
  {
    id: 21,
    img: img21,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "Pandit Purshotam Sharma (Gaur) kehte hain ki Simha Rashi ke grah aatmavishwas aur netrutva gunon ko majboot karte hain.",
  },
    {
    id: 22,
    img: img22,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 23,
    img: img23,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
     {
    id: 24,
    img: img24,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
     {
    id: 25,
    img: img25,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 26,
    img: img26,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 27,
    img: img27,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 28,
    img: img28,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 29,
    img: img29,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 30,
    img: img30,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 31,
    img: img31,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 32,
    img: img32,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 33,
    img: img33,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
    {
    id: 34,
    img: img34,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 35,
    img: img35,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 36,
    img: img36,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 37,
    img: img37,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 38,
    img: img38,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 39,
    img: img39,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 40,
    img: img40,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 41,
    img: img41,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 42,
    img: img42,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 43,
    img: img43,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 44,
    img: img44,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 45,
    img: img45,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 46,
    img: img46,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 47,
    img: img47,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 48,
    img: img48,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 49,
    img: img49,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 50,
    img: img50,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 51,
    img: img51,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 52,
    img: img52,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
   {
    id: 53,
    img: img53,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 54,
    img: img54,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 53,
    img: img53,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 53,
    img: img53,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 54,
    img: img54,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 55,
    img: img55,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 56,
    img: img56,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 57,
    img: img57,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 58,
    img: img58,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 59,
    img: img59,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 60,
    img: img60,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 61,
    img: img61,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 62,
    img: img62,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 63,
    img: img63,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 64,
    img: img64,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 65,
    img: img65,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 66,
    img: img66,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 67,
    img: img67,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 68,
    img: img68,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 69,
    img: img69,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 70,
    img: img70,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 71,
    img: img71,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 72,
    img: img72,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 73,
    img: img73,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 74,
    img: img74,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  {
    id: 75,
    img: img75,
    date: "Nov 12, 2025",
    title: "Leo Season Boosts Confidence and Leadership",
    desc: "ज्योतिषाचार्य पंडित पुरुषोत्तम गौड़ (गोल्ड मेडलिस्ट) के अनुसार, ग्रहों की स्थिति और उनका प्रभाव व्यक्ति के आत्मविश्वास, निर्णय क्षमता तथा जीवन के विभिन्न पहलुओं पर गहरा असर डालता है।"
  },
  
];


  

  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(pressData.length / itemsPerPage);

  const startIndex = page * itemsPerPage;
  const currentItems = pressData.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () =>
    setPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
   <>

    <div
        className="section-8 pt-20 pb-30 text-center text-white relative overflow-hidden"
        style={{ backgroundImage: `url(${bg10})`, backgroundSize: "100%", backgroundPosition: "right" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <h2 className="text-2xl">Press Release</h2>
          <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
            Home <FaStarOfDavid className="mx-2" />
            Press Release
          </p>
        </motion.div>
      </div>

      {/* Shape Divider */}
      <div
        className="w-full h-[100px] rotate-180 mt-[-90px]"
        style={{ backgroundImage: `url(${shape})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      ></div>

      {/* Download Icon + Text */}
      <div className="overflow-hidden text-center">
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <img src={downlod} alt="" className="m-auto my-10" />
          </div>
          <p className="md:mx-50">
            Stay updated with our latest news, astrological insights, and celestial events.
          </p>
        </motion.div>
      </div>

    <div className="overflow-hidden section-11 max-w-6xl mx-auto px-6 pb-16 text-center">
      {/* ✅ Header Section */}
     
      {/* ✅ Press Grid */}
      <h2 className="text-2xl font-bold mb-10 text-gray-900 mt-10">
        Recent Press Releases
      </h2>

      <motion.div
        key={page}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-[230px] object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-orange-500 font-semibold mb-1">
                {item.date}
              </p>
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ✅ Pagination Buttons */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={prevPage}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          ← Prev
        </button>
        <span className="text-gray-700 font-medium">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Next →
        </button>
      </div>
    </div>
   </>
  );
};

export default Press;
