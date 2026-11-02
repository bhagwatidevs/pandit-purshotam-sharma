// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.post("https://astrology-backend-1.onrender.com/api/auth/register", formData);
//       alert(res.data.msg || "Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white">
//       <div className="bg-[#121212]/90 p-8 rounded-2xl shadow-lg w-full max-w-md border border-yellow-600/30">
//         <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">Create Account</h2>

//         {error && <p className="text-red-400 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 text-sm">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-2 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-2 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full p-2 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded font-semibold transition"
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-yellow-400 cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://astrology-backend-1.onrender.com/api/auth/register", formData);
      alert(res.data.msg || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white">
      <div className="bg-[#121212]/90 p-8 rounded-2xl shadow-lg w-full max-w-md border border-yellow-600/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Create Account
        </h2>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-transparent border border-yellow-600/40 focus:outline-none focus:border-yellow-500"
            />
          </div>

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
            <label className="block mb-1 text-sm">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

