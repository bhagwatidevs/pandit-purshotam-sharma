import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaTimes, FaArrowRight, FaImages } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../css/photoGallery.css";

import downlod from "../assets/im.png";
import galleryFallback from "../assets/IMG-20260729-WA1135.jpg";
import shape from "../assets/shape.svg";
import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";

const getPhotoImage = (photo) => photo?.imageUrl || photo?.image || photo?.thumbnail || "";

const PhotoGallery = ({ photos, preview = false }) => {
  const [remotePhotos, setRemotePhotos] = useState([]);
  const [loading, setLoading] = useState(!Array.isArray(photos));
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (Array.isArray(photos)) {
      setRemotePhotos(photos);
      setLoading(false);
      setError("");
      return undefined;
    }

    let active = true;

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(API_ENDPOINTS.PHOTO);
        const payload = response.data;
        const list = Array.isArray(payload)
          ? payload
          : payload?.photos || payload?.photo || payload?.data || [];
        if (active) setRemotePhotos(Array.isArray(list) ? list : []);
      } catch (err) {
        if (active) setError(getErrorMessage(err, "Unable to load gallery photos."));
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPhotos();
    return () => {
      active = false;
    };
  }, [photos]);

  const photoList = Array.isArray(photos) ? photos : remotePhotos;
  const filteredPhotos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return photoList;
    return photoList.filter((photo, index) =>
      [photo.title, photo.name, photo.category, `gallery image ${index + 1}`]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [photoList, search]);

  const previewPhotos = photoList.slice(0, 8);

  const renderPhotoCard = (photo, index, isPreview = false) => {
    const image = getPhotoImage(photo) || (!isPreview ? galleryFallback : "");
    return (
      <button
        type="button"
        key={photo._id || photo.id || `${photo.title || "photo"}-${index}`}
        className={`photo-gallery-card ${isPreview ? "photo-gallery-card--preview" : ""}`}
        onClick={() => setSelectedPhoto({ ...photo, displayImage: image, displayIndex: index })}
        aria-label={`View ${photo.title || `gallery image ${index + 1}`}`}
      >
        {image ? (
          <img
            src={image}
            alt={photo.title || `Gallery Image ${index + 1}`}
            className="photo-gallery-image"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span className="photo-gallery-placeholder">
            <FaImages aria-hidden="true" />
            Image unavailable
          </span>
        )}
        <span className="photo-gallery-card-overlay">
          <span>{photo.title || `Gallery Image ${index + 1}`}</span>
          <span className="photo-gallery-view-label">View Photo</span>
        </span>
      </button>
    );
  };

  return (
    <section className={`photo-gallery-section ${preview ? "photo-gallery-section--preview" : "photo-gallery-section--catalogue"}`}>
      <motion.div
        initial={{ y: -35, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        viewport={{ once: true }}
        className="photo-gallery-heading"
      >
        <p className="photo-gallery-eyebrow">MOMENTS & MEMORIES</p>
        <h2 className="photo-gallery-title">
          {preview ? "Photo Gallery" : "Explore Our Photo Gallery"}
        </h2>
        <img src={downlod} alt="" className="photo-gallery-divider" />
        <p className="photo-gallery-description">
          Browse moments from astrology sessions, spiritual events, and celestial
          celebrations. Each image reflects the beauty, energy, and wisdom of our journey.
        </p>
      </motion.div>

      {preview ? (
        <div className="photo-gallery-preview-wrap">
          {loading ? (
            <p className="dynamic-status">Loading gallery…</p>
          ) : error ? (
            <p className="dynamic-status dynamic-status--error">{error}</p>
          ) : previewPhotos.length ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={18}
              slidesPerView={Math.min(previewPhotos.length, 1.08)}
              slidesPerGroup={1}
              loop={previewPhotos.length >= 4}
              rewind={previewPhotos.length > 1 && previewPhotos.length < 4}
              autoplay={previewPhotos.length > 1 ? {
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              } : false}
              speed={600}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: Math.min(previewPhotos.length, 2), spaceBetween: 20 },
                1024: { slidesPerView: Math.min(previewPhotos.length, 3), spaceBetween: 24 },
              }}
              className="photo-gallery-swiper"
            >
              {previewPhotos.map((photo, index) => (
                <SwiperSlide key={photo._id || photo.id || index}>
                  {renderPhotoCard(photo, index, true)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="photo-gallery-empty">No gallery photos have been uploaded yet.</p>
          )}

          <div className="photo-gallery-view-more">
            <Link to="/photo-gallery" className="photo-gallery-view-link">
              View More <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="photo-gallery-catalogue">
          <div className="photo-gallery-toolbar">
            <div>
              <h3>All Photos</h3>
              <p>{loading ? "Loading photos…" : `${filteredPhotos.length} photo${filteredPhotos.length === 1 ? "" : "s"} found`}</p>
            </div>
            <label className="photo-gallery-search">
              <FaSearch aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search photos..."
                aria-label="Search gallery photos"
              />
            </label>
          </div>

          {loading ? (
            <p className="dynamic-status">Loading gallery…</p>
          ) : error ? (
            <p className="dynamic-status dynamic-status--error">{error}</p>
          ) : filteredPhotos.length ? (
            <div className="photo-gallery-grid">
              {filteredPhotos.map((photo, index) => renderPhotoCard(photo, index))}
            </div>
          ) : (
            <div className="photo-gallery-empty">
              {search ? "No matching photos found." : "No gallery photos have been uploaded yet."}
              {search && (
                <button type="button" className="photo-gallery-clear" onClick={() => setSearch("")}>
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div
        className="photo-gallery-bottom-shape"
        style={{ backgroundImage: `url(${shape})` }}
        aria-hidden="true"
      />

      {selectedPhoto && (
        <div className="photo-lightbox-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedPhoto(null);
        }}>
          <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo">
            <button
              type="button"
              className="photo-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
            >
              <FaTimes />
            </button>
            <img
              src={selectedPhoto.displayImage || getPhotoImage(selectedPhoto) || galleryFallback}
              alt={selectedPhoto.title || `Gallery Image ${(selectedPhoto.displayIndex || 0) + 1}`}
            />
            {selectedPhoto.title && <p>{selectedPhoto.title}</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
