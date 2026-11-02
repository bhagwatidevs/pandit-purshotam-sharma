import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const KundliForm = () => {
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
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white py-10 px-6 pt-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-yellow-400">Generate Your Kundli</h1>

        <form onSubmit={handleSubmit} className="bg-[#121212]/80 p-6 rounded-lg border border-yellow-600/30 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
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
              className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white"
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
              className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white"
            />
          </div>

          <input
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white"
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
              className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white"
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
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
          />

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white"
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
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
          />

          <textarea
            name="message"
            rows="3"
            placeholder="Your Question or Concern"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400 resize-none"
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
            className="w-full py-3 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default KundliForm;