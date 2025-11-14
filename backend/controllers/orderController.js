const mongoose = require('mongoose');
const Order = require('../models/Order');

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load your orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Unable to load order details' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Unable to load orders' });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = new Date();

    await order.save();

    res.json(order);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(500).json({ message: 'Unable to update order' });
  }
};

module.exports = {
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
};
