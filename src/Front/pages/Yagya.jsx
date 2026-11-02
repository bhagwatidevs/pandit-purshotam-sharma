import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import downlod from "../../Front/assest/imgs/download.png"
import yagya from "../../Front/assest/imgs/yagya.jpeg"
import yagya2 from "../../Front/assest/imgs/yagya2.jpeg"
import yagya3 from "../../Front/assest/imgs/yagya3.jpeg"
import yagya4 from "../../Front/assest/imgs/yagya4.jpeg"
import yagya5 from "../../Front/assest/imgs/yagya5.jpeg"
import yagya6 from "../../Front/assest/imgs/yagya6.jpeg"
import yagya7 from "../../Front/assest/imgs/yagya7.jpeg"
import yagya8 from "../../Front/assest/imgs/yagya8.jpeg"
import yagya9 from "../../Front/assest/imgs/yagya9.jpeg"
import yagya10 from "../../Front/assest/imgs/yagya10.jpeg"
import yagya11 from "../../Front/assest/imgs/yagya11.jpeg"
import yagya12 from "../../Front/assest/imgs/yagya12.jpeg"
import yagya13 from "../../Front/assest/imgs/yagya13.jpeg"
import yagya14 from "../../Front/assest/imgs/yagya14.jpeg"

const Yagya = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>YAGYA (HOMAM)</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />YAGYA (HOMAM)
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center pb-20'>
                {/* <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
                    Powerful yagya &amp; Paths
                </h2> */}
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
                <p className='md:mx-50'>
                    Yagya, also known as Homam, is an ancient Vedic ritual performed to invoke divine blessings and purify the environment. Through sacred fire offerings, mantras, and prayers, positive energies are awakened while negative influences are dispelled.
                </p>
            </div>
            <div className='section-Astrology-consultation px-10 pb-20'>
                <div className="w-full mx-auto px-10">
                    <div className="space-y-12">
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya}
                                alt="Ganesh Path"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Prajakamaha Ain.Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    This homam is performed to beget good offsprings and get success in competition. The Om Indraagnibhyam Namaha Mantra is chanted to propitiate Indraagni.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya2}
                                alt="Durga Saptashati"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Abhayprada हवन
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Abhayprada हवन; as the name suggests this हवन is performed to be fearless in all aspects of life. Fear of financial problems, personal problems, relationship problems, marriage problems, professional problems can be demolished by performing Abhayprada हवन in the supervision of Pandit.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya3}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Ayush हवन
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Ayush हवन is performed for the longevity of the person on his/her star birthday. Lord Ishana; the presiding deity is invoked by the offering of Ghee, Havis (cooked rice) and special sticks known as samidha in the holy fire of Ayush हवन 1008 times by Brahmins.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya4}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Nava Chandi Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The performance of this Powerful homam will promote Universal peace and harmony and the well being of all the people.Nava Chandi Homa is performed on the eighth day of the navrathri festival.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya5}
                                alt="Ganesh Path"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Shata Chandi Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    This Powerful homam brings the much required peace of mind, strength to fight the evil and usher in welfare for all world communities.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya6}
                                alt="Durga Saptashati"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Durga Lakshmi Saraswathi Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    This homam is performed to get the blessings from Goddess Durga, Lakshmi and Saraswati.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya7}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Durga Sooktha Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    This homam is performed to get good health, wealth and Happiness by propitiating Goddess Durga.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya8}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Ganapathy Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Lord Ganesha who is invoked in this homam is propitiated by the offering of Ghee, Havis (cooked rice) and Special Sticks known as samith in the fire 3336 times by Brahmins. Lord Ganesha-The remover of obstacles is invoked to have a trouble free Life
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya9}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Indraayagumhomuck Homam Papahara
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">

                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya10}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Normal Indraya Manyumathe Manasvathe Home
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    A homam that is performed for the removal of sins, and a life filled with peace, free of disturbances. All this is granted by Lord Indra, the presiding deity, who is propitiated by offering Ghee, Havis (cooked rice) and Special Sticks known as samith in the fire 3336 times by Brahmins.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya11}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Vishadahara Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    This homam is performed to recover from Depression by propitiating the Deity Manyumanasvaan Indra. The Presiding deity Lord Indra is propitiated by offering the Ghee, cooked rice and Special Sticks known as samith in the fire 3336 times by Brahmins.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya12}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Lakshmi Kubera H.
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Lord Ganesha who is invoked in this homam is propitiated by the offering of Ghee, Havis (cooked rice) and Special Sticks known as samith in the fire 3336 times by Brahmins. Lord Ganesha-The remover of obstacles is invoked to have a trouble free LifeThe blessings of Goddess Mahalakshmi and Kubera who are invoked through this Homam pleased with the offering's of Ghee, Havis (cooked rice) and Special Sticks known as samith in the fire 3336 times by Brahmins bestow financial prosperity on the one who performs this homam.
                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya13}
                                alt="Hanuman Chalisa"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Mrithyunjana Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">

                                </p>
                            </div>
                        </div>
                        <div className="md:flex md:flex-row-reverse items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl duration-300">
                            <img
                                src={yagya14}
                                alt="Mahamrityunjaya Mantra"
                                className="md:w-[33.33%] w-full h-56 object-cover"
                            />
                            <div className="p-6 md:w-2/3">
                                <h3 className="text-2xl font-semibold text-orange-700 mb-3">
                                    Navagraha Homam
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Navagraha Devatas who are invoked in this homam are propitiated by the offering of Ghee, Havis (cooked rice) and Special Sticks known as samith in the fire 3336 times by Brahmins. Problems arising out of planetery changes will be sorted out by performing this homam to please the Navagraha Devtas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Yagya
