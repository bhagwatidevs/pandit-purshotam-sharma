import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Paymentway = () => {
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: user?.email || "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalAmount = getTotalAmount();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your cart is empty!");

    const orderData = {
      userId: user?.id || user?._id,
      items: cartItems.map((item) => ({
        productId: item.productId?._id || item._id,
        name: item.productId?.name || item.name,
        imageUrl: item.productId?.imageUrl || item.imageUrl,
        price: item.productId?.price || item.price,
        quantity: item.quantity,
      })),
      shippingAddress: {
        fullName: `${formData.fname} ${formData.lname}`,
        email: formData.email,
        phone: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.pincode,
      },
      totalPrice: totalAmount,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // ✅ Create Razorpay order
      const { data } = await axios.post(
        "https://astrology-backend-1.onrender.com/api/payment/create-order",
        { amount: totalAmount },
        config
      );

      // Handle test mode or missing keys
      if (!data.key_id || data.key_id === 'rzp_test_demo') {
        // Simulate payment for test mode
        try {
          await axios.post(
            "https://astrology-backend-1.onrender.com/api/payment/verify-payment",
            { 
              razorpay_order_id: `test_order_${Date.now()}`,
              razorpay_payment_id: `test_pay_${Date.now()}`,
              razorpay_signature: 'test_signature',
              orderData 
            },
            config
          );
          alert("✅ Test Payment successful! Order placed.");
          await clearCart();
          navigate('/orders');
        } catch (error) {
          console.error("Test payment failed:", error);
          alert("❌ Test payment failed!");
        }
        return;
      }

      const options = {
        key: data.key_id,
        amount: data.order_amount,
        currency: data.currency,
        name: "Astrology Services",
        description: "Product Order Payment",
        order_id: data.order_id,
        handler: async function (response) {
          try {
            await axios.post(
              "https://astrology-backend-1.onrender.com/api/payment/verify-payment",
              { ...response, orderData },
              config
            );
            alert("✅ Payment successful! Order placed.");
            await clearCart();
            navigate('/orders');
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            alert("❌ Payment verification failed!");
          }
        },
        prefill: {
          name: `${formData.fname} ${formData.lname}`,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: "#F59E0B" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row gap-6 p-4">
      {/* Billing Section */}
      <div className="bg-white p-6 rounded-lg mt-20 shadow-lg md:w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
        <form
          onSubmit={handleOrder}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            "fname",
            "lname",
            "email",
            "mobile",
            "address",
            "city",
            "state",
            "pincode",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.toUpperCase()}
              value={formData[field]}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          ))}
          <button
            type="submit"
            className="col-span-2 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700"
          >
            Pay ₹{totalAmount.toFixed(2)} Now
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-lg mt-20 shadow-lg md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.length > 0 ? (
          cartItems.map((item, i) => {
            const name = item.productId?.name || item.name;
            const price = item.productId?.price || item.price;
            const quantity = item.quantity;
            const image =
              item.productId?.imageUrl || item.imageUrl || "https://via.placeholder.com/80?text=No+Image";

            return (
              <div key={i} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 object-cover rounded-md"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/80")}
                  />
                  <p className="text-sm">{name}</p>
                </div>
                <p className="text-sm font-medium">
                  ₹{(price * quantity).toFixed(2)}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">Your cart is empty</p>
        )}

        <p className="mt-4 font-bold text-lg">Total: ₹{totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Paymentway;
