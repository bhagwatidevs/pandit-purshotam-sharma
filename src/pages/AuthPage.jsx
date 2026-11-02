import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import "../css/forms.css";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = location.pathname === "/register";
  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      if (isRegister) {
        await api.post(`${API_ENDPOINTS.AUTH}/register`, {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          mobile: form.mobile.trim(),
          password: form.password,
        });
        setMessage("Registration successful. Please sign in.");
        setTimeout(() => navigate("/login"), 700);
      } else {
        const response = await api.post(`${API_ENDPOINTS.AUTH}/login`, {
          email: form.email.trim().toLowerCase(),
          password: form.password,
        });

        if (!response.data?.token) {
          throw new Error(response.data?.msg || "Login failed.");
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user || {}));

        if (response.data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate(redirectTo);
        }
      }
    } catch (error) {
      setIsError(true);
      setMessage(getErrorMessage(error, "Unable to complete your request."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="form-page">
      <section className="form-card auth-card">
        <p className="form-eyebrow">Pandit Purshotam Gaur</p>
        <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="form-description">
          {isRegister
            ? "Register to access your account and save your cart."
            : "Sign in to continue to your account."}
        </p>

        <form onSubmit={handleSubmit} className="stacked-form">
          {isRegister && (
            <>
              <label>
                Full name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  required
                  minLength={2}
                />
              </label>

              <label>
                Mobile number
                <input
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  value={form.mobile}
                  onChange={updateField}
                  required
                  pattern="[0-9+\-\s]{8,16}"
                />
              </label>
            </>
          )}

          <label>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={form.password}
              onChange={updateField}
              required
              minLength={isRegister ? 8 : 1}
            />
            {isRegister && <small>Use at least 8 characters.</small>}
          </label>

          <button type="submit" className="primary-form-button" disabled={loading}>
            {loading
              ? "Please wait…"
              : isRegister
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        {message && (
          <p className={`form-feedback ${isError ? "is-error" : "is-success"}`} role="status">
            {message}
          </p>
        )}

        <p className="auth-switch">
          {isRegister ? "Already have an account?" : "New here?"}{" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
};

export default AuthPage;
