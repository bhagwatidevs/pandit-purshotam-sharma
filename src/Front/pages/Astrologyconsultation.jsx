import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import downlod from "../../Front/assest/imgs/download.png"
import thumbnail1 from "../../Front/assest/imgs/thumbnail1.webp"

const Astrologyconsultation = () => {
    return (
        <>
            <div className="section-8 pt-20 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Astrology Consultation</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Consultation
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center pb-20'>
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
                <p className='md:mx-50'>
                    Astrology consultations offer deep insights into your life’s journey, helping you understand your purpose, challenges, and hidden strengths. Through detailed analysis of your birth chart, our expert astrologers guide you in making confident decisions related to career, relationships, health, and personal growth.
                </p>
            </div>
            <div className='section-Astrology-consultation px-10 pb-20'>
                <div className="w-full md:flex justify-between items-center">
                    <div className="md:w-[48%] mb-10">
                        <img
                            src={thumbnail1}
                            alt="Astrology Consultation"
                            className=" w-full rounded-3xl shadow-lg hover:scale-[1.03] duration-500"
                        />
                    </div>
                    <div className="md:w-[48%]">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Astrology Consultation
                        </h2>
                        <div className="w-20 h-[3px] bg-orange-500 mb-6" />
                        <p className="text-gray-600 mb-4">
                            According to Indian Astrology, your true self &amp; personality is defined
                            by the position of the planets at the time and place of your birth. This
                            forms the basis of Vedic Astrology.
                        </p>
                        <p className="text-gray-600 mb-4">
                            The positions of planets are compared with your birth chart to predict
                            life events, helping you understand challenges and opportunities ahead.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Pandit Purshotam Sharma (Gaur) has deep knowledge in Vedic sciences guided
                            by his father, understanding life’s desires through a spiritual lens.
                        </p>
                        <p className="text-gray-600">
                            He is a Bachelor in Astrology by Guru Shishya Parampara and is well-versed
                            in all 9 aspects of astrology – Vedic, Hast Rekha, Vastu Shastra, Chinh
                            Vigyan, Thumb Impression, and more.
                        </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Astrologyconsultation
