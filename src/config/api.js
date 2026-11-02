// API base URL configuration.
// Development defaults directly to the Express API so a stale/missing Vite
// proxy cannot turn requests into frontend 404s on port 5173/5175.
// Production: set VITE_API_URL to the deployed backend origin, e.g. https://api.example.com.
const configuredBaseUrl = (import.meta.env.VITE_API_URL || "").trim();

const defaultDevelopmentBackend = import.meta.env.DEV
  ? "http://localhost:5000"
  : "";

export const API_BASE_URL = (configuredBaseUrl || defaultDevelopmentBackend)
  .trim()
  .replace(/\/+$/, "");

export const API_ENDPOINTS = {
  HEALTH: "/api/health",
  ROUTES: "/api/routes",
  AUTH: "/api/auth",
  BLOG: "/api/blog",
  PRESS_RELEASE: "/api/press-release",
  NEWS_SLIDES: "/api/news-slides",
  PRODUCT: "/api/product",
  PHOTO: "/api/photo",
  CONTACT: "/api/contact",
  SUBSCRIBERS: "/api/subscribers",
  CART: "/api/cart",
  ORDERS: "/api/orders",
  PAYMENT: "/api/payment",
  KUNDLI: "/api/kundli",
  ADMIN: "/api/admin",
};

export default API_BASE_URL;
