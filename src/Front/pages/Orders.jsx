import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://astrology-backend-1.onrender.com/api/orders', {
        headers: getAuthHeaders(),
      });
      setOrders(data.orders);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to cancel order');
      return;
    }
    
    try {
      console.log('Cancelling order:', orderId);
      const response = await axios.patch(
        `https://astrology-backend-1.onrender.com/api/orders/${orderId}/cancel`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Cancel response:', response.data);
      
      // Update the order in the list
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, paymentStatus: 'Cancelled' } : order
      ));
      
      alert('Order cancelled successfully');
    } catch (err) {
      console.error('Error cancelling order:', err);
      console.error('Error response:', err.response);
      
      if (err.response?.status === 401) {
        alert('Please login to cancel order');
      } else if (err.response?.status === 404) {
        alert('Order not found');
      } else {
        alert(err.response?.data?.message || 'Error cancelling order');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchOrders();
    } else {
      setError('Please login to view orders');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] flex items-center justify-center text-white text-xl pt-20">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] flex items-center justify-center text-white text-center pt-20">
        <div>
          <h2 className="text-2xl mb-4">Unable to load orders</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b22] to-[#1a0d24] text-white py-10 px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-10 text-yellow-400"
        >
          Your Orders
        </motion.h2>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-2xl text-gray-400 mb-4">No orders found</h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121212]/80 border border-yellow-600/30 rounded-lg p-6 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-300">
                      Order #{order._id.slice(-8)}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">
                      ₹{order.totalPrice}
                    </p>
                    <span className={`inline-block px-3 py-1 text-white text-xs rounded-full ${
                      order.paymentStatus === 'Completed' ? 'bg-green-600' :
                      order.paymentStatus === 'Pending' ? 'bg-yellow-600' :
                      order.paymentStatus === 'Cancelled' ? 'bg-red-600' : 'bg-blue-600'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-lg font-medium mb-3 text-yellow-200">Items:</h4>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <img
                          src={item.productId?.imageUrl || 'https://via.placeholder.com/60'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md border border-gray-600"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-white">{item.name}</p>
                          <p className="text-gray-400 text-sm">
                            Qty: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <p className="font-semibold text-yellow-300">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {order.shippingAddress && (
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <h4 className="text-lg font-medium mb-2 text-yellow-200">Shipping Address:</h4>
                    <p className="text-gray-300 text-sm">
                      {order.shippingAddress.fullName}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}<br />
                      📞 {order.shippingAddress.phone}
                    </p>
                  </div>
                )}
                
                {/* Cancel Order Button */}
                {(order.paymentStatus === 'Pending' || order.paymentStatus === 'Completed') && (
                  <div className="border-t border-gray-700 pt-4 mt-4 flex justify-end">
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;