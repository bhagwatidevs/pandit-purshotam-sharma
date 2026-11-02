import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaLocationDot, FaArrowUp } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { IoIosSend, IoMdMail } from "react-icons/io";

import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";

import "../css/footer.css";


const officeAddress =
  "Shree Ram Bhawan 13,14, Arihent Vatika, Opp. Shyam Nagar, New Sanganer Road, Near Mahatma Jyoti Rao Phule Mahila College, Sodala-19, Jaipur, Rajasthan, India";

const googleMapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(officeAddress);

const googleMapEmbed =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent(officeAddress) +
  "&output=embed";

const Footer = () => {
  const [visible, setVisible] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const [recentPosts, setRecentPosts] = useState([
    {
      _id: "1",
      title: "Understanding Your Birth Chart",
      imageUrl: "",
    },
    {
      _id: "2",
      title: "Planetary Remedies for Success",
      imageUrl: "",
    },
  ]);

  // Show Back to Top button.
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch recent blog posts.
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.BLOG, {
          params: { type: "article" },
        });

        const data = response.data;
        const posts = Array.isArray(data)
          ? data
          : data?.blogs || data?.posts || data?.data || [];

        if (Array.isArray(posts) && posts.length > 0) {
          const articlePosts = posts.filter((post) => {
            const explicitType = String(
              post?.contentType || post?.type || ""
            ).toLowerCase();

            if (explicitType) return !/news|press/.test(explicitType);

            return !/(^|[\s_-])(news|press)([\s_-]|$)/i.test(
              String(post?.category || "")
            );
          });

          if (articlePosts.length > 0) {
            setRecentPosts(articlePosts.slice(0, 2));
          }
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);

  // Save newsletter subscription in the backend.
  const handleSubscribe = async (event) => {
    event.preventDefault();
    setSubscribeStatus("");

    if (!consent) {
      setSubscribeStatus("Please agree to the data collection notice.");
      return;
    }

    try {
      setSubscribing(true);
      await api.post(API_ENDPOINTS.SUBSCRIBERS, { email: subscribeEmail });
      setSubscribeStatus("Thank you! Your email has been subscribed.");
      setSubscribeEmail("");
      setConsent(false);
    } catch (error) {
      setSubscribeStatus(
        getErrorMessage(error, "Subscription could not be saved.")
      );
    } finally {
      setSubscribing(false);
    }
  };

  // Scroll to top.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Back to Top Button */}
      {visible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="back-to-top"
        >
          <FaArrowUp />
          <span>Top</span>
        </button>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-overlay"></div>

        <div className="footer-content">
          {/* Contact Information */}
          <section className="footer-contact">
            <Link to="/" className="footer-logo-link">
              <span className="footer-logo footer-logo-text">
                पंडित पुरुषोत्तम गौड़
                <br />
                ज्योतिष केंद्र
              </span>
            </Link>

            {/* Office address and clickable Google Map */}
            <div className="footer-location-section">
              <p className="footer-contact-item">
                <FaLocationDot className="footer-contact-icon" />
                <span>{officeAddress}</span>
              </p>

              <div className="footer-location-map">
                <a
                  href={googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-map-link"
                  aria-label="Open Pandit Purshotam Gaur office location in Google Maps"
                >
                  <iframe
                    title="Pandit Purshotam Gaur office location in Jaipur"
                    src={googleMapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <span className="footer-map-open-label">
                    Open in Google Maps ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Phone */}
            <p className="footer-contact-item">
              <IoCall className="footer-contact-icon" />
              <a href="tel:+919414237095">+91 9414237095</a>
            </p>

            {/* Email */}
            <p className="footer-contact-item">
              <IoMdMail className="footer-contact-icon" />
              <a href="mailto:ptpurshotam@gmail.com">
                ptpurshotam@gmail.com
              </a>
            </p>
          </section>

          {/* Quick Links */}
          <nav
            className="footer-quick-links"
            aria-label="Footer navigation"
          >
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/know-more">About Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/jap">Jap</Link></li>
              <li><Link to="/inquiry-form">Appointment</Link></li>
            </ul>
          </nav>

          {/* Recent Posts */}
          <section className="footer-recent-posts">
            <h2 className="footer-heading">Recent Posts</h2>

            {recentPosts.length > 0 ? (
              recentPosts.map((post, index) => {
                const image =
                  post.imageUrl || post.image || post.thumbnail || "";

                return (
                  <Link
                    key={post._id || post.id || index}
                    to="/blog"
                    className="footer-post"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={post.title || "Astrology blog"}
                        className="footer-post-image"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="footer-post-placeholder">Blog</div>
                    )}

                    <p className="footer-post-title">
                      {post.title || post.name || "Astrology Insights"}
                    </p>
                  </Link>
                );
              })
            ) : (
              <p className="footer-empty-message">
                No recent posts available.
              </p>
            )}
          </section>

          {/* Newsletter Subscription */}
          <section className="footer-subscribe">
            <h2 className="footer-heading">Subscribe</h2>

            <form
              className="footer-subscribe-form"
              onSubmit={handleSubscribe}
            >
              <div className="footer-subscribe-row">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  aria-label="Email address"
                  required
                  value={subscribeEmail}
                  onChange={(event) => setSubscribeEmail(event.target.value)}
                  className="footer-email"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  disabled={subscribing}
                  className="footer-submit"
                >
                  <IoIosSend />
                </button>
              </div>

              <div className="footer-consent">
                <input
                  type="checkbox"
                  id="footer-consent"
                  required
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <label htmlFor="footer-consent">
                  I agree that my submitted data is being collected and
                  stored.
                </label>
              </div>

              {subscribeStatus && (
                <p className="footer-subscribe-status" role="status">
                  {subscribeStatus}
                </p>
              )}
            </form>
          </section>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>Copyright © 2026 Astrology. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
