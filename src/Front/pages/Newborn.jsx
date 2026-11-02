import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import downlod from "../../Front/assest/imgs/download.png"
import bornastrology from "../../Front/assest/imgs/born-baby-astrology.webp"

const Newborn = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Newborn Astrology</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Newborn
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center'>
                {/* <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
                    Powerful mantras &amp; Paths
                </h2> */}
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
                {/* <p className='md:mx-50'>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum .
                </p> */}
            </div>
            <div className="bg-white w-full px-10 shadow-lg rounded-2xl overflow-hidden md:flex md:items-center md:space-x-10">
                <div className="md:w-[33.33%]">
                    <img
                        src={bornastrology}
                        alt="Pandit performing puja"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-[66.66%] p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        <span className=" bg-orange-500 text-white px-2 py-1 rounded-md mr-2">
                            N
                        </span>
                        ewborn Astrology
                    </h2>
                    <p className="text-gray-600 mb-4">
                        The birth of a child is a sacred and joyful moment for every family. Along
                        with happiness comes the responsibility of ensuring a bright and
                        prosperous future for the newborn — and it all begins with choosing the
                        right name.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Our Pandit Ji offers guidance not only in name selection but also in
                        preparing a detailed birth chart. He helps identify the favourable and
                        unfavourable planetary influences that may shape the child’s life.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">
                        Unfavourable Planetary Effects Include:
                    </h3>
                    <ul className="list-decimal list-inside text-gray-700 mb-6 space-y-1">
                        <li>Health issues for the newborn</li>
                        <li>General luck of the parents or the child</li>
                        <li>Longevity and well-being of grandparents</li>
                        <li>In girls – possible marriage-related hurdles</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                        Since each planet resonates with specific sounds, ancient Vedic astrology
                        suggests finding the right initial letter that aligns with the baby’s
                        birth chart to ensure a blessed destiny.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">
                        Our Newborn Astrology Services Include:
                    </h3>
                    <ul className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>
                            Examine the baby’s birth chart for unfavourable planetary positions
                        </li>
                        <li>Recommend auspicious name letters as per Lagna &amp; Nakshatra</li>
                        <li>Provide a detailed birth chart via email or print copy</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Newborn
