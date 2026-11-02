import React, { useEffect, useState } from "react";
import { FaStarOfDavid } from "react-icons/fa";
import axios from "axios";
import { motion } from 'framer-motion';
import bg10 from "../../Front/assest/imgs/bg10.jpg";
import shape from "../../Front/assest/imgs/shape.svg";
import downlod from "../../Front/assest/imgs/download.png";

const Photogallery = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const imagesPerPage = 8;
  const totalPages = Math.ceil(photos.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = photos.slice(startIndex, startIndex + imagesPerPage);

  // 🧠 Fetch photos from API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://astrology-backend-p4on.onrender.com/api/photo");
        setPhotos(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to load photos. Please check your backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {/* --- HEADER SECTION --- */}
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
          <h2 className="text-3xl md:text-4xl font-semibold">Photo Gallery</h2>
          <p className="flex text-sm md:text-base mt-3 justify-center items-center cursor-pointer">
            Home <FaStarOfDavid className="mx-2" /> Photo Gallery
          </p>
        </motion.div>
      </div>

      <div
        className="w-full h-[100px] rotate-180 mt-[-90px]"
        style={{ backgroundImage: `url(${shape})` }}
      ></div>

      {/* --- CONTENT SECTION --- */}
      <div className="section-9 overflow-hidden pb-20 px-5 md:px-10 text-center">
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center pb-10"
        >
          <img src={downlod} alt="download" className="m-auto my-5 w-14 md:w-50" />
          <p className="max-w-2xl mx-auto text-gray-700">
            Explore our gallery of divine moments captured through the lens of devotion and spirituality.
          </p>
        </motion.div>

        {/* --- LOADING / ERROR HANDLING --- */}
        {loading && <p className="text-gray-600 mt-5">Loading photos...</p>}
        {error && <p className="text-red-500 mt-5">{error}</p>}

        {/* --- PHOTO GRID --- */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
              {currentImages.map((photo, index) => (
                <motion.div
                  key={photo._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full flex justify-center"
                >
                  <img
                    src={photo.imageUrl}
                    alt={`gallery-${index}`}
                    className="rounded-xl duration-500 hover:scale-105 shadow-lg w-[250px] h-[180px] md:w-[300px] md:h-70 object-contain"
                  />
                </motion.div>
              ))}
            </div>

            {/* --- PAGINATION --- */}
            <div className="flex justify-center mt-10 gap-5 flex-wrap">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  currentPage === 1
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-gray-800">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  currentPage === totalPages
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Photogallery;
