import type { FC } from 'react';

interface RatingProps {
  value: number;
  reviews?: number;
  size?: 'sm' | 'md';
}

const Rating: FC<RatingProps> = ({ value, reviews, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const isFull = value >= star;
        const isHalf = !isFull && value + 0.5 >= star;

        return (
          <svg
            key={star}
            className={`${sizeClass} ${isFull ? 'text-yellow-400' : isHalf ? 'text-yellow-300' : 'text-gray-300'}`}
            fill={isFull || isHalf ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.995l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.442 19.546a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.995l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
            />
          </svg>
        );
      })}
      {typeof reviews === 'number' && (
        <span className="text-xs text-gray-500">({reviews})</span>
      )}
    </div>
  );
};

export default Rating;
