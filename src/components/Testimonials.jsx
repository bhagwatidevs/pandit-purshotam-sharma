
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaPen,
  FaTimes,
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import api from "../services/api";
import "../css/testimonial-review.css";

import downlod from "../assets/im.png";

const REVIEWS_ENDPOINT = "/api/reviews";

// Get customer initials
const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "U";

// Normalize backend reviews
const normalizeReview = (item, fallback = {}) => ({
  id:
    item?._id ||
    item?.id ||
    fallback.id ||
    `review-${Date.now()}`,

  name: item?.name || fallback.name || "Website Visitor",

  rating: Math.min(
    5,
    Math.max(
      1,
      Number(item?.rating ?? fallback.rating ?? 5)
    )
  ),

  text:
    item?.text ||
    item?.review ||
    item?.comment ||
    fallback.text ||
    "",

  createdAt: item?.createdAt || item?.date || null,
});

// Newest reviews first
const sortReviews = (items) =>
  [...items].sort((a, b) => {
    const dateA = a.createdAt
      ? new Date(a.createdAt).getTime()
      : 0;

    const dateB = b.createdAt
      ? new Date(b.createdAt).getTime()
      : 0;

    return dateB - dateA;
  });

// Format date
const formatReviewDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Testimonials = () => {
  const swiperRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewNotice, setReviewNotice] = useState("");

  // Number of cards according to available reviews
  const desktopSlides = Math.min(4, Math.max(1, reviews.length));
  const tabletSlides = Math.min(2, Math.max(1, reviews.length));

  // Load reviews from MongoDB
  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        const response = await api.get(REVIEWS_ENDPOINT);
        const data = response.data;

        const records = Array.isArray(data)
          ? data
          : Array.isArray(data?.reviews)
            ? data.reviews
            : Array.isArray(data?.data)
              ? data.data
              : [];

        if (isMounted) {
          const savedReviews = records
            .map((item) => normalizeReview(item))
            .filter((item) => item.text);

          setReviews(sortReviews(savedReviews));
        }
      } catch (error) {
        console.error("Could not load reviews:", error);

        if (isMounted) {
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (!isReviewOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !submitting) {
        setIsReviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isReviewOpen, submitting]);

  // Form input handler
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setReviewForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Previous slide
  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  // Next slide
  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  // Submit review
  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    setReviewError("");
    setReviewNotice("");

    const payload = {
      name: reviewForm.name.trim(),
      rating: Number(reviewForm.rating),
      text: reviewForm.text.trim(),
    };

    if (!payload.name) {
      setReviewError("Please enter your name.");
      return;
    }

    if (payload.rating < 1 || payload.rating > 5) {
      setReviewError("Please select your star rating.");
      return;
    }

    if (payload.text.length < 10) {
      setReviewError("Please write at least 10 characters.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post(
        REVIEWS_ENDPOINT,
        payload
      );

      const saved =
        response.data?.review ||
        response.data?.data?.review ||
        response.data?.data ||
        response.data;

      const newReview = normalizeReview(saved, {
        ...payload,
        id: `review-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });

      // Add new review at the beginning
      setReviews((previous) =>
        sortReviews([
          newReview,
          ...previous.filter(
            (item) => String(item.id) !== String(newReview.id)
          ),
        ])
      );

      setReviewForm({
        name: "",
        rating: 0,
        text: "",
      });

      setHoverRating(0);
      setIsReviewOpen(false);

      setReviewNotice(
        "Thank you! Your review has been submitted successfully."
      );

      // Scroll to top of the review section
      window.setTimeout(() => {
        document
          .querySelector(".reviews-carousel-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 200);
    } catch (error) {
      console.error("Review submission failed:", error);

      setReviewError(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Your review could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Open review modal
  const openReviewForm = () => {
    setReviewError("");
    setReviewNotice("");

    setReviewForm({
      name: "",
      rating: 0,
      text: "",
    });

    setIsReviewOpen(true);
  };

  const selectedRating = hoverRating || reviewForm.rating;

  return (
    <section className="reviews-section">

      {/* ================= HEADING ================= */}

      <motion.div
        className="reviews-heading"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="reviews-eyebrow">
          CUSTOMER EXPERIENCES
        </span>

        <h2 className="reviews-title">
          What Our Clients Say
        </h2>

        <img
          src={downlod}
          alt=""
          className="reviews-divider"
        />

        <p className="reviews-description">
          Read experiences shared by our visitors and
          share your own experience with us.
        </p>

        <button
          type="button"
          className="reviews-write-button"
          onClick={openReviewForm}
        >
          <FaPen />
          Write a Review
        </button>

        {reviewNotice && (
          <p
            className="reviews-success-message"
            role="status"
          >
            {reviewNotice}
          </p>
        )}
      </motion.div>

      {/* ================= REVIEWS SLIDER ================= */}

      <div className="reviews-carousel-section">

        {loading ? (
          <div className="reviews-empty-state">
            Loading customer reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="reviews-empty-state">

            <FaQuoteRight className="reviews-empty-icon" />

            <h3>Be the First to Write a Review!</h3>

            <p>
              Share your experience and help others learn
              about our services.
            </p>

            <button
              type="button"
              className="reviews-empty-button"
              onClick={openReviewForm}
            >
              Write the First Review
            </button>

          </div>
        ) : (
          <motion.div
            className="reviews-slider-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >

            {/* LEFT ARROW */}

            <button
              type="button"
              className="reviews-slider-arrow reviews-slider-arrow-prev"
              onClick={handlePrevious}
              disabled={reviews.length <= 4}
              aria-label="Previous reviews"
            >
              <FaChevronLeft />
            </button>

            {/* SWIPER */}

            <Swiper
              key={`reviews-${reviews.length}`}
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={22}
              speed={700}
              loop={reviews.length > 4}
              rewind={reviews.length > 1 && reviews.length <= 4}
              grabCursor={true}
              watchOverflow={true}
              autoplay={
                reviews.length > 1
                  ? {
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                      waitForTransition: true,
                    }
                  : false
              }
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: tabletSlides,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: desktopSlides,
                  spaceBetween: 22,
                },
              }}
              className="reviews-swiper"
            >

              {reviews.map((review) => (
                <SwiperSlide key={review.id}>

                  <article className="reviews-card">

                    {/* Customer Header */}

                    <div className="reviews-card-top">

                      <div className="reviews-user-info">

                        <div className="reviews-user-avatar">
                          {getInitials(review.name)}
                        </div>

                        <div className="reviews-user-details">
                          <h3>{review.name}</h3>
                          <span>Customer Review</span>
                        </div>

                      </div>

                      <FaQuoteRight className="reviews-quote-icon" />

                    </div>

                    {/* Rating */}

                    <div
                      className="reviews-card-stars"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < review.rating
                              ? "star-filled"
                              : "star-empty"
                          }
                        />
                      ))}
                    </div>

                    {/* Review Text */}

                    <p className="reviews-card-text">
                      “{review.text}”
                    </p>

                    {/* Footer */}

                    <div className="reviews-card-footer">
                      <span>Shared Experience</span>

                      {formatReviewDate(review.createdAt) && (
                        <time>
                          {formatReviewDate(review.createdAt)}
                        </time>
                      )}
                    </div>

                  </article>

                </SwiperSlide>
              ))}

            </Swiper>

            {/* RIGHT ARROW */}

            <button
              type="button"
              className="reviews-slider-arrow reviews-slider-arrow-next"
              onClick={handleNext}
              disabled={reviews.length <= 4}
              aria-label="Next reviews"
            >
              <FaChevronRight />
            </button>

          </motion.div>
        )}

      </div>

      {/* ================= REVIEW FORM MODAL ================= */}

      {isReviewOpen && (
        <div
          className="reviews-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !submitting
            ) {
              setIsReviewOpen(false);
            }
          }}
        >

          <section
            className="reviews-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reviews-modal-title"
          >

            <div className="reviews-modal-header">

              <div>
                <span className="reviews-modal-eyebrow">
                  YOUR FEEDBACK MATTERS
                </span>

                <h2 id="reviews-modal-title">
                  Write a Review
                </h2>

                <p>
                  Share your experience with us.
                </p>
              </div>

              <button
                type="button"
                className="reviews-modal-close"
                onClick={() => setIsReviewOpen(false)}
                disabled={submitting}
                aria-label="Close review form"
              >
                <FaTimes />
              </button>

            </div>

            <form
              className="reviews-form"
              onSubmit={handleReviewSubmit}
            >

              {/* STAR RATING */}

              <div className="reviews-rating-field">

                <label className="reviews-field-label">
                  Rate your experience
                </label>

                <div
                  className="reviews-rating-picker"
                  role="group"
                  aria-label="Select star rating"
                >

                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className={`reviews-rating-star ${
                        rating <= selectedRating ? "selected" : ""
                      }`}
                      onMouseEnter={() => setHoverRating(rating)}
                      onMouseLeave={() => setHoverRating(0)}
                      onFocus={() => setHoverRating(rating)}
                      onBlur={() => setHoverRating(0)}
                      onClick={() =>
                        setReviewForm((previous) => ({
                          ...previous,
                          rating,
                        }))
                      }
                      aria-label={`${rating} stars`}
                      aria-pressed={reviewForm.rating === rating}
                    >
                      {rating <= selectedRating ? (
                        <FaStar />
                      ) : (
                        <FaRegStar />
                      )}
                    </button>
                  ))}

                </div>

                <span className="reviews-rating-hint">
                  {reviewForm.rating
                    ? `${reviewForm.rating} out of 5 stars selected`
                    : "Select your rating"}
                </span>

              </div>

              {/* NAME */}

              <label className="reviews-form-field">
                <span>Your Name</span>

                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter your name"
                  maxLength={80}
                  autoComplete="name"
                  required
                />
              </label>

              {/* REVIEW */}

              <label className="reviews-form-field">
                <span>Write your review</span>

                <textarea
                  name="text"
                  value={reviewForm.text}
                  onChange={handleFormChange}
                  placeholder="Share details of your experience..."
                  rows={5}
                  minLength={10}
                  maxLength={1000}
                  required
                />

                <small>
                  {reviewForm.text.length}/1000 characters
                </small>
              </label>

              {/* ERROR */}

              {reviewError && (
                <p
                  className="reviews-error-message"
                  role="alert"
                >
                  {reviewError}
                </p>
              )}

              {/* ACTION BUTTONS */}

              <div className="reviews-form-actions">

                <button
                  type="button"
                  className="reviews-cancel-button"
                  onClick={() => setIsReviewOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="reviews-submit-button"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Post Review"}
                </button>

              </div>

              <p className="reviews-privacy-note">
                Please do not share private or sensitive
                personal information in your review.
              </p>

            </form>

          </section>

        </div>
      )}

    </section>
  );
};

export default Testimonials;
