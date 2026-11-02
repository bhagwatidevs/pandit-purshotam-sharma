
import React, { useEffect, useRef, useState } from 'react';
import shape from "../../Front/assest/imgs/shape.svg"
import downlod from "../../Front/assest/imgs/download.png"
import crad1 from "../..//Front/assest/imgs/card-img.png"
import crad2 from "../..//Front/assest/imgs/card-img2.png"
import crad3 from "../..//Front/assest/imgs/card-img3.png"
import crad4 from "../..//Front/assest/imgs/card-img4.png"
import crad5 from "../..//Front/assest/imgs/card-img5.png"
import crad6 from "../..//Front/assest/imgs/card-img6.png"
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import { motion } from "framer-motion";
import clientimg1 from "../../Front/assest/imgs/clientimg1.png"
import clientimg2 from "../../Front/assest/imgs/clientimg2.png"
import clientimg3 from "../../Front/assest/imgs/clientimg3.png"
import clientimg4 from "../../Front/assest/imgs/clientimg4.png"
import bgbannere2 from "../..//Front/assest/imgs/bg5.jpg"
// import bgstarimg from "../..//Front/assest/imgs/choose.png"
import guruji from "../..//Front/assest/imgs/guruji.jpeg"
import { FaStarOfDavid } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
const localTestimonials = [
    {
           id: 1,
           name: "Aarav Mehta",
           role: "Astrologer",
           image: `${clientimg1}`,
           text: "Doctor pandit Purshottam Gaur Ji was great in clearing the doubts and confusion that I had related to my future and personal life. Gained more confidence and I am better prepared now by getting an insight into the future. Very calm and composed human being. Answers are your questions and doesn’t rush. I would highly recommend Mahesh Ji for consultation s🙏",
       },
       {
           id: 2,
           name: "Rohan Nair",
           role: "Tarot Reader",
           image: `${clientimg2}`,
           text: "At pandit purshottam gaur jyotish kendra Had a great experience with him.. got adapt guidance regarding all the doubts i had in my life.. would highly recommend people to come to him for guidance related to career or life. Has a humble nature and talks to the client with lot of patience. ",
       },
       {
           id: 3,
           name: "Rahul Bansal",
           role: "Numerologist",
           image: `${clientimg3}`,
           text: "Pandit Purshottam Gaur ji is an excellent teacher .i gound his teaching very Easy to learn . He give very nice practical examples that help understand the topic easily . It was an amzing experience to learn Astrology from him . Pandit purshottam Gaur ji was very helpful in guiding me and helping to answer any queries I had .Thank you very much ."
       },
       {
           id: 4,
           name: "Vikram Joshi",
           role: "Palm Reader",
           image: `${clientimg4}`,
           text: "highly experienced and knowledgeable astrologer offering accurate predictions, practical remedies, and spiritual guidance based on Vedic Astrology. With deep understanding of horoscopes, planetary positions, and karmic influences, Pandit Ji helps individuals find the right direction in life.",
       },
   ];


const About = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [active, setActive] = useState(null);


    useEffect(() => {
        const loadTestimonials = async () => {
            try {

                setTestimonials(localTestimonials);
                setActive(localTestimonials[0]);
            } catch (error) {
                console.error("Error loading testimonials:", error);
            }
        };

        loadTestimonials();
    }, []);

    const cardData = [
        {
            title: "Astrology Consultation",
            desc: "Personal horoscope readings & planetary insights.",
            img: crad1,
             Link: "/astrologyconsultation"

        },
        {
            title: "Mantra Healing",
            desc: "Perform spiritual rituals for peace, health & prosperity.",
            img: crad2,
            Link: "/mantrahealing"
        },
        {
            title: "Pooja Service",
            desc: "Perform spiritual rituals for peace, health & prosperity.",
            img: crad3,
             Link: "/poojaservice"
        },
        {
            title: "Vastu Shastra",
            desc: "Perform spiritual rituals for peace, health & prosperity.",
            img: crad4,
             Link: "/vastushastra"
        },
        {
            title: "Numerology",
            desc: "Perform spiritual rituals for peace, health & prosperity.",
            img: crad5,
             Link: "/newbornastrology"
        },
        {
            title: "Lucky Stone Chart",
            desc: "Perform spiritual rituals for peace, health & prosperity.",
            img: crad6,
            Link: "/luckystonechart"
        },
    ];

    return (
        <>
            <div className="section-8 pt-20 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative z-10">
                    <h2 className='text-2xl'>About us</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" /> About Us
                    </p>
                </motion.div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className="section-2 px-10 pb-10 text-center">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50'>
                        It is a long established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum .
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative py-16 px-6 md:px-20">
                    <div className="w-full bg-black pb-10 md:pb-0 rounded-2xl mx-auto md:flex text-center justify-between items-center">
                        <div className="relative pb-10 md:pb-0 md:w-[50%]">
                            <div className="absolute -inset-3 bg-linear-to-tr from-orange-500/50 to-transparent rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
                            <img src={guruji} alt="" className="relative rounded-2xl border-4 border-orange-500/60 shadow-2xl" />
                        </div>
                        <div className="relative md:w-[50%] px-5 z-10">
                            <h2 className="text-4xl font-bold mb-4 uppercase">
                                <span className="text-orange-500 block mt-1">Pt. Purshotam Gaur</span>
                            </h2>
                            <p className="text-white mb-4">
                                Pandit Purshotam Sharma (Gaur), a distinguished astrologer and spiritual
                                guide, is recognized for his deep knowledge of{" "}
                                <span className="text-orange-400 font-semibold">Vedic sciences</span>{" "}
                                and astrology. His insights help individuals find clarity and direction
                                through the wisdom of ancient scriptures.
                            </p>
                            <p className="text-white mb-6">
                                Born in Bandikui near Jaipur, he was honored with the title
                                <span className="text-orange-400 font-semibold">
                                    “Brahman Ratna”
                                </span>{" "}
                                by the Bhartiya Brahman Mahasabha. Guided by his father’s teachings, he
                                mastered Vedic knowledge and continues to assist people in discovering
                                peace, success, and purpose in life.
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-10 right-10 w-24 h-24 bg-orange-500 rotate-45 opacity-40" />
                </motion.div>
            </div>
            <div className="section-3 overflow-hidden px-5 md:px-10 pb-10 text-center">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}>
                    <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
                    <div>
                        <img src={downlod} alt="" className="m-auto my-6 md:my-10 w-16 md:w-50" />
                    </div>
                    <p className="text-gray-600 text-sm md:text-base md:mx-40 lg:mx-50 mb-8">
                        We offer personalized astrology consultations, birth chart readings, and horoscope guidance to help you gain clarity and direction in life. Our expert astrologers provide insights for career, relationships, and personal growth.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="w-full">
                    <div className="bg-white py-10 overflow-hidden">
                        <div className="max-w-6xl mx-auto px-3 md:px-5">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={3}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    640: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                modules={[Pagination, Autoplay]}
                                className="mySwiper"
                            >
                                {cardData.map((item, index) => (
                                    <SwiperSlide key={index} className="flex justify-center">
                                        <div className="w-full rounded-2xl hover:bg-yellow-600 shadow-sm border border-gray-100 text-center p-6 md:p-10 hover:shadow-lg transition-all duration-300 group">
                                            <div className="flex justify-center mb-6">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="w-[220px] h-[220px] md:w-[300px] md:h-[300px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 group-hover:text-white transition-all duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm md:text-base mb-5 group-hover:text-white transition-all duration-300">
                                                {item.desc}
                                            </p>
                                            <Link to={item.Link}
                                                className="text-gray-900 font-medium flex items-center justify-center gap-2 group-hover:text-white transition-all duration-300"
                                            >
                                                Read More <span className="text-xl">→</span>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* <div className="section-4 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgbannere2})` }}>
                <div className='w-full h-[100px]' style={{ backgroundImage: `url(${shape})` }}></div>
                <div className='text-center text-white'>
                    <h2 className='text-4xl '>Why Choose Us</h2>
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50'>
                        Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore
                        etesde dolore magna aliquapspendisse and the gravida.
                    </p>
                </div>
                <div className='pt-20 pb-20 px-10 md:flex justify-between'>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]' style={{ backgroundImage: `url(${bgstarimg})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                            <p className=' text-white text-3xl font-bold p-13 ps-8 text-center'>+100</p>
                        </div>
                        <h2 className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>Trusted by Million Clients</h2>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]' style={{ backgroundImage: `url(${bgstarimg})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                            <p className=' text-white text-3xl font-bold p-13 ps-8 text-center'>+100</p>
                        </div>
                        <h2 className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>Trusted by Million Clients</h2>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]' style={{ backgroundImage: `url(${bgstarimg})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                            <p className=' text-white text-3xl font-bold p-13 ps-8 text-center'>+100</p>
                        </div>
                        <h2 className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>Trusted by Million Clients</h2>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]' style={{ backgroundImage: `url(${bgstarimg})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                            <p className=' text-white text-3xl font-bold p-13 ps-8 text-center'>+100</p>
                        </div>
                        <h2 className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>Trusted by Million Clients</h2>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]' style={{ backgroundImage: `url(${bgstarimg})`, backgroundSize: '100%', backgroundPosition: 'center' }}>
                            <p className=' text-white text-3xl font-bold p-13 ps-8 text-center'>+100</p>
                        </div>
                        <h2 className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>Trusted by Million Clients</h2>
                    </div>
                </div>
                <div className='w-full h-[100px] rotate-180' style={{ backgroundImage: `url(${shape})` }}></div>
            </div> */}
            <div className="section-5 pt-20 px-10">
                            <motion.div
                                initial={{ y: -100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className='text-center'>
                                <h2 className='text-4xl '>What My Client Say</h2>
                                <div>
                                    <img src={downlod} alt="" className='m-auto my-10' />
                                </div>
                                <p className='md:mx-50'>
                                    Astrology readings that truly resonate — accurate, insightful, and life-changing!"
                                </p>
                                <p className='md:mx-50'>
                                    Every session brings clarity and peace. The guidance has been spot-on and empowering.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ x: -150, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="w-full py-16 px-6 bg-linear-to-b from-white to-orange-50">
                                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            
            
                                    <div className="flex flex-wrap justify-center lg:w-1/2 gap-6">
                                        {testimonials.map((item) => (
                                            <img
                                                key={item.id}
                                                src={item.image}
                                                alt={item.name}
                                                onClick={() => setActive(item)}
                                                className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 cursor-pointer transition-all duration-300 ${active?.id === item.id
                                                    ? "border-orange-500 scale-110 shadow-lg"
                                                    : "border-white hover:scale-105"
                                                    }`}
                                            />
                                        ))}
                                    </div>
            
            
                                    {active && (
                                        <div className="relative lg:w-1/2 bg-linear-to-b from-orange-400 to-orange-500 text-white rounded-3xl p-8 md:p-10 shadow-xl">
                                            <p className="text-base md:text-lg italic leading-relaxed mb-6">
                                                “{active.text}”
                                            </p>
                                            <h3 className="text-xl md:text-2xl font-semibold">
                                                {active.name}{" "}
                                                <span className="text-sm md:text-base font-light">
                                                    - {active.role}
                                                </span>
                                            </h3>
                                            <div className="absolute inset-0 opacity-10 bg-no-repeat bg-right bg-contain"></div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
        </>
    )
}

export default About
