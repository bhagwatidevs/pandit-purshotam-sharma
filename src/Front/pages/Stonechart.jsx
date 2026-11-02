import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import thumbnail1 from "../../Front/assest/imgs/thumbnail1.webp"
import downlod from "../../Front/assest/imgs/download.png"

const Stonechart = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Lucky Stone Chart</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" /> Stone Chart
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center'>
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
            </div>
            <div className="gap-6 px-10 pb-20">
                <div className="w-full md:flex mb-10 ">
                    <div className="md:w-1/3">
                        <img
                            src={thumbnail1}
                            alt="Astrologer"
                            className="rounded-lg shadow-lg border border-gray-200"
                        />
                    </div>
                    <div className='md:w-1/2'>
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            <span className="text-orange-500 text-4xl">L</span>ucky Stone Chart
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            By doing deep calculation and studying your horoscope in detail, the
                            position of the weak planets can be found out, and a ring is made of the
                            particular weak planet accordingly as an antidote relieving from damages.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            So, you can have benefit of Real Gems or Ring according to my suggestion
                            about stone, metal and weight. This system is helped many people to the
                            large extent. By minimizing the power of weak planets and increasing the
                            good effects of weak planets giving double benefits.
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mt-6 mb-4">
                        <span className="text-orange-500 text-3xl">H</span> General Stone Chart :-
                    </h3>
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full border border-gray-300 text-left text-gray-700">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 font-semibold border">MONTH</th>
                                    <th className="py-3 px-4 font-semibold border">PLANET</th>
                                    <th className="py-3 px-4 font-semibold border">SUN SIGN</th>
                                    <th className="py-3 px-4 font-semibold border">STONE NAME</th>
                                    <th className="py-3 px-4 font-semibold border">STONE</th>
                                    <th className="py-3 px-4 font-semibold border">STONE</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="py-3 px-4 border">Jan21–Feb21</td>
                                    <td className="py-3 px-4 border">Aquarius</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="aquarius" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border">Hessonite</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="gomed01" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border text-center">1</td>
                                </tr>

                                <tr>
                                    <td className="py-3 px-4 border">Feb22–Mar21</td>
                                    <td className="py-3 px-4 border">Pisces</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="pisces" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border">Cat’s eye</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="catseye" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border text-center">1</td>
                                </tr>

                                <tr>
                                    <td className="py-3 px-4 border">Apr21–May21</td>
                                    <td className="py-3 px-4 border">Taurus</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="taurus" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border">Diamond / White Sapphire</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="diamond" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="whitesapphire" className="w-10 h-10" />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-3 px-4 border">May22–Jun21</td>
                                    <td className="py-3 px-4 border">Gemini</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="gemini" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border">Emerald</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="emerald" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border"></td>
                                </tr>

                                <tr>
                                    <td className="py-3 px-4 border">June22–July22</td>
                                    <td className="py-3 px-4 border">Cancer</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="cancer" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border">Pearl</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="pearl" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border"></td>
                                </tr>

                                <tr>
                                    <td className="py-3 px-4 border">July23–Aug22</td>
                                    <td className="py-3 px-4 border">Leo</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="leo" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border">Ruby</td>
                                    <td className="py-3 px-4 border flex justify-center">
                                        <img src="https://via.placeholder.com/40" alt="ruby" className="w-10 h-10" />
                                    </td>
                                    <td className="py-3 px-4 border text-center">1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Stonechart
