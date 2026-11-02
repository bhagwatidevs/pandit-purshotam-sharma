import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserAlt, FaSearch, FaTimes, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "../css/latestArticles.css";

import downlod from "../assets/im.png";
import shape from "../assets/shape.svg";
import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";

const getArticleImage = (article) =>
  article?.imageUrl || article?.image || article?.thumbnail || "";

const getArticleDate = (value) => {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? ""
    : parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
};

const classifyContent = (item) => {
  const explicitType = String(item?.contentType || item?.type || "").trim().toLowerCase();
  const category = String(item?.category || "").trim();

  if (/news|press/.test(explicitType)) return "news";

  // Compatibility: older press records may have been saved as articles before
  // the dedicated press endpoint existed. Detect clear news/press categories.
  if (/(^|[\s_-])(news|press)([\s_-]|$)/i.test(category)) return "news";

  if (explicitType) return "article";
  return "article";
};

const LatestArticles = ({ blogs, preview = false, contentType = "article" }) => {
  const isNews = contentType === "news";
  const pageLabel = isNews ? "News & Press Releases" : "Articles & Blogs";
  const pageIntro = isNews
    ? "Read the latest news, media coverage, announcements, and press releases."
    : "Explore astrology articles, planetary insights, remedies, and practical life guidance.";
  const [remoteBlogs, setRemoteBlogs] = useState([]);
  const [loading, setLoading] = useState(!Array.isArray(blogs));
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      setRemoteBlogs(blogs.filter((item) => classifyContent(item) === contentType));
      setLoading(false);
      setError("");
      return undefined;
    }

    let active = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const contentEndpoint = contentType === "news"
          ? API_ENDPOINTS.PRESS_RELEASE
          : API_ENDPOINTS.BLOG;
        const response = await api.get(contentEndpoint, {
          params: contentType === "news" ? undefined : { type: "article" },
        });
        const payload = response.data;
        const list = Array.isArray(payload)
          ? payload
          : payload?.blogs || payload?.data || payload?.posts || [];

        if (active) {
          const safeList = Array.isArray(list) ? list : [];
          setRemoteBlogs(safeList.filter((item) => classifyContent(item) === contentType));
        }
      } catch (err) {
        if (active) {
          setError(getErrorMessage(err, "Unable to load articles."));
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      active = false;
    };
  }, [blogs, contentType]);

  const articleList = Array.isArray(blogs)
    ? blogs.filter((item) => classifyContent(item) === contentType)
    : remoteBlogs;

  const categories = useMemo(() => {
    return [...new Set(articleList.map((item) => item.category).filter(Boolean))].sort();
  }, [articleList]);

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = articleList.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const searchable = [article.title, article.name, article.category, article.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!term || searchable.includes(term));
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (sortBy === "title") {
        return String(a.title || "").localeCompare(String(b.title || ""));
      }
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }, [articleList, search, category, sortBy]);

  const previewArticles = articleList.slice(0, 6);

  const renderArticleCard = (blog, index, isPreview = false) => {
    const image = getArticleImage(blog);
    const publishedDate = getArticleDate(blog.createdAt);

    return (
      <article
        key={blog._id || blog.id || `${blog.title || "article"}-${index}`}
        className={`latest-article-card ${isPreview ? "latest-article-card--preview" : ""}`}
      >
        <div className="latest-article-image-wrapper">
          {image ? (
            <img
              src={image}
              alt={blog.title || blog.name || (isNews ? "News release" : "Astrology article")}
              className="latest-article-image"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="latest-article-no-image">{isNews ? "News Release" : "Astrology Article"}</div>
          )}
          {publishedDate && (
            <span className="latest-article-date">
              <FaCalendarAlt aria-hidden="true" /> {publishedDate}
            </span>
          )}
        </div>

        <div className="latest-article-content">
          <div className="latest-article-author">
            <FaUserAlt className="latest-article-author-icon" />
            <span>By {blog.name || "Astrology Expert"}</span>
          </div>

          {blog.category && (
            <span className="latest-article-category">{blog.category}</span>
          )}

          <h3 className="latest-article-title">
            {blog.title || (isNews ? "News Release" : "Astrology Article")}
          </h3>

          {blog.description && (
            <p className="latest-article-description">{blog.description}</p>
          )}

          <button
            type="button"
            className="latest-article-read-more"
            onClick={() => setSelectedArticle(blog)}
          >
            {isNews ? "Read News" : "Read Article"} <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <section className={`latest-articles-section ${preview ? "latest-articles-section--preview" : "latest-articles-section--catalogue"}`}>
      <motion.div
        initial={{ y: -35, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        viewport={{ once: true }}
        className="latest-articles-heading"
      >
        <p className="latest-articles-eyebrow">
          {isNews ? "NEWSROOM & MEDIA UPDATES" : "ASTROLOGY INSIGHTS"}
        </p>
        <h2 className="latest-articles-heading-title">
          {preview ? "Latest Blogs" : pageLabel}
        </h2>
        <img src={downlod} alt="" className="latest-articles-divider" />
        <p className="latest-articles-intro">{pageIntro}</p>
      </motion.div>

      {preview ? (
        <div className="latest-articles-preview-wrap">
          {loading ? (
            <p className="dynamic-status">Loading articles…</p>
          ) : error ? (
            <p className="dynamic-status dynamic-status--error">{error}</p>
          ) : previewArticles.length ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={18}
              slidesPerView={Math.min(previewArticles.length, 1.08)}
              slidesPerGroup={1}
              loop={previewArticles.length >= 4}
              rewind={previewArticles.length > 1 && previewArticles.length < 4}
              autoplay={previewArticles.length > 1 ? {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              } : false}
              speed={600}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: Math.min(previewArticles.length, 2), spaceBetween: 20 },
                1024: { slidesPerView: Math.min(previewArticles.length, 3), spaceBetween: 24 },
              }}
              className="latest-articles-swiper"
            >
              {previewArticles.map((blog, index) => (
                <SwiperSlide key={blog._id || blog.id || index}>
                  {renderArticleCard(blog, index, true)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="latest-articles-empty">No articles are published yet.</p>
          )}

          <div className="latest-articles-view-more">
            <Link to={isNews ? "/press-release" : "/blog"} className="latest-articles-view-link">
              View More <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="latest-articles-catalogue">
          <div className="latest-articles-toolbar">
            <div className="latest-articles-results">
              <h3>{isNews ? "All News & Press Releases" : "All Articles & Blogs"}</h3>
              <p>{loading ? "Loading articles…" : `${filteredArticles.length} article${filteredArticles.length === 1 ? "" : "s"} found`}</p>
            </div>
            <div className="latest-articles-controls">
              <label className="latest-articles-search">
                <FaSearch aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                />
              </label>
              <label className="latest-articles-select-label">
                <span>Category</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="all">All categories</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label className="latest-articles-select-label">
                <span>Sort</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title A–Z</option>
                </select>
              </label>
            </div>
          </div>

          {loading ? (
            <p className="dynamic-status">Loading articles…</p>
          ) : error ? (
            <p className="dynamic-status dynamic-status--error">{error}</p>
          ) : filteredArticles.length ? (
            <div className="latest-articles-grid">
              {filteredArticles.map((blog, index) => renderArticleCard(blog, index))}
            </div>
          ) : (
            <div className="latest-articles-empty">
              {search || category !== "all"
                ? `No matching ${isNews ? "news items" : "articles"} found.`
                : `No ${isNews ? "news releases" : "articles"} have been published yet.`}
              {(search || category !== "all") && (
                <button type="button" className="latest-articles-clear" onClick={() => { setSearch(""); setCategory("all"); }}>
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div
        className="latest-articles-bottom-shape"
        style={{ backgroundImage: `url(${shape})` }}
        aria-hidden="true"
      />

      {selectedArticle && (
        <div className="article-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedArticle(null);
        }}>
          <section className="article-modal" role="dialog" aria-modal="true" aria-labelledby="article-modal-title">
            <button
              type="button"
              className="article-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              <FaTimes />
            </button>
            {getArticleImage(selectedArticle) && (
              <img
                className="article-modal-image"
                src={getArticleImage(selectedArticle)}
                alt={selectedArticle.title || (isNews ? "News release" : "Astrology article")}
              />
            )}
            <div className="article-modal-content">
              <p className="article-modal-meta">
                {isNews ? "News / Press Release" : (selectedArticle.category || "Astrology Article")}
                {getArticleDate(selectedArticle.createdAt) && ` · ${getArticleDate(selectedArticle.createdAt)}`}
                {` · By ${selectedArticle.name || "Astrology Expert"}`}
              </p>
              <h2 id="article-modal-title">{selectedArticle.title || (isNews ? "News Release" : "Astrology Article")}</h2>
              <p>{selectedArticle.description || (isNews ? "No additional news details are available." : "No additional article details are available.")}</p>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default LatestArticles;
