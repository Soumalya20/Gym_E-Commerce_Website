import { Helmet } from 'react-helmet-async';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <Helmet>
        <title>Page Not Found | Koushiks Supplements</title>
        <meta name="description" content="The page you are looking for is unavailable. Return to Koushiks Supplements to continue shopping." />
      </Helmet>
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-sm text-gray-600">The page you are looking for could not be found.</p>
      <Link to="/" className="group relative mt-6 overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50">
        <span className="relative z-10">Back to Home</span>
        <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
