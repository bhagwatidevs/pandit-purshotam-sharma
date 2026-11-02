import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";
import { API_ENDPOINTS } from "../config/api";
import "../css/cart.css";

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null") || {};
  } catch {
    return {};
  }
};

const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CartPage = () => {
  const navigate = useNavigate();
  const savedUser = getSavedUser();

  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: savedUser.name || "",
    email: savedUser.email || "",
    phone: savedUser.mobile || "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const loadCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.CART);
      setItems(Array.isArray(response.data?.items) ? response.data.items : []);
      setTotalPrice(Number(response.data?.totalPrice || 0));
      setMessage("");
      setMessageIsError(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { state: { from: "/cart" } });
        return;
      }
      setMessage(getErrorMessage(error, "Could not load your cart."));
      setMessageIsError(true);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const removeItem = async (productId) => {
    if (!productId) return;
    try {
      setBusyId(productId);
      const response = await api.delete(`${API_ENDPOINTS.CART}/remove/${productId}`);
      setItems(Array.isArray(response.data?.items) ? response.data.items : []);
      setTotalPrice(Number(response.data?.totalPrice || 0));
      setMessage("");
    } catch (error) {
      setMessage(getErrorMessage(error, "Could not remove this item."));
      setMessageIsError(true);
    } finally {
      setBusyId("");
    }
  };

  const clearCart = async () => {
    try {
      setBusyId("all");
      const response = await api.delete(`${API_ENDPOINTS.CART}/clear`);
      setItems(response.data?.items || []);
      setTotalPrice(0);
      setMessage("Cart cleared.");
      setMessageIsError(false);
    } catch (error) {
      setMessage(getErrorMessage(error, "Could not clear your cart."));
      setMessageIsError(true);
    } finally {
      setBusyId("");
    }
  };

  const updateAddress = (event) => {
    setShippingAddress((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const getOrderData = () => ({
    items: items.map((item) => ({
      productId: item.productId?._id || item.productId || item._id,
      quantity: Number(item.quantity || 1),
    })),
    shippingAddress: {
      fullName: shippingAddress.fullName.trim(),
      email: shippingAddress.email.trim(),
      phone: shippingAddress.phone.trim(),
      address: shippingAddress.address.trim(),
      city: shippingAddress.city.trim(),
      state: shippingAddress.state.trim(),
      postalCode: shippingAddress.postalCode.trim(),
    },
  });

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (items.length === 0 || totalPrice <= 0) return;

    setCheckingOut(true);
    setMessage("");
    setMessageIsError(false);

    const orderData = getOrderData();

    try {
      const createResponse = await api.post(`${API_ENDPOINTS.PAYMENT}/create-order`, {
        amount: totalPrice,
        items: orderData.items,
        currency: "INR",
        receipt: `cart_${Date.now().toString().slice(-8)}`,
      });

      const paymentOrder = createResponse.data;

      // Development-only mode: records a test order but never takes money.
      if (paymentOrder.testMode) {
        const verifyResponse = await api.post(`${API_ENDPOINTS.PAYMENT}/verify-payment`, {
          razorpay_order_id: paymentOrder.order_id,
          razorpay_payment_id: `test_pay_${Date.now()}`,
          razorpay_signature: "test_signature",
          orderData,
        });

        await api.delete(`${API_ENDPOINTS.CART}/clear`).catch(() => {});
        setItems([]);
        setTotalPrice(0);
        setMessage(
          verifyResponse.data?.msg ||
            "Development test order saved. No real payment was processed."
        );
        setMessageIsError(false);
        setCheckingOut(false);
        return;
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout. Check your internet connection and try again.");
      }

      const checkout = new window.Razorpay({
        key: paymentOrder.key_id,
        amount: paymentOrder.order_amount,
        currency: paymentOrder.currency || "INR",
        name: "Pandit Purshotam Gaur",
        description: "Astrology products",
        order_id: paymentOrder.order_id,
        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        notes: {
          customer: shippingAddress.fullName,
        },
        theme: { color: "#a91e22" },
        handler: async (paymentResponse) => {
          setCheckingOut(true);

          try {
            const verifyResponse = await api.post(
              `${API_ENDPOINTS.PAYMENT}/verify-payment`,
              {
                ...paymentResponse,
                orderData,
              }
            );

            await api.delete(`${API_ENDPOINTS.CART}/clear`).catch(() => {});
            setItems([]);
            setTotalPrice(0);
            setMessage(
              verifyResponse.data?.msg ||
                "Payment verified and order placed successfully."
            );
            setMessageIsError(false);
          } catch (error) {
            setMessage(getErrorMessage(error, "Payment verification failed. Please contact support before trying again."));
            setMessageIsError(true);
          } finally {
            setCheckingOut(false);
          }
        },
        modal: {
          ondismiss: () => {
            setCheckingOut(false);
            setMessage("Payment window closed. No order was placed.");
            setMessageIsError(false);
          },
        },
      });

      checkout.open();
    } catch (error) {
      setMessage(getErrorMessage(error, "Unable to start checkout."));
      setMessageIsError(true);
      setCheckingOut(false);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-page-header">
        <div>
          <p className="form-eyebrow">Your selection</p>
          <h1>Shopping Cart</h1>
        </div>
        <Link to="/product" className="cart-secondary-button">Continue shopping</Link>
      </div>

      {message && (
        <p className={`form-feedback ${messageIsError ? "is-error" : "is-success"}`} role="status">
          {message}
        </p>
      )}

      {loading ? (
        <p className="cart-empty-state">Loading your cart…</p>
      ) : items.length === 0 ? (
        <div className="cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a product to see it here.</p>
          <Link to="/product" className="cart-primary-button">Browse products</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-item-list">
            {items.map((item, index) => {
              const product = item.productId || {};
              const id = product._id || item.productId?._id || item.productId || item._id || index;
              const name = product.name || item.name || "Astrology product";
              const image = product.imageUrl || product.image || "";

              return (
                <article className="cart-item" key={String(id)}>
                  {image ? (
                    <img src={image} alt={name} className="cart-item-image" />
                  ) : (
                    <div className="cart-item-image cart-item-image--empty">Product</div>
                  )}

                  <div className="cart-item-info">
                    <h2>{name}</h2>
                    <p>Quantity: {item.quantity || 1}</p>
                    <strong>
                      ₹{Number(item.price ?? product.price ?? 0) * Number(item.quantity || 1)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => removeItem(product._id || item.productId?._id || item.productId)}
                    disabled={busyId === (product._id || item.productId?._id || item.productId)}
                  >
                    {busyId === (product._id || item.productId?._id || item.productId) ? "Removing…" : "Remove"}
                  </button>
                </article>
              );
            })}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Calculated separately</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </div>

            <form className="cart-checkout-form" onSubmit={handleCheckout}>
              <h3>Shipping details</h3>

              {[
                ["fullName", "Full name", "text", "name"],
                ["email", "Email address", "email", "email"],
                ["phone", "Phone number", "tel", "tel"],
                ["address", "Full address", "text", "street-address"],
                ["city", "City", "text", "address-level2"],
                ["state", "State", "text", "address-level1"],
                ["postalCode", "PIN code", "text", "postal-code"],
              ].map(([name, label, type, autoComplete]) => (
                <label key={name}>
                  {label}
                  <input
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    value={shippingAddress[name]}
                    onChange={updateAddress}
                    required
                    minLength={name === "postalCode" ? 5 : undefined}
                  />
                </label>
              ))}

              <button
                type="submit"
                className="cart-primary-button cart-checkout-button"
                disabled={checkingOut}
              >
                {checkingOut ? "Processing…" : `Pay ₹${totalPrice.toLocaleString("en-IN")}`}
              </button>

              <p className="cart-checkout-note">
                Real payments require your Razorpay keys configured on the backend.
                Local development without keys uses a clearly marked test order and does not charge money.
              </p>
            </form>

            <button
              type="button"
              className="cart-secondary-button cart-clear-button"
              onClick={clearCart}
              disabled={busyId === "all" || checkingOut}
            >
              {busyId === "all" ? "Clearing…" : "Clear cart"}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
