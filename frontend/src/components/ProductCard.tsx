import type { FC } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export interface ProductSummary {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  avgRating?: number;
  numReviews?: number;
  brand?: string;
  category?: string;
}

const ProductCard: FC<{ product: ProductSummary }> = ({ product }) => {
  const image = product.images?.[0] || 'https://via.placeholder.com/400x400?text=Koushiks+Supplements';

  return (
    <Link
      to={`/products/${product._id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 border border-gray-100 hover:border-accent/50"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-10 z-10"></div>
        <img
          src={image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 rounded-full bg-gradient-primary px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white shadow-lg backdrop-blur-sm border border-accent/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-accent/50">
          {product.brand || 'Koushiks'}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 sm:gap-3 p-4 sm:p-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-primary line-clamp-2 transition-colors duration-300 group-hover:text-accent">{product.name}</h3>
          {product.category && <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent/70 font-semibold">{product.category}</p>}
        </div>
        <Rating value={product.avgRating ?? 0} reviews={product.numReviews} size="sm" />
        <div className="flex items-center justify-between mt-1">
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">₹{product.price.toLocaleString('en-IN')}</p>
          <span className="text-[10px] sm:text-xs font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden sm:inline">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
