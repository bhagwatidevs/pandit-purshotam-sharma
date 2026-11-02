import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const KundliPayment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const kundliData = location.state?.kundliData;

  const KUNDLI_PRICE = 1100; // Price in rupees

  if (!kundliData) {
    navigate('/kundli');
    return null;
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to make payment');
        navigate('/login');
        return;
      }

      // Create Razorpay order
      const orderResponse = await axios.post(
        'https://astrology-backend-1.onrender.com/api/payment/create-kundli-order',
        {
          amount: KUNDLI_PRICE,
          kundliData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { order, razorpayKey, testMode } = orderResponse.data;

      // Handle test mode or missing key
      if (testMode || !razorpayKey || razorpayKey === 'rzp_test_demo') {
        // Simulate payment for test mode
        alert('Test Mode: Payment simulation successful!');
        navigate('/kundli-generate', { 
          state: { 
            kundliData, 
            paymentId: `test_pay_${Date.now()}` 
          } 
        });
        return;
      }

      // Razorpay payment options
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Astrology Services',
        description: 'Kundli Generation Service',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on server
            const verifyResponse = await axios.post(
              'https://astrology-backend-1.onrender.com/api/payment/verify-kundli-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                kundliData
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            if (verifyResponse.data.success) {
              // Payment verified, redirect to kundli generation
              navigate('/kundli-generate', { 
                state: { 
                  kundliData, 
                  paymentId: response.razorpay_payment_id 
                } 
              });
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: kundliData.name,
          email: '',
          contact: ''
        },
        theme: {
          color: '#F59E0B'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed: ' + (error.response?.data?.msg || error.message));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white py-10 px-6 pt-24">
      <div className="max-w-md mx-auto">
        <div className="bg-[#121212]/80 p-6 rounded-lg border border-yellow-600/30">
          <h1 className="text-2xl font-bold text-center mb-6 text-yellow-400">
            Complete Payment
          </h1>
          
          <div className="space-y-4 mb-6">
            <div className="bg-gray-800/50 p-4 rounded">
              <h3 className="text-yellow-300 font-semibold mb-2">Service Details</h3>
              <p className="text-gray-300">Kundli Generation</p>
              <p className="text-gray-400 text-sm">For: {kundliData.name}</p>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Service Fee:</span>
                <span className="text-yellow-400 font-bold">₹{KUNDLI_PRICE}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-600">
                <span className="text-white font-semibold">Total Amount:</span>
                <span className="text-yellow-400 font-bold text-lg">₹{KUNDLI_PRICE}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-3 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-600 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>
          
          <p className="text-center text-sm text-gray-400 mt-2">
            Secure payment processing via server
          </p>
          
          <button
            onClick={() => navigate('/kundli')}
            className="w-full mt-3 py-2 rounded border border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default KundliPayment;