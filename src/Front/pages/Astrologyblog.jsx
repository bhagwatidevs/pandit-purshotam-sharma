import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaFacebook, FaLinkedinIn, FaStarOfDavid } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube, IoSearch } from "react-icons/io5";
import downlod from "../../Front/assest/imgs/download.png";
import bg10 from "../../Front/assest/imgs/bg10.jpg";
import shape from "../../Front/assest/imgs/shape.svg";

const Astrologyblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  // ✅ Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://astrology-backend-1.onrender.com/api/blog"); // update to your deployed API URL
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Pagination logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {/* ---------- Banner Section ---------- */}
      <div
        className="section-8 pt-20 pb-30 text-center text-white relative overflow-hidden"
        style={{ backgroundImage: `url(${bg10})`, backgroundSize: "100%" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">Blog</h2>
          <p className="flex text-xs mt-3 justify-center items-center cursor-pointer">
            Home <FaStarOfDavid className="mx-2" /> Blog
          </p>
        </motion.div>
      </div>

      {/* ---------- Shape Divider ---------- */}
      <div
        className="w-full h-[100px] rotate-180 mt-[-90px]"
        style={{ backgroundImage: `url(${shape})` }}
      ></div>

      {/* ---------- Description Section ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center px-5 md:px-20 overflow-hidden"
      >
        <img src={downlod} alt="" className="m-auto my-10  w-14 md:w-50" />
        <p className="max-w-3xl mx-auto text-gray-700 text-sm md:text-base">
          Discover practical astrology insights to help you live with purpose,
          balance, and spiritual awareness.
        </p>
      </motion.div>

      {/* ---------- Blog Section ---------- */}
      <div className="md:flex md:flex-row-reverse justify-between w-full overflow-hidden">
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:w-[70%] py-10 px-5 md:px-20"
        >
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No blogs available.</p>
          ) : (
            currentBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="group bg-white mb-10 rounded-2xl shadow-md overflow-hidden duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full  h-52 object-center  transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="p-5 text-left">
                  <div className="flex items-center text-gray-500 text-sm space-x-4 mb-3">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-user text-orange-500" /> By -{" "}
                      {blog.name || "Admin"}
                    </span>
                    {blog.category && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                        {blog.category}
                      </span>
                    )}
                  </div>
                  <h1 className="text-lg font-semibold text-gray-800 duration-300 group-hover:text-orange-500">
                    {blog.title}
                  </h1>
                  <p className="text-gray-600 mt-3 text-sm md:text-base">
                    {blog.description?.length > 250
                      ? blog.description.slice(0, 250) + "..."
                      : blog.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}

          {/* ---------- Pagination ---------- */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-10 gap-5 flex-wrap"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === 1
                  ? "bg-gray-400"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-400"
                  : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              Next
            </button>
          </motion.div>
        </motion.div>

        {/* ---------- Sidebar ---------- */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:w-[30%] py-10 px-5 md:px-10 overflow-hidden"
        >
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Search Blog"
              className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-full">
              <IoSearch />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-3">Top Categories</h2>
            <ul className="border-t border-gray-200 text-sm">
              {[
                "Kundali Dosha",
                "Face Reading",
                "Daily Horoscope",
                "Personal Consultation",
                "Gem & Stone",
                "Manglik Dosha",
                "Vastu Shastra",
                "Planets",
                "Numerology",
              ].map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray-200 py-2 hover:text-orange-500 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Social Share</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="border border-gray-300 p-3 rounded-full text-gray-600 hover:bg-gray-100"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="border border-gray-300 p-3 rounded-full text-gray-600 hover:bg-gray-100"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="border border-gray-300 p-3 rounded-full text-gray-600 hover:bg-gray-100"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="border border-gray-300 p-3 rounded-full text-gray-600 hover:bg-gray-100"
              >
                <IoLogoYoutube />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Astrologyblog;
