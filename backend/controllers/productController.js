const mongoose = require('mongoose');
const Product = require('../models/Product');

const buildProductQuery = (query) => {
  const mongoQuery = {};

  if (query.keyword) {
    mongoQuery.$or = [
      { name: { $regex: query.keyword, $options: 'i' } },
      { description: { $regex: query.keyword, $options: 'i' } },
    ];
  }

  if (query.category) {
    mongoQuery.category = query.category;
  }

  if (query.minPrice || query.maxPrice) {
    mongoQuery.price = {};
    if (query.minPrice) {
      mongoQuery.price.$gte = Number(query.minPrice);
    }
    if (query.maxPrice) {
      mongoQuery.price.$lte = Number(query.maxPrice);
    }
  }

  return mongoQuery;
};

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = buildProductQuery(req.query);
    const sortField = req.query.sortBy === 'price' ? 'price' : req.query.sortBy === 'rating' ? '-avgRating' : '-createdAt';

    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(limit).sort(sortField),
      Product.countDocuments(filter),
    ]);

    const categories = await Product.distinct('category', filter);

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
      categories: categories.filter(Boolean).sort(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

const createProduct = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      images: Array.isArray(req.body.images) ? req.body.images : [],
      createdBy: req.user?._id,
    };

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product', error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update product', error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

const reviewProduct = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!rating) {
      return res.status(400).json({ message: 'Rating is required' });
    }

    const existingReview = product.ratings.find(
      (review) => review.userId.toString() === req.user._id.toString()
    );

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      product.ratings.push({
        userId: req.user._id,
        rating,
        comment,
      });
    }

    product.recalculateRatings();
    await product.save();

    res.status(existingReview ? 200 : 201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Unable to submit review' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
};
