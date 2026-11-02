import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaStar, FaRegStar } from "react-icons/fa";

import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import "../css/productsPage.css";

const getProductId = (product) => product?._id || product?.id;

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [addingId, setAddingId] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeIsError, setNoticeIsError] = useState(false);

  useEffect(() => {
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

        if (active) setProducts(Array.isArray(list) ? list : []);
      } catch (error) {
        if (active) setFetchError(getErrorMessage(error, "Unable to load products. Please try again."));
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProducts();
    return () => { active = false; };
  }, []);

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const searchable = [product.name, product.role, product.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return !term || searchable.includes(term);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return Number(a.price || 0) - Number(b.price || 0);
      if (sortBy === "price-high") return Number(b.price || 0) - Number(a.price || 0);
      if (sortBy === "name") return String(a.name || "").localeCompare(String(b.name || ""));
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [products, search, sortBy]);

  const handleAddToCart = async (product) => {
    setNotice("");
    setNoticeIsError(false);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/products", message: "Please sign in, then add the product to your cart." } });
      return;
    }

    const productId = getProductId(product);
    if (!productId) {
      setNotice("This product is missing its database ID and cannot be added to the cart.");
      setNoticeIsError(true);
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
        navigate("/login", { state: { from: "/products", message: "Your session expired. Please sign in again." } });
        return;
      }
      setNotice(getErrorMessage(error, "Could not add the product to your cart."));
      setNoticeIsError(true);
    } finally {
      setAddingId("");
    }
  };

  return (
    <main className="shop-page">
      <section className="shop-catalogue" aria-label="Product catalogue">
        <div className="shop-toolbar">
          <div>
            <h2>All Products</h2>
            <p>{loading ? "Loading products…" : `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"} found`}</p>
          </div>
          <div className="shop-controls">
            <label className="shop-search">
              <FaSearch aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
            </label>
            <label className="shop-sort-label">
              <span>Sort by</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>

        {notice && (
          <p className={`shop-notice ${noticeIsError ? "is-error" : "is-success"}`} role="status">
            {notice}
            {!noticeIsError && <Link to="/cart"> View cart</Link>}
          </p>
        )}

        {loading ? (
          <div className="shop-state"><span className="shop-spinner" />Loading products…</div>
        ) : fetchError ? (
          <div className="shop-state shop-state-error" role="alert">
            <h3>Products could not be loaded</h3>
            <p>{fetchError}</p>
            <button type="button" onClick={() => window.location.reload()}>Try again</button>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="shop-state">
            <h3>{search ? "No matching products" : "No products available yet"}</h3>
            <p>{search ? "Try another search term." : "Please check back soon for new astrology products."}</p>
            {search && <button type="button" onClick={() => setSearch("")}>Clear search</button>}
          </div>
        ) : (
          <div className="shop-product-grid">
            {visibleProducts.map((product, index) => {
              const productId = getProductId(product) || product.name || index;
              const image = product.imageUrl || product.image || product.thumbnail || "";
              const rating = Math.max(0, Math.min(5, Number(product.rating) || 4));
              const oldPrice = product.oldprice ?? product.oldPrice;
              const isAdding = addingId === getProductId(product);
              const hasDiscount = oldPrice != null && Number(oldPrice) > Number(product.price);
              const discount = hasDiscount
                ? Math.round((1 - Number(product.price) / Number(oldPrice)) * 100)
                : 0;

              return (
                <article className="shop-product-card" key={productId}>
                  <div className="shop-product-image-wrap">
                    {hasDiscount && <span className="shop-discount-badge">{discount}% OFF</span>}
                    {image ? (
                      <img
                        src={image}
                        alt={product.name || "Astrology product"}
                        className="shop-product-image"
                        loading="lazy"
                        onError={(event) => { event.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div className="shop-image-placeholder">No image available</div>
                    )}
                  </div>

                  <div className="shop-product-info">
                    <div className="shop-product-rating" aria-label={`${rating} out of 5 stars`}>
                      {[...Array(5)].map((_, starIndex) =>
                        starIndex < Math.round(rating)
                          ? <FaStar key={starIndex} />
                          : <FaRegStar key={starIndex} />
                      )}
                    </div>
                    <h3>{product.name || "Astrology Product"}</h3>
                    {product.role && <p className="shop-product-description">{product.role}</p>}
                    <div className="shop-product-prices">
                      <span className="shop-current-price">₹{Number(product.price ?? 0).toLocaleString("en-IN")}</span>
                      {hasDiscount && <span className="shop-old-price">₹{Number(oldPrice).toLocaleString("en-IN")}</span>}
                    </div>
                    <button
                      type="button"
                      className="shop-add-button"
                      onClick={() => handleAddToCart(product)}
                      disabled={isAdding}
                    >
                      <FaShoppingCart />
                      {isAdding ? "Adding to cart…" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default ProductsPage;
