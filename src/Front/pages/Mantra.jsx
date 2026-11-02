import React from 'react'
import bg10 from "../..//Front/assest/imgs/bg10.jpg"
import shape from "../../Front/assest/imgs/shape.svg"
import { FaStarOfDavid } from 'react-icons/fa';
import downlod from "../../Front/assest/imgs/download.png"
import Mantras from "../../Front/assest/imgs/thumbnail6.webp"


const Mantra = () => {
    return (
        <>
            <div className="section-8 pt-40 pb-30 text-center text-white relative overflow-hidden" style={{ backgroundImage: `url(${bg10})`, backgroundSize: '100%' }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10">
                    <h2 className='text-2xl'>Mantra Healing</h2>
                    <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
                        Home <FaStarOfDavid className="mx-2" />Mantra
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
                        src={Mantras}
                        alt="Pandit performing puja"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="md:w-[66.66%] p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        <span className=" bg-orange-500 text-white px-2 py-1 rounded-md mr-2">
                            m
                        </span>
                        antra Healing
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Every substance in this universe comprises of energy. Everything you speak and let out in the universe, is a sign of energy. it can be used to specify whether it is negative or positive. So mantras are basically chants that are used to call god, and stimulate the positive flow of energy. Here is the shloka that defines this statement:
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">
                        Daivadheenam Jagatsarvam Mantradheenamtu Daivatam
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Meaning that, the whole universe is ruled by the Devas and are under the power of Mantras. The deities are also a part of this energy world, Shiva being the supreme source of energy and Shakti, its conscious form. Different energy forms called the Panchabhootas include the ether, air, water, fire and earth elements. The existence of these elements in the human body and as well as in the atmosphere facilitates the flow of energy between them.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">
                       Imbalances in the Body-System
                    </h3>
                    <p className="text-gray-600 mb-6">
                        The way mantras effect our body has its own science. Each organ has its own ability to absorb and emanate energies. Impropriety in the process of consuming and emitting energies can lead to dysfunctioning of the organs and lead to some diseases.
                    </p>
                    <p className="text-gray-600 mb-6">
                        <p className="text-gray-600 mb-6">But there is a proper way to chant the mantra, here how it goes:</p>
                    </p>
                    <ul className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>The mantra should be in rhythm</li>
                        <li>Proper pronunciation</li>
                        <li>Manushya Rakshasas: who extract benefits by disturbing the welfare of other people.</li>
                        <li>Proper pitch</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                       This is important to maximise the benefits of the mantra and take full advantage of it.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">The Power of Mantras</h3>
                    <p className="text-gray-600 mb-6">
                        The curative power of the mantras, is not restricted to the domain of physical illness. It can also be extended to
                    </p>
                    <ul className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>Psychological</li>
                        <li>Materialistic and</li>
                        <li>Spiritual deficits</li>                                                 
                    </ul>
                    <p className="text-gray-600 mb-6">
                        All these ailments (or deficits) are ruled by different deities. And the mantra so recited, is addressed to the respective deity to invoke the grace and ameliorate the sufferings of the patient. Shiva mantra addressed to Lord Vaidhyanath (God of health) is chanted for the cure of diseases, Lakshmi mantra for wealth and so on.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 uppercase">Preconditions for Mantra Healing</h3>
                    <p className="text-gray-600 mb-6">
                        There are certain preparatory conditions before the commencement of the healing process.
                    </p>
                    <ul className="list-decimal list-inside text-gray-700 space-y-1">
                        <li>It should start with a prayer</li>
                        <li>The healer should be free from infections and skin-abrasions.</li>
                        <li>All barriers in the patient’s mind need to be removed to enhance mental receptivity.</li>
                        <li>The physical posture (the direction and other factors) should be taken care of.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Mantra
