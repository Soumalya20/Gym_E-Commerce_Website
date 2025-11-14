const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    ratings: [ratingSchema],
    brand: {
      type: String,
      default: 'Koushiks Supplements',
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.recalculateRatings = function recalculateRatings() {
  if (this.ratings.length === 0) {
    this.avgRating = 0;
    this.numReviews = 0;
    return;
  }

  const total = this.ratings.reduce((acc, item) => acc + item.rating, 0);
  this.numReviews = this.ratings.length;
  this.avgRating = total / this.ratings.length;
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
