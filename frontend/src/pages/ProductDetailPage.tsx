import { useEffect, useMemo, useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import Rating from '../components/Rating';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductReview {
  _id?: string;
  userId: string | { _id: string };
  rating: number;
  comment?: string;
  createdAt?: string;
}

interface ProductDetail {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images?: string[];
  ratings: ProductReview[];
  avgRating?: number;
  numReviews?: number;
  brand?: string;
  category?: string;
}

const ProductDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<{ rating: number; comment: string }>({ rating: 0, comment: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const { data } = await apiClient.get<ProductDetail>(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.images?.[0] || 'https://via.placeholder.com/600x600?text=Koushiks+Supplements');
        setQuantity(data.stock > 0 ? 1 : 0);
      } catch (err) {
        setError('Unable to load this product at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    if (!product || product.stock === 0) {
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      qty: quantity,
      image: product.images?.[0],
      stock: product.stock,
    });
    setSubmitMessage('Added to cart!');
    setTimeout(() => setSubmitMessage(null), 2000);
  };

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!product || !id) return;
    if (!reviewForm.rating) {
      setSubmitMessage('Please select a rating before submitting.');
      return;
    }

    try {
      const { data } = await apiClient.post<ProductDetail>(`/products/${id}/reviews`, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      setProduct(data);
      setReviewForm({ rating: 0, comment: '' });
      setSubmitMessage('Review submitted successfully!');
      setTimeout(() => setSubmitMessage(null), 2000);
    } catch (err) {
      setSubmitMessage('Unable to submit review. Please try again later.');
    }
  };

  const canReview = useMemo(() => !!user, [user]);
  const alreadyReviewed = useMemo(() => {
    if (!user || !product) return false;
    return product.ratings.some((review) => {
      const reviewerId = typeof review.userId === 'string' ? review.userId : review.userId?._id;
      return reviewerId === user.id;
    });
  }, [user, product]);

  const averageRating = product?.avgRating ?? 0;
  const reviewCount = product?.numReviews ?? product?.ratings.length ?? 0;
  const images = product?.images && product.images.length > 0 ? product.images : [selectedImage];
  const metaTitle = product ? `${product.name} | Koushiks Supplements` : 'Product Details | Koushiks Supplements';
  const metaDescription = product
    ? `${product.name} by ${product.brand ?? 'Koushiks Supplements'} - ₹${product.price.toLocaleString(
        'en-IN'
      )}. ${product.description.slice(0, 140)}...`
    : 'Discover premium sports nutrition products at Koushiks Supplements.';

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Helmet>
          <title>Loading Product | Koushiks Supplements</title>
        </Helmet>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="aspect-square animate-pulse rounded-3xl bg-gray-100" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="aspect-square animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <div className="space-y-3">
              <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="space-y-4">
              <div className="h-10 w-full animate-pulse rounded-full bg-gray-200" />
              <div className="h-12 w-full animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
        <Helmet>
          <title>Product Not Found | Koushiks Supplements</title>
        </Helmet>
        {error ?? 'Product not found.'}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 lg:py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 sm:space-y-6">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100">
            <img
              src={selectedImage || images[0]}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {images.map((image) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-lg sm:rounded-xl border-2 transition-all ${
                  selectedImage === image ? 'border-accent shadow-lg' : 'border-transparent hover:border-accent/50'
                }`}
              >
                <img src={image} alt={product.name} className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6 rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 lg:p-8 shadow-sm">
          <div className="space-y-2">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gray-400">{product.brand ?? 'Koushiks Supplements'}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">{product.name}</h1>
            <Rating value={averageRating} reviews={reviewCount} />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-gray-600 whitespace-pre-line">{product.description}</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-0 rounded-xl sm:rounded-2xl bg-gray-50 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Price</p>
              <p className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Stock</p>
              <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </p>
            </div>
          </div>

          {product.stock > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="text-sm font-medium text-gray-700" htmlFor="quantity">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full sm:w-24 rounded-full border border-gray-200 px-4 py-2 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {Array.from({ length: Math.min(product.stock, 8) }, (_, index) => index + 1).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-3">
            {submitMessage && <p className="text-sm text-accent">{submitMessage}</p>}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="group relative w-full overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="relative z-10">{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </div>
        </div>
      </div>

      <section className="mt-12 space-y-6 rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-primary">Customer Reviews</h2>
            <p className="text-sm text-gray-500">Share your experience with this product.</p>
          </div>
          {canReview && !alreadyReviewed && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-white"
            >
              Write a Review
            </button>
          )}
        </div>

        <div className="space-y-4">
          {product.ratings.length === 0 && (
            <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          )}

          {product.ratings.map((review) => (
            <div key={review._id ?? `${typeof review.userId === 'string' ? review.userId : review.userId?._id}-${review.createdAt}`} className="rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <Rating value={review.rating} size="sm" />
                {review.createdAt && (
                  <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                )}
              </div>
              {review.comment && <p className="mt-3 text-sm text-gray-600">{review.comment}</p>}
            </div>
          ))}
        </div>

        {canReview && !alreadyReviewed && (
          <form className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6" onSubmit={handleReviewSubmit}>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Your Rating
              </label>
              <select
                id="rating"
                value={reviewForm.rating}
                onChange={(event) => setReviewForm((prev) => ({ ...prev, rating: Number(event.target.value) }))}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                required
              >
                <option value={0}>Select...</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option value={val} key={val}>
                    {val} Star{val > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                Comment
              </label>
              <textarea
                id="comment"
                value={reviewForm.comment}
                onChange={(event) => setReviewForm((prev) => ({ ...prev, comment: event.target.value }))}
                rows={4}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Share details of your experience"
              />
            </div>
            <button
              type="submit"
              className="group relative overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
            >
              <span className="relative z-10">Submit Review</span>
              <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </form>
        )}

        {!canReview && (
          <p className="text-sm text-gray-500">Please sign in to leave a review.</p>
        )}
        {alreadyReviewed && (
          <p className="text-sm text-green-600">Thank you! You have already reviewed this product.</p>
        )}
      </section>
    </div>
  );
};

export default ProductDetailPage;
