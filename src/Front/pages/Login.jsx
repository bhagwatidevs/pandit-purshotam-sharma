import React, { useState } from "react";
// import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import loginimg from "../..//Front/assest/imgs/gallery21.jpeg"
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://astrology-backend-1.onrender.com/api/auth/login", formData);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        
        // Redirect based on user role
        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setError(res.data.msg || "Invalid credentials");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center pt-25 px-30 justify-center bg-linear-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white">
     <div className="w-[50%]">
       <img src={loginimg} className="object-cover w-full rounded-l-2xl h-100" alt="" />
     </div>
      <div className="bg-linear-to-br from-[#0b1d3a] px-20 via-[#162447] to-[#5a3e85] text-[#f9f3db] w-[50%] p-8 rounded-2xl shadow-lg h-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">Welcome Back</h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
