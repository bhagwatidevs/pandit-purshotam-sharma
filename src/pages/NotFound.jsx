import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="not-found-page">
    <p className="not-found-code">404</p>
    <h1>Page not found</h1>
    <p>The page may have moved, or the URL may be incorrect.</p>
    <Link to="/" className="not-found-home">Return to Home</Link>
  </main>
);

export default NotFound;
