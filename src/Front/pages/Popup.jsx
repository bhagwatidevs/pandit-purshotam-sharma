import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Kundliimg from "../../Front/assest/imgs/Kundliimg.jpeg"
import { GiStarSwirl } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";

const KundliPopup = () => {
    const [showModal, setShowModal] = useState(false);
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

    useEffect(() => {
        setShowModal(true);
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        Swal.fire({
            icon: "success",
            title: "Kundli Request Sent!",
            text: "Our astrologer will contact you soon 🌟",
            background: "#1a1a1a",
            color: "#fff",
            timer: 2500,
            showConfirmButton: false,
        });


        setTimeout(() => {
            setShowModal(false);
        }, 1200);


        setFormData({
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
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 py-10 mt-20">
                        <div className="bg-linear-to-b from-black via-gray-900 to-black w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative border border-gray-700">

                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    // Also hide at parent level if needed
                                    if (window.hidePopup) window.hidePopup();
                                }}
                                className="absolute top-0 right-2 text-3xl font-bold text-gray-400 hover:text-red-500 transition"
                            >
                                ×
                            </button>

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
                                            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 text-gray-300 focus:ring-2 focus:ring-yellow-500"
                                        >
                                            <option className='text-black' value="">Select Astrology Service</option>
                                            <option className='text-black' value="Kundli">Kundli</option>
                                            <option className='text-black' value="Matchmaking">Matchmaking</option>
                                            <option className='text-black' value="Career">Career Prediction</option>
                                            <option className='text-black' value="Health">Health Analysis</option>
                                            <option className='text-black' value="Finance">Finance / Business</option>
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

                                        <button
                                            type="submit"
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition-all duration-300"
                                        >
                                            Submit for Kundli Analysis
                                        </button>
                                    </form>

                                    <div className="text-center text-gray-400 mt-4 text-sm">
                                        100% Confidential | Trusted by thousands worldwide
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default KundliPopup;
