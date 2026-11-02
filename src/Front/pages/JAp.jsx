import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import downlod from "../../Front/assest/imgs/download.png"
import mantras1 from "../../Front/assest/imgs/mantras.jpeg"
import mantras2 from "../../Front/assest/imgs/mantras2.jpeg"
import mantras3 from "../../Front/assest/imgs/mantras3.jpeg"
import mantras4 from "../../Front/assest/imgs/mantras4.jpeg"
import mantras5 from "../../Front/assest/imgs/mantras5.jpeg"
import mantras6 from "../../Front/assest/imgs/mantras6.jpeg"
import mantras7 from "../../Front/assest/imgs/mantras7.jpeg"
import mantras8 from "../../Front/assest/imgs/mantras8.jpeg"

const JAp = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Jap</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Jap
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center pb-20'>
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
                        Powerful mantras &amp; Paths
                    </h2>
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
                <p className='md:mx-50'>
                   Mantras hold divine vibrations that have the power to transform the mind, body, and soul. Chanting the right mantra with faith and devotion aligns your energy with universal consciousness, helping you overcome negativity and attract peace, prosperity, and protection.
                </p>
            </div>
            <div className='section-Astrology-consultation px-10 pb-20'>
                <div className="w-full mx-auto px-10">
                    <div className="space-y-12">
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras1}
                                alt="Ganesh Path"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Ganesh Vandana Path
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Lord Ganesh is the remover of obstacles and the giver of wisdom.
                                    Reciting this mantra helps to start any new journey with positivity
                                    and divine blessings.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras2}
                                alt="Durga Saptashati"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Durga Saptashati Path
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Dedicated to Goddess Durga, this path invokes her divine power to
                                    remove negativity and bring courage, confidence, and success in life.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras3}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Hanuman Chalisa
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The Hanuman Chalisa brings strength and fearlessness. It removes
                                    negativity and blesses devotees with confidence and courage.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras4}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Mahamrityunjaya Mantra
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    A sacred Shiva mantra for health and protection. It helps in
                                    overcoming diseases and grants peace, longevity, and strength.
                                </p>
                            </div>
                        </div>
                         <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras5}
                                alt="Ganesh Path"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Ganesh Vandana Path
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Lord Ganesh is the remover of obstacles and the giver of wisdom.
                                    Reciting this mantra helps to start any new journey with positivity
                                    and divine blessings.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras6}
                                alt="Durga Saptashati"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Durga Saptashati Path
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Dedicated to Goddess Durga, this path invokes her divine power to
                                    remove negativity and bring courage, confidence, and success in life.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras7}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Hanuman Chalisa
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The Hanuman Chalisa brings strength and fearlessness. It removes
                                    negativity and blesses devotees with confidence and courage.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={mantras8}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Mahamrityunjaya Mantra
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    A sacred Shiva mantra for health and protection. It helps in
                                    overcoming diseases and grants peace, longevity, and strength.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JAp
