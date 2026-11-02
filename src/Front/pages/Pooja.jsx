import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import downlod from "../../Front/assest/imgs/download.png"
import Mantras from "../../Front/assest/imgs/thumbnail6.webp"
const Pooja = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Pooja Service</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Pooja
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center'>
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
            </div>
            <div className="bg-white w-full px-10 shadow-lg rounded-2xl overflow-hidden md:flex md:items-center md:space-x-10">
                <div className="md:w-[33.33%]">
                    <img
                        src={Mantras}
                        alt="Pandit performing puja"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-[66.66%] p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        <span className=" bg-orange-500 text-white px-2 py-1 rounded-md mr-2">
                            p
                        </span>
                        Pooja Service
                    </h2>
                    <p className="text-gray-600 mb-4">
                        According to Indian Astrology, your true self & personality is defined by the position of the planets, at the time & place of your birth. The present & future positions of the planets are compared with those of your birth chart to predict your future. This is the basis of Indian Astrology. The positions of the planets at the time of your birth is determined first. This forms the birth data. Your birth data is then compared to the positions of planets at various stages in life, to predict your future and major events that could happen in your life.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Pandit Purshotam Sharma (Gaur) knowledge and scrutiny of Vedic science under the able guidance of his father help us to understand problems and desires associated with life through a Vedic perspective.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Pandit Purshotam Sharma (Gaur) is Bachelor in Astrology by Guru Shishya Parampara. Pandit Purshotam have good knowledge of all 9 aspects of astrology i.e. Vadic Astrology, Hast Rekha, Mastak Rekha, Thumb Impression and Hand Writing, Ank Jyotish, Vastu Shastra, Chinh Vigan, Plant & Trees, Chinh Vigyan (Body Marks and overseas astrology (Love Sign, Fangshui, Sun Sign, Ramal etc.)
                    </p>
                </div>
            </div>
        </>
    )
}

export default Pooja
