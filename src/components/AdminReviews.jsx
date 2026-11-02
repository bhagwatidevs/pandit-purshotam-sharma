import React, { useEffect, useState } from "react";
import { FaStar, FaTrash, FaSyncAlt, FaUserCircle } from "react-icons/fa";
import api from "../services/api";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/reviews");

      const data = response.data;
      const reviewList = Array.isArray(data)
        ? data
        : data?.reviews || data?.data || [];

      setReviews(reviewList);
    } catch (err) {
      console.error("Fetch reviews error:", err);

      setError(
        err.response?.data?.message ||
        "Reviews load nahi ho paaye. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Kya aap sach mein is review ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setSuccess("");

      await api.delete(`/api/reviews/${id}`);

      setReviews((previous) =>
        previous.filter((review) => review._id !== id)
      );

      setSuccess("Review successfully deleted.");
    } catch (err) {
      console.error("Delete review error:", err);

      setError(
        err.response?.data?.message ||
        "Review delete nahi ho paaya."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={
          index < Number(rating)
            ? "text-yellow-500"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Customer Reviews
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and monitor customer feedback.
          </p>
        </div>

        <button
          onClick={fetchReviews}
          disabled={loading}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg transition disabled:opacity-50"
        >
          <FaSyncAlt />
          Refresh Reviews
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">
            Total Reviews
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            {reviews.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">
            Average Rating
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">
            {reviews.length
              ? (
                  reviews.reduce(
                    (total, review) =>
                      total + Number(review.rating || 0),
                    0
                  ) / reviews.length
                ).toFixed(1)
              : "0.0"}
            <span className="text-yellow-500 text-xl ml-2">★</span>
          </h2>
        </div>

      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-5">
          {success}
        </div>
      )}

      {/* Reviews */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            All Customer Reviews
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16">
            <FaUserCircle className="text-5xl text-gray-300 mx-auto mb-4" />

            <h3 className="text-lg font-semibold text-gray-700">
              No Reviews Found
            </h3>

            <p className="text-gray-500 mt-2">
              Customer reviews will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y">

            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 md:p-6 flex flex-col md:flex-row justify-between gap-5 hover:bg-gray-50 transition"
              >

                {/* Review Details */}
                <div className="flex-1">

                  <div className="flex items-center gap-3 mb-3">

                    <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold">
                      {(review.name || "U").charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {review.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        {review.createdAt
                          ? new Date(review.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "Date unavailable"}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500 ml-2">
                      ({review.rating}/5)
                    </span>
                  </div>

                  <p className="text-gray-600 leading-7 whitespace-pre-wrap break-words">
                    {review.text || review.review}
                  </p>

                </div>

                {/* Delete Button */}
                <div className="flex items-center md:justify-center">

                  <button
                    onClick={() => handleDelete(review._id)}
                    disabled={deletingId === review._id}
                    className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 px-5 py-3 rounded-lg transition disabled:opacity-50"
                  >
                    <FaTrash />

                    {deletingId === review._id
                      ? "Deleting..."
                      : "Delete Review"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminReviews;