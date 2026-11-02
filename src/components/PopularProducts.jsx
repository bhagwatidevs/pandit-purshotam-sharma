import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../css/popularProducts.css";

import downlod from "../assets/im.png";
import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";

const getProductId = (product) => product?._id || product?.id;

const PopularProducts = ({ products, onAddToCart }) => {
  const navigate = useNavigate();
  const [remoteProducts, setRemoteProducts] = useState([]);
  const [loading, setLoading] = useState(!Array.isArray(products));
  const [fetchError, setFetchError] = useState("");
  const [addingId, setAddingId] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (Array.isArray(products)) {
      setRemoteProducts(products);
      setLoading(false);
      setFetchError("");
      return undefined;
    }

    let active = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setFetchError("");
        const response = await api.get(API_ENDPOINTS.PRODUCT);
        const payload = response.data;
        const list = Array.isArray(payload)
          ? payload
          : payload?.products || payload?.data || [];

        if (active) setRemoteProducts(Array.isArray(list) ? list : []);
      } catch (error) {
        if (active) {
          setFetchError(getErrorMessage(error, "Unable to load products."));
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, [products]);

  const productList = (Array.isArray(products) ? products : remoteProducts).slice(0, 8);

  const handleAddToCart = async (product) => {
    setNotice("");

    if (typeof onAddToCart === "function") {
      onAddToCart(product);
      setNotice(`${product.name || "Product"} added to your cart.`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: {
          from: "/products",
          message: "Please sign in, then add this product to your cart.",
        },
      });
      return;
    }

    const productId = getProductId(product);
    if (!productId) {
      setNotice("This product has no database ID and cannot be added to the cart.");
      return;
    }

    try {
      setAddingId(productId);
      await api.post(`${API_ENDPOINTS.CART}/add`, { productId, quantity: 1 });
      setNotice(`${product.name || "Product"} added to your cart.`);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", {
          state: {
            from: "/products",
            message: "Your session expired. Please sign in again.",
          },
        });
        return;
      }
      setNotice(getErrorMessage(error, "Could not add the product to cart."));
    } finally {
      setAddingId("");
    }
  };

  return (
    <section className="popular-products-section">
      <motion.div
        initial={{ y: -35, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="popular-products-heading"
      >
        <h2 className="popular-products-title">Popular Products</h2>
        <img src={downlod} alt="" className="popular-products-divider" />
        <p className="popular-products-description">
          Discover our most-loved astrology offerings — from personalized
          birth chart readings to spiritual essentials selected for you.
        </p>
      </motion.div>

      {notice && <p className="dynamic-status" role="status">{notice}</p>}

      {loading ? (
        <p className="dynamic-status">Loading products…</p>
      ) : fetchError ? (
        <p className="dynamic-status dynamic-status--error" role="alert">{fetchError}</p>
      ) : productList.length > 0 ? (
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.1 }}
          className="popular-products-carousel"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={18}
            slidesPerView={Math.min(productList.length, 1.12)}
            slidesPerGroup={1}
            loop={productList.length >= 8}
            rewind={productList.length > 1 && productList.length < 8}
            speed={600}
            autoplay={productList.length > 1 ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            } : false}
            pagination={{ clickable: true }}
            breakpoints={{
              520: { slidesPerView: Math.min(productList.length, 2), spaceBetween: 18 },
              768: { slidesPerView: Math.min(productList.length, 3), spaceBetween: 20 },
              1100: { slidesPerView: Math.min(productList.length, 4), spaceBetween: 24 },
            }}
            className="popular-products-swiper"
          >
            {productList.map((product, index) => {
              const productId = getProductId(product) || product.name || index;
              const adding = addingId === getProductId(product);
              const image = product.imageUrl || product.image || product.thumbnail || "";
              const rating = Math.max(0, Math.min(5, Number(product.rating) || 4));
              const oldPrice = product.oldprice ?? product.oldPrice;

              return (
                <SwiperSlide key={productId}>
                  <motion.article
                    className="popular-product-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.2), duration: 0.35 }}
                    viewport={{ once: true }}
                  >
                    <span className="popular-product-badge">Available</span>
                    <div className="popular-product-image-wrapper">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name || "Astrology product"}
                          className="popular-product-image"
                          loading="lazy"
                          onError={(event) => { event.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <div className="popular-product-no-image">No image available</div>
                      )}
                      <div className="popular-product-overlay">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          disabled={adding}
                          className="popular-product-cart-button"
                        >
                          <FaShoppingCart />
                          <span>{adding ? "Adding…" : "Add to Cart"}</span>
                        </button>
                      </div>
                    </div>
                    <div className="popular-product-details">
                      <div className="popular-product-rating" aria-label={`${rating} out of 5 stars`}>
                        {[...Array(5)].map((_, starIndex) =>
                          starIndex < Math.round(rating)
                            ? <FaStar key={starIndex} className="popular-product-star" />
                            : <FaRegStar key={starIndex} className="popular-product-star" />
                        )}
                      </div>
                      <h3 className="popular-product-name">{product.name || "Astrology Product"}</h3>
                      {product.role && <p className="popular-product-role">{product.role}</p>}
                      <div className="popular-product-price-wrapper">
                        <span className="popular-product-price">₹{Number(product.price ?? 0).toLocaleString("en-IN")}</span>
                        {oldPrice != null && Number(oldPrice) > Number(product.price) && (
                          <span className="popular-product-old-price">₹{Number(oldPrice).toLocaleString("en-IN")}</span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      ) : (
        <p className="dynamic-status">No products have been added yet.</p>
      )}

      <div className="popular-products-view-more">
        <Link to="/products" className="popular-products-view-link">
          View More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default PopularProducts;
