const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
require("dotenv").config();

let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } catch (error) {
    console.error("Razorpay initialization failed:", error.message);
  }
}

const getAuthenticatedUserId = (req) => req.user?._id || req.user?.id;

const buildOrderItemsFromDatabase = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("At least one order item is required.");
  }

  const normalizedItems = [];

  for (const item of items) {
    const productId = item?.productId?._id || item?.productId || item?._id;
    const quantity = Number(item?.quantity || 1);

    if (!productId || !mongoose.Types.ObjectId.isValid(String(productId))) {
      throw new Error("An order contains an invalid product.");
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
      throw new Error("Product quantity must be between 1 and 100.");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("One of the products in this order no longer exists.");
    }

    normalizedItems.push({
      productId: product._id,
      name: product.name,
      price: Number(product.price),
      quantity,
    });
  }

  const totalPrice = normalizedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { items: normalizedItems, totalPrice: Number(totalPrice.toFixed(2)) };
};

const signatureIsValid = (orderId, paymentId, signature) => {
  if (!orderId || !paymentId || !signature || !process.env.RAZORPAY_KEY_SECRET) {
    return false;
  }

  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected);
  const suppliedBuffer = Buffer.from(String(signature));

  return expectedBuffer.length === suppliedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, suppliedBuffer);
};

const validateShippingAddress = (address) => {
  if (!address || typeof address !== "object") return false;
  return ["fullName", "email", "phone", "address", "city", "state", "postalCode"]
    .every((key) => String(address[key] || "").trim().length > 0);
};

// Create a Razorpay order. The client should submit the amount calculated from
// its cart, but verifyPayment independently recalculates item prices from MongoDB.
exports.createPaymentOrder = async (req, res) => {
  try {
    const amount = Number(req.body?.amount);
    const currency = req.body?.currency || "INR";
    const receipt = req.body?.receipt;
    const notes = req.body?.notes || {};

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ msg: "Invalid amount." });
    }

    if (!razorpay || !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      if (process.env.NODE_ENV === "production") {
        return res.status(503).json({ msg: "Payment gateway is not configured." });
      }

      return res.status(200).json({
        success: true,
        key_id: "rzp_test_demo",
        order_id: `test_order_${Date.now()}`,
        order_amount: Math.round(amount * 100),
        currency: "INR",
        testMode: true,
      });
    }

    if (currency !== "INR") {
      return res.status(400).json({ msg: "Only INR payments are supported." });
    }

    const userId = getAuthenticatedUserId(req);
    if (!userId) {
      return res.status(401).json({ msg: "Please sign in before checkout." });
    }

    // For live payments, derive the charge from MongoDB product prices rather
    // than trusting the amount sent by the browser.
    const { totalPrice: serverTotal } = await buildOrderItemsFromDatabase(req.body?.items);
    if (Math.round(amount * 100) !== Math.round(serverTotal * 100)) {
      return res.status(409).json({
        msg: "Your cart total changed. Refresh the cart and try again.",
        expectedAmount: serverTotal,
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(serverTotal * 100),
      currency,
      receipt: receipt || `p_${Date.now().toString().slice(-8)}`,
      notes: {
        ...notes,
        purpose: "product_order",
        userId: String(userId),
      },
    });

    return res.status(200).json({
      success: true,
      key_id: process.env.RAZORPAY_KEY_ID,
      order_id: order.id,
      order_amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Create payment order error:", error.message);
    return res.status(500).json({ msg: "Failed to create payment order." });
  }
};

// Verify payment and, when orderData is provided, create the order from
// server-side product prices and the authenticated user's ID.
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body || {};

    const userId = getAuthenticatedUserId(req);

    // Development-only mock support. It is deliberately unavailable in production.
    if (
      process.env.NODE_ENV !== "production" &&
      (razorpay_order_id?.startsWith("test_order_") ||
        razorpay_signature === "test_signature")
    ) {
      if (!orderData) {
        return res.status(200).json({
          success: true,
          testMode: true,
          msg: "Development test payment accepted. No real payment was processed.",
        });
      }

      if (!userId) {
        return res.status(401).json({ msg: "Please sign in before placing an order." });
      }

      const { items, totalPrice } = await buildOrderItemsFromDatabase(orderData.items);
      if (!validateShippingAddress(orderData.shippingAddress)) {
        return res.status(400).json({ msg: "A complete shipping address is required." });
      }

      const mockOrder = await Order.create({
        userId,
        items,
        shippingAddress: orderData.shippingAddress,
        totalPrice,
        paymentStatus: "Test",
        paymentId: razorpay_payment_id || `test_pay_${Date.now()}`,
        orderId: razorpay_order_id || `test_order_${Date.now()}`,
      });

      return res.status(200).json({
        success: true,
        testMode: true,
        orderId: mockOrder._id,
        msg: "Development test order saved. No real payment was processed.",
      });
    }

    if (!razorpay || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ msg: "Payment gateway is not configured." });
    }

    if (!signatureIsValid(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return res.status(400).json({ msg: "Invalid payment signature." });
    }

    // When no orderData is supplied, this is a verification-only request.
    if (!orderData) {
      const [gatewayOrder, payment] = await Promise.all([
        razorpay.orders.fetch(razorpay_order_id),
        razorpay.payments.fetch(razorpay_payment_id),
      ]);
      if (
        String(gatewayOrder.notes?.userId || "") !== String(userId || "") ||
        gatewayOrder.notes?.purpose !== "product_order" ||
        payment.order_id !== razorpay_order_id ||
        payment.status !== "captured"
      ) {
        return res.status(400).json({ msg: "Payment has not been captured for this order." });
      }
      return res.status(200).json({ success: true, msg: "Payment verified successfully." });
    }

    if (!userId) {
      return res.status(401).json({ msg: "Please sign in before placing an order." });
    }

    const { items, totalPrice } = await buildOrderItemsFromDatabase(orderData.items);
    if (!validateShippingAddress(orderData.shippingAddress)) {
      return res.status(400).json({ msg: "A complete shipping address is required." });
    }

    // Confirm the signed payment belongs to a Razorpay order for exactly the
    // current server-calculated total. Client-supplied prices/userId are ignored.
    const [gatewayOrder, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id),
    ]);

    if (
      gatewayOrder.currency !== "INR" ||
      gatewayOrder.notes?.purpose !== "product_order" ||
      String(gatewayOrder.notes?.userId || "") !== String(userId) ||
      Number(gatewayOrder.amount) !== Math.round(totalPrice * 100) ||
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured" ||
      Number(payment.amount) !== Math.round(totalPrice * 100)
    ) {
      return res.status(400).json({
        msg: "Payment details do not match the current product prices or the payment is not captured.",
      });
    }

    const order = await Order.create({
      userId,
      items,
      shippingAddress: orderData.shippingAddress,
      totalPrice,
      paymentStatus: "Completed",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    return res.status(201).json({
      success: true,
      orderId: order._id,
      msg: "Payment verified and order placed.",
    });
  } catch (error) {
    console.error("Payment verification error:", error.message || error);
    const clientError = /required|invalid|no longer exists|quantity/i.test(error.message || "");
    return res.status(clientError ? 400 : 500).json({
      msg: clientError ? error.message : "Payment verification failed.",
    });
  }
};

// Create a Razorpay order for Kundli generation. Real credentials are required
// in production; mock orders are development-only.
exports.createKundliOrder = async (req, res) => {
  try {
    const amount = Number(req.body?.amount);
    const kundliData = req.body?.kundliData;
    const userId = getAuthenticatedUserId(req);

    if (!Number.isFinite(amount) || amount <= 0 || !kundliData || !userId) {
      return res.status(400).json({ msg: "Invalid Kundli payment data." });
    }

    if (process.env.NODE_ENV === "production") {
      const configuredKundliPrice = Number(process.env.KUNDLI_PRICE_INR);
      if (!Number.isFinite(configuredKundliPrice) || configuredKundliPrice <= 0) {
        return res.status(503).json({ msg: "Kundli service price is not configured." });
      }
      if (Math.round(amount * 100) !== Math.round(configuredKundliPrice * 100)) {
        return res.status(400).json({ msg: "Invalid Kundli service amount." });
      }
    }

    if (!razorpay || !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      if (process.env.NODE_ENV === "production") {
        return res.status(503).json({ success: false, msg: "Payment gateway is not configured." });
      }

      const mockOrder = {
        id: `order_test_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `kundli_${String(userId).slice(-8)}_${Date.now()}`,
        status: "created",
      };

      return res.status(200).json({
        success: true,
        order: mockOrder,
        razorpayKey: "rzp_test_demo",
        testMode: true,
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `k_${Date.now().toString().slice(-8)}`,
      notes: {
        service: "kundli_generation",
        userId: String(userId),
        name: String(kundliData.name || ""),
      },
    });

    return res.status(200).json({
      success: true,
      order,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Kundli payment error:", error.message || error);
    return res.status(500).json({ msg: "Failed to create Kundli payment order." });
  }
};

// Verify Kundli payment. In production the Razorpay order must be for Kundli
// and belong to the signed-in account, and the payment must be captured.
exports.verifyKundliPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({ success: false, msg: "Please sign in first." });
    }

    if (process.env.NODE_ENV !== "production" && razorpay_order_id?.startsWith("order_test_")) {
      return res.status(200).json({
        success: true,
        testMode: true,
        paymentId: razorpay_payment_id || `pay_test_${Date.now()}`,
        msg: "Development test mode only. No real payment was processed.",
      });
    }

    if (!razorpay || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ success: false, msg: "Payment gateway is not configured." });
    }

    if (!signatureIsValid(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
      return res.status(400).json({ success: false, msg: "Invalid payment signature." });
    }

    const [gatewayOrder, payment] = await Promise.all([
      razorpay.orders.fetch(razorpay_order_id),
      razorpay.payments.fetch(razorpay_payment_id),
    ]);

    if (
      gatewayOrder.notes?.service !== "kundli_generation" ||
      String(gatewayOrder.notes?.userId || "") !== String(userId) ||
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured" ||
      Number(payment.amount) !== Number(gatewayOrder.amount) ||
      (process.env.NODE_ENV === "production" &&
        Number(gatewayOrder.amount) !== Math.round(Number(process.env.KUNDLI_PRICE_INR) * 100))
    ) {
      return res.status(400).json({
        success: false,
        msg: "Payment is not captured or does not match this Kundli order.",
      });
    }

    return res.status(200).json({
      success: true,
      paymentId: razorpay_payment_id,
      msg: "Payment verified successfully.",
    });
  } catch (error) {
    console.error("Kundli payment verification error:", error.message || error);
    return res.status(500).json({ success: false, msg: "Payment verification failed." });
  }
};
