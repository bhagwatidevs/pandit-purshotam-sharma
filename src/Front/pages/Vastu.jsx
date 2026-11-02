import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import thumbnail8 from "../../Front/assest/imgs/thumbnail8.webp"
import downlod from "../../Front/assest/imgs/download.png"

const Vastu = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Vastu Shastra</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Vastu
                    </p>
                </div>
            </div>
            <div className='w-full h-[100px] rotate-180 mt-[-90px]' style={{ backgroundImage: `url(${shape})`, }}></div>
            <div className='text-center'>
                <div>
                    <img src={downlod} alt="" className='m-auto my-10' />
                </div>
            </div>
            <div className="bg-white w-full px-10 shadow-lg rounded-2xl overflow-hidden md:flex md:items-start md:space-x-10">
                <div className="md:w-[33.33%]">
                    <img
                        src={thumbnail8}
                        alt="Pandit performing puja"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-[66.66%] p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        <span className=" bg-orange-500 text-white px-2 py-1 rounded-md mr-2">
                            v
                        </span>
                        astu Shastra
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Vastu Shastra is the ancient system of architecture, based on which the homes, offices, shops, etc were constructed. Even today, people prefer Vastu Shastra as the base before they even start any construction.
                    </p>
                    <p className="text-gray-600 mb-6">
                       The reason is very simple – the way everything is designed in a home – affects an individual, his health, family, possessions, etc. So Vastu shastra play a very crucial role in the everyday life of a person.
                    </p>
                    <p className="text-gray-600 mb-6">
                        The placement of each and everything in the building has to be very precise, be it a mirror or bed, or kitchen sink or the temple, water tap, dimensions of rooms, etc. Everything has a proper position and has an effect on the members residing there. So it is very important that everything should be aligned.
                    </p>
                     <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">
                      Here Are Some of the Benefits of Vastu Shastra:
                    </h3>
                    <ul className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>Brings in prosperity and harmony in life</li>
                        <li>Enhances personal relations</li>
                        <li>Avoids any unwanted, evil energies</li>
                        <li>Peace of mind, leading to a quality life</li>
                        <li>Sharpens brain and memory power</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                        When it comes to how effective is Vastu Shastra, there is no doubt here as this method is based on mathematical calculations, Vastu principles and science. Also, the best astrologer will always tell you the best solution and a way to fix your construction needs.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Any area that is built based on Vastu Shastra, always attracts positive vibes from the universe that leads to the success of the people living in.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">
                      What If Someone Does Not Follow Vastu Shastra?
                    </h3>
                     <p className="text-gray-600 mb-6">
                        There are some people who neglect this science and chose to build the home or any other area, in their own way, but this leads to many problems, such as:
                    </p>
                    <ul className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>Loss of life</li>
                        <li>Loss of money</li>
                        <li>Negative impact on physical and mental health</li>
                        <li>Loss in business or property</li>
                        <li>Negatively affected personal relations</li>
                        <li>Personal life problems & Solution?</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                       Luckily, the best astrologer in Jaipur – Pandit Purshotam gaur, with his expertise in the region can resolve your problems very effectively. He is an expert in Vastu Shastra and will guide you as to why you are facing the problem and what could be the best solution for that.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Vastu
