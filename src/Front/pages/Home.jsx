import React, { useEffect, useRef, useState } from 'react';
import bgbannere from "../../Front/assest/imgs/bg-bannere.jpg"
import handbg from "../../Front/assest/imgs/hand_bg.png"
import { motion } from "framer-motion";
import shape from "../../Front/assest/imgs/shape.svg"
import downlod from "../../Front/assest/imgs/download.png"
import aboutimg from "../../Front/assest/imgs/about.svg"
import crad1 from "../..//Front/assest/imgs/card-img.png"
import crad2 from "../..//Front/assest/imgs/card-img2.png"
import crad3 from "../..//Front/assest/imgs/card-img3.png"
import crad4 from "../..//Front/assest/imgs/card-img4.png"
import crad5 from "../..//Front/assest/imgs/card-img5.png"
import crad6 from "../..//Front/assest/imgs/card-img6.png"
import crad7 from "../..//Front/assest/imgs/card-img7.png"
import crad8 from "../..//Front/assest/imgs/card-img8.png"
import crad9 from "../..//Front/assest/imgs/card-img9.png"
import crad10 from "../..//Front/assest/imgs/card-img10.png"
import crad11 from "../..//Front/assest/imgs/card-img11.png"
import crad12 from "../..//Front/assest/imgs/card-img12.png"
import bgbannere2 from "../..//Front/assest/imgs/bg5.jpg"
import gallery1 from "../../Front/assest/imgs/gallery-3.jpeg"
import bgstarimg from "../..//Front/assest/imgs/choose.png"
import bgstarimg2 from "../..//Front/assest/imgs/choose2.png"
import bgstarimg3 from "../..//Front/assest/imgs/choose3.png"
import bgstarimg4 from "../..//Front/assest/imgs/choose4.png"
import bgstarimg5 from "../..//Front/assest/imgs/choose5.png"
import ringImg from "../..//Front/assest/imgs/prod1.jpg"
import ringImg2 from "../..//Front/assest/imgs/prod2.jpg"
import ringImg3 from "../..//Front/assest/imgs/prod3.jpg"
import ringImg4 from "../..//Front/assest/imgs/prod4.jpg"
import guruji from "../..//Front/assest/imgs/guruji.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import blog4 from "../../Front/assest/imgs/blog4.webp"
import blog5 from "../../Front/assest/imgs/blog5.webp"
import clientimg1 from "../../Front/assest/imgs/clientimg1.png"
import clientimg2 from "../../Front/assest/imgs/clientimg2.png"
import clientimg3 from "../../Front/assest/imgs/clientimg3.png"
import clientimg4 from "../../Front/assest/imgs/clientimg4.png"
import sampleVideo from "../../Front/assest/imgs/WhatsApp .mp4"
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

import Swal from "sweetalert2";
import Kundliimg from "../../Front/assest/imgs/Kundliimg.jpeg"
import { GiStarSwirl } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaComment, FaEye, FaShoppingCart, FaStar, FaUserAlt } from 'react-icons/fa';
import { BiHeart } from 'react-icons/bi';
import { IoIosShuffle } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../../context/CartContext";
import { API_ENDPOINTS } from '../../config/api';

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



const Home = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const onAutoplayTimeLeft = (s, time, progress) => {
    };

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        dateOfBirth: "",
        timeOfBirth: "",
        placeOfBirth: "",
        country: "",
        state: "",
        maritalStatus: "",
        occupation: "",
        serviceType: "",
        phone: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [active, setActive] = useState(null);
    const [products, setProducts] = useState([
        {
            _id: '1',
            name: 'Rudraksha Mala',
            price: 1500,
            oldprice: 2000,
            imageUrl: ringImg
        },
        {
            _id: '2', 
            name: 'Gemstone Ring',
            price: 5000,
            oldprice: 7000,
            imageUrl: ringImg2
        },
        {
            _id: '3',
            name: 'Yantra Set', 
            price: 2500,
            oldprice: 3500,
            imageUrl: ringImg3
        },
        {
            _id: '4',
            name: 'Puja Kit',
            price: 1200, 
            oldprice: 1800,
            imageUrl: ringImg4
        }
    ]);
    const [blogs, setBlogs] = useState([
        {
            _id: '1',
            name: 'Pandit Purshotam Gaur',
            title: 'Understanding Your Birth Chart',
            category: 'Astrology Basics',
            description: 'Learn how to read and interpret your birth chart for better life insights.',
            imageUrl: blog4,
            createdAt: new Date().toISOString()
        },
        {
            _id: '2',
            name: 'Pandit Purshotam Gaur',
            title: 'Planetary Remedies for Success', 
            category: 'Remedies',
            description: 'Discover powerful planetary remedies to overcome obstacles and achieve success.',
            imageUrl: blog5,
            createdAt: new Date().toISOString()
        }
    ]);
    const [photos, setPhotos] = useState([
        {
            _id: '1',
            imageUrl: gallery1
        },
        {
            _id: '2', 
            imageUrl: guruji
        },
        {
            _id: '3',
            imageUrl: Kundliimg
        },
        {
            _id: '4',
            imageUrl: blog4
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Set testimonials data
                setTestimonials(localTestimonials);
                setActive(localTestimonials[0]);
                
                // Try to fetch API data with individual error handling
                const apiCalls = [
                    axios.get(API_ENDPOINTS.PRODUCT).catch(err => {
                        console.log('Products API failed, using fallback data');
                        return { data: null };
                    }),
                    axios.get(API_ENDPOINTS.BLOG).catch(err => {
                        console.log('Blog API failed, using fallback data');
                        return { data: null };
                    }),
                    axios.get(API_ENDPOINTS.PHOTO).catch(err => {
                        console.log('Photos API failed, using fallback data');
                        return { data: null };
                    })
                ];
                
                const [productsRes, blogsRes, photosRes] = await Promise.all(apiCalls);
                
                // Only update if API returned valid data
                if (productsRes.data && Array.isArray(productsRes.data) && productsRes.data.length > 0) {
                    setProducts(productsRes.data.slice(0, 4));
                }
                if (blogsRes.data && Array.isArray(blogsRes.data) && blogsRes.data.length > 0) {
                    setBlogs(blogsRes.data.slice(0, 2));
                }
                if (photosRes.data && Array.isArray(photosRes.data) && photosRes.data.length > 0) {
                    setPhotos(photosRes.data.slice(0, 4));
                }
                
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login to generate Kundli');
                navigate('/login');
                return;
            }

            // Use formData directly as it already has placeOfBirth
            const kundliData = {
                name: formData.name,
                dateOfBirth: formData.dateOfBirth,
                timeOfBirth: formData.timeOfBirth,
                placeOfBirth: formData.placeOfBirth
            };

            // Redirect to payment page with form data
            navigate('/kundli-payment', { state: { kundliData } });
        } catch (err) {
            console.error("Error:", err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in first to add items to your cart!");
            return;
        }

        try {
            await addToCart(product);
            alert("✅ Product added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart");
        }
    };



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
            title: "Newborn Astrology",
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
    const images = [crad7, crad8, crad9, crad10, crad11];

    return (

        <>
           <div className="overflow-hidden">
    <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:flex md:flex-row-reverse overflow-hidden"
        style={{
            backgroundImage: `url(${bgbannere})`,
            backgroundSize: "cover",
            backgroundPosition: "right ",
            height: "420px",
        }}
    >

        {/* LEFT SIDE - WHEEL + VIDEO */}
        <div className="relative md:w-[55%] h-full flex items-center justify-center">

            {/* 🔵 STATIC CENTERED WHEEL — NO MOVEMENT */}
            <div
                className="absolute animate-spin"
                style={{
                    backgroundImage: `url(${handbg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    width: "300px",
                    height: "300px",
                    zIndex: 5,
                }}
            ></div>

            {/* 🎥 BIGGER VIDEO (Centered) */}
            <video
                className="relative z-10 w-[230px] md:w-[260px] rounded-2xl shadow-2xl"
                controls
                autoPlay
                muted
                loop
            >
                <source src={sampleVideo} type="video/mp4" />
            </video>

            {/* 🕒 AVAILABLE HOURS */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg">
                <p className="text-white text-sm font-semibold">
                    Available Hours: <span className="text-orange-400">7 AM–1 PM</span> /
                    <span className="text-orange-400"> 4 PM–8 PM</span>
                </p>
                <p className="text-gray-100 text-xs mt-1 text-center w-full">
  "समय लेकर पधारें"
</p>

            </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-[45%] hidden md:block">
            {/* your Swiper slides */}
        </div>

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
                    <h2 className='text-4xl '>About Astrology</h2>
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50'>
                        Astrology is the study of how the positions and movements of celestial bodies influence human behavior and life events. It offers insights into personality, relationships, and destiny based on planetary alignments.
                    </p>
                </motion.div>
                <div className='py-20 md:flex justify-between overflow-hidden'>
                    <motion.div
                        initial={{ x: 150, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='w-full md:w-[45%] mb-10 relative '>
                        <iframe
                            className='w-full rounded-2xl'
                            height={315}
                            src="https://www.youtube.com/embed/0_J7QRfiPb0?si=7cAzafVy40Cjt0iT"
                            title="YouTube video player"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen=""
                        />
                    </motion.div>
                    <motion.div
                        initial={{ x: 150, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className='w-full md:w-[50%] text-start'>
                        <h2 className='text-3xl '>What Do We Do ?</h2>
                        <div className='my-5 border-l-2 border-l-amber-700 ps-8'>
                            <p className='my-4'>featured-artist
                                Pandit Purshotam Sharma (Gaur), the famous Pandit and Astrologer is a considerable man of multiple talents and professions.</p>
                            <p className='my-4'>He was born at Bandikui, very close to Jaipur (the most famous place for astrological science in India.) Pandit Purshotam Sharma (Gaur), is conferred the title “Brahman Ratna” by the Bhartiya Brahman Mahasabha. His knowledge and scrutiny of Vedic science under the able guidance of his father help him to understand problems and desires associated with life through a Vedic perspective.</p>
                        </div>
                        <div className='mb-10 md:flex'>
                            <div className='rounded-full border border-gray-500 w-20'>
                                <img src={aboutimg} alt="" className=' p-5' />

                            </div>
                            <div className='flex  items-center ms-5'>
                                <span className='text-7xl text-yellow-600'>30</span>
                                <div className='ms-3'>
                                    <p className=''>years of</p>
                                    <p className='text-3xl'>Experience</p>
                                </div>
                            </div>

                        </div>
                        <Link to="/inquiryform" className='hover:bg-yellow-700 text-white duration-300 px-5 py-3 bg-yellow-600  font-semibold rounded-full mt-5 '>Appointment</Link>
                        {/* <button className='hover:bg-yellow-700 text-white duration-300 px-5 py-3 bg-yellow-600  font-semibold rounded-full mt-5 '>Appointment</button> */}
                    </motion.div>
                </div>
            </div>
            <motion.div
                initial={{ x: -150, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
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
            <div className="section bg-black mb-10">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-10 flex flex-col  text-gray-200 border-r border-gray-700">
                        <img src={Kundliimg} alt="" className="mb-10 rounded-2xl" />
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-3xl font-bold text-yellow-400">
                                Get Your Kundli Now
                            </h2>
                        </div>
                        <p className="text-gray-300 mb-8">
                            Unlock the mysteries of your stars
                            Personalized birth chart prepared by expert astrologers.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex gap-3 items-start">
                                <p>Detailed birth chart & planetary positions.</p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <p>Remedies & life path insights from Vedic Astrology.</p>
                            </li>
                            <li className="flex gap-3 items-start">
                                <p>Consultation in your preferred language.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="p-8 md:p-10 bg-gray-950 text-white">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        colorScheme: "dark", // 👈 icon white ho jayega
                                    }}
                                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-300 focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="time"
                                    name="timeOfBirth"
                                    value={formData.timeOfBirth}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        colorScheme: "dark", // 👈 icon white ho jayega
                                    }}
                                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-300 focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <input
                                type="text"
                                name="placeOfBirth"
                                placeholder="Place of Birth"
                                value={formData.placeOfBirth}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-300 focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">Gender</option>
                                    <option value="Male" className="text-black">Male</option>
                                    <option value="Female" className="text-black">Female</option>
                                    <option value="Other" className="text-black">Other</option>
                                </select>

                                <select
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-300 focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">Marital Status</option>
                                    <option value="Single" className="text-black">Single</option>
                                    <option value="Married" className="text-black">Married</option>
                                </select>
                            </div>

                            <input
                                type="text"
                                name="occupation"
                                placeholder="Occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                            />

                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="" className='text-black' >Select Astrology Service</option>
                                <option value="Kundli" className=' text-black'>Kundli</option>
                                <option value="Matchmaking" className=' text-black'>Matchmaking</option>
                                <option value="Career" className=' text-black'>Career Prediction</option>
                                <option value="Health" className=' text-black'>Health Analysis</option>
                                <option value="Finance" className=' text-black'>Finance / Business</option>
                            </select>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                            />

                            <textarea
                                name="message"
                                rows="3"
                                placeholder="Your Question or Concern"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 resize-none"
                            ></textarea>

                            <div className="bg-yellow-900/30 p-4 rounded border border-yellow-600/50 mb-4">
                                <p className="text-yellow-300 text-center">
                                    <span className="font-semibold">Service Fee: ₹1100</span>
                                    <br />
                                    <span className="text-sm">Payment required before kundli generation</span>
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Proceed to Payment"}
                            </button>
                        </form>

                        <div className="text-center text-gray-400 mt-4 text-sm">
                            100% Confidential | Trusted by thousands worldwide
                        </div>
                    </div>
                </div>
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
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="section-4 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${bgbannere2})` }}>
                <div className='w-full h-[100px]' style={{ backgroundImage: `url(${shape})` }}></div>
                <div className='text-center text-white'>
                    <div>
                        <h2 className='text-4xl '>Why Choose Us</h2>
                        <div>
                            <img src={downlod} alt="" className='m-auto my-10' />
                        </div>
                        <p className='md:mx-50'>
                            We combine deep astrological expertise with a personalized approach to deliver accurate, meaningful insights. Our trusted guidance empowers you to make informed decisions and align your life with your true potential.
                        </p>
                    </div>
                </div>
                <div className='pt-20 pb-20 px-10 md:flex justify-between'>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px] '>
                            <img src={bgstarimg} className='object-cover m-auto justify-center w-40 h-40 rounded-full' alt="" />
                        </div>
                        <p className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>
                            Decades of Astrological Experience
                            With 30+ years of deep study and practice, Pandit Purshotam Gaur Ji offers accurate and insightful predictions based on authentic Vedic principles.
                        </p>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]'>
                            <img src={bgstarimg2} className='object-cover m-auto w-40 h-40 rounded-full' alt="" />
                        </div>
                        <p className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>
                            Government-Recognized & Gold Medalist Astrologer
                            Honoured and awarded by the Rajasthan Government, Pandit Ji’s achievements reflect his credibility, dedication, and excellence in astrology.
                        </p>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]' >
                            <img src={bgstarimg3} className='object-cover m-auto w-40 h-40 rounded-full' alt="" />
                        </div>
                        <p className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>
                            Personalized & Practical Remedies
                            Every solution provided is purely based on individual Kundli analysis — simple, effective, and rooted in traditional scriptures.
                        </p>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]'>
                            <img src={bgstarimg4} className='object-cover m-auto w-40 h-40 rounded-full' alt="" />
                        </div>
                        <p className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>
                            Thousands of Satisfied Devotees Worldwide
                            From resolving life challenges to guiding spiritual growth, Pandit Ji has transformed countless lives through divine wisdom and astrological guidance.
                        </p>
                    </div>
                    <div className='md:w-[15%] m-auto my-10 md:my-0 w-[50%]'>
                        <div className='bg-no-repeat w=[200px] h-=[300px]'>
                            <img src={bgstarimg5} className='object-cover m-auto w-40 h-40 rounded-full' alt="" />
                        </div>
                        <p className='text-sm text-center font-bold text-white mt-5 hover:text-yellow-700 duration-300'>
                            Trusted Name in Vedic Astrology
                            Known for honesty, ethics, and results-driven guidance — Pandit Purshotam Gaur Ji is a trusted name for those seeking true direction and peace in life.
                        </p>
                    </div>
                </div>
                <div className='w-full h-[100px] rotate-180' style={{ backgroundImage: `url(${shape})` }}></div>
            </motion.div>
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
            <div className="w-full overflow-hidden bg-gray-100 py-10">
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-6xl mx-auto px-4">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        // pagination={{ clickable: true }}
                        // navigation
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="rounded-2xl"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div className="flex justify-center items-center">
                                    <img
                                        src={img}
                                        alt={`Slide ${i + 1}`}
                                        className="w-[350px] h-[300px] object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
            <div className="section-6 pt-20 px-10">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='text-center'>
                    <h2 className='text-4xl '>Popular Products</h2>
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50 mb-10'>
                        Discover our most-loved astrology offerings — from personalized birth chart readings to detailed yearly horoscope reports.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className='md:flex justify-between'>
                    {products && products.length > 0 ? products.map((product, i) => (
                        <motion.div
                            key={product._id}
                            className="group relative mt-10 bg-white shadow-md rounded-2xl overflow-hidden my-10 md:my-0 md:w-[23%] p-4 transition-all duration-500 hover:shadow-xl"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="absolute top-3 z-40 left-3 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded">
                                New
                            </span>

                            <div className="flex justify-center items-center relative">
                                <motion.img
                                    src={product.imageUrl || ringImg}
                                    alt={product.name}
                                    className="w-[150px] h-[150px] object-contain"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                <motion.div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition-opacity duration-500">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-linear-to-r from-orange-400 to-orange-600 text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-1 shadow-md hover:scale-105 transition-transform"
                                    >
                                        <FaShoppingCart /> Add To Cart
                                    </button>

                                    <div className="flex gap-3 text-white text-lg">

                                    </div>
                                </motion.div>
                            </div>

                            <div className="text-center my-5">
                                <div className="flex justify-center mb-1">
                                    {[...Array(5)].map((_, i) =>
                                        i < 4 ? (
                                            <FaStar key={i} className="text-yellow-400" />
                                        ) : (
                                            <FaRegStar key={i} className="text-yellow-400" />
                                        )
                                    )}
                                </div>

                                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                <div className="mt-1">
                                    <span className="text-lg font-bold text-black">₹{product.price}</span>
                                    {product.oldprice && (
                                        <span className="text-gray-400 line-through ml-2">₹{product.oldprice}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="text-center w-full">
                            <p>No products available</p>
                        </div>
                    )}
                </motion.div>
                <div className="text-center mt-16">
                    <Link
                        to="/product"
                        className="bg-orange-500 hover:bg-orange-600 py-2 px-10 rounded-full text-white font-semibold transition-all duration-300"
                    >
                        View More
                    </Link>
                </div>
            </div>
            <div className="section-7 overflow-hidden pt-20 ">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='text-center'>
                    <h2 className='text-4xl '>Latest Articles</h2>
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50'>
                        Explore insightful articles on astrology, cosmic energies, and life guidance.
                        Stay updated with expert tips to understand planetary influences and harness their power for personal growth.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="w-full flex flex-wrap justify-between items-stretch py-20 px-10 md:px-20 gap-6"
                >
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="group bg-white w-full md:w-[48%] rounded-2xl shadow-md overflow-hidden duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col"
                        >
                            <div className="relative">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.name}
                                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="p-5 flex flex-col grow">
                                <div className="flex items-center text-gray-500 text-sm space-x-4 mb-3">
                                    <span className="flex items-center gap-1">
                                        <i className="fa-solid fa-user text-orange-500" /> By- {blog.name}
                                    </span>
                                </div>

                                <h1 className="text-lg font-semibold text-gray-800 duration-300 group-hover:text-orange-500">
                                    {blog.title}
                                </h1>

                                <p className="text-gray-600 mt-3 text-sm grow">
                                    {blog.category}
                                </p>
                                <p className="text-gray-600 mt-3 text-sm grow">
                                    {blog.description}
                                </p>
                            </div>
                        </div>
                    ))}



                </motion.div>

                <div className="text-center">
                    <Link
                        to="/Blog"
                        className="bg-orange-500 hover:bg-orange-600 py-2 px-10 rounded-full text-white font-semibold  duration-300"
                    >
                        View More
                    </Link>
                </div>
                <div className='w-full h-[100px] rotate-180' style={{ backgroundImage: `url(${shape})` }}></div>
            </div>
            <div className="section-12 ">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='text-center'>
                    <h2 className='text-4xl '>Photo Gallery</h2>
                    <div>
                        <img src={downlod} alt="" className='m-auto my-10' />
                    </div>
                    <p className='md:mx-50'>
                        Browse our photo gallery to glimpse moments from astrology sessions, spiritual events, and celestial celebrations.
                        Each image reflects the beauty, energy, and wisdom that guide our astrological journey.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    className=' w-full px-10 my-10 justify-around md:flex'>
                    {photos && photos.length > 0 ? photos.map((photo) => (
                        <div key={photo._id} className='my-10 md:my-0 md:w-55'>
                            <img
                                src={photo.imageUrl || gallery1}
                                alt={photo.title || 'Gallery Image'}
                                className='rounded-xl duration-500 hover:scale-110 shadow-lg w-full h-[200px] md:w-[300px] md:h-70 object-contain'
                            />
                        </div>
                    )) : (
                        <div className="text-center w-full">
                            <p>No photos available</p>
                        </div>
                    )}
                </motion.div>
                <div className="text-center">
                    <Link
                        to="/gallery"
                        className="bg-orange-500 hover:bg-orange-600 py-2 px-10 rounded-full text-white font-semibold  duration-300"
                    >
                        View More
                    </Link>
                </div>
                <div className='w-full h-[100px] rotate-180' style={{ backgroundImage: `url(${shape})` }}></div>
            </div>
        </>
    )
}

export default Home
