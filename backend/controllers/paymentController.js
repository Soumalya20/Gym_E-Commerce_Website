const crypto = require('crypto');
const getRazorpayInstance = require('../utils/razorpay');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'A valid amount is required' });
    }

    const razorpay = getRazorpayInstance();

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderItems,
      shippingAddress,
      taxPrice = 0,
      shippingPrice = 0,
      totalPrice,
    } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'Payment verification data missing' });
    }

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    if (!totalPrice || Number(totalPrice) <= 0) {
      return res.status(400).json({ message: 'Total price is required' });
    }

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    const orderItemsPayload = [];
    const productsToUpdate = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: 'One or more products were not found' });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({ message: `${product.name} is out of stock` });
      }

      productsToUpdate.push({ product, qty: item.qty });

      orderItemsPayload.push({
        name: product.name,
        qty: item.qty,
        price: product.price,
        product: product._id,
        image: product.images?.[0],
      });
    }

    const computedItemsPrice = orderItemsPayload.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    const computedTotal = Number((computedItemsPrice + Number(taxPrice) + Number(shippingPrice)).toFixed(2));
    const providedTotal = Number(Number(totalPrice).toFixed(2));

    if (Math.abs(computedTotal - providedTotal) > 1) {
      return res.status(400).json({ message: 'Total mismatch detected. Please refresh and try again.' });
    }

    await Promise.all(
      productsToUpdate.map(({ product, qty }) => {
        product.stock -= qty;
        return product.save();
      })
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems: orderItemsPayload,
      shippingAddress,
      paymentMethod: 'Razorpay',
      paymentResult: {
        id: razorpayPaymentId,
        status: 'paid',
        update_time: new Date().toISOString(),
        email_address: req.user.email,
      },
      itemsPrice: computedItemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice: computedTotal,
      isPaid: true,
      paidAt: new Date(),
    });

    res.json({ message: 'Payment verified successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
