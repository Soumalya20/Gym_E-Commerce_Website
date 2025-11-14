import { useState, type FC, type FormEvent } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await login(email, password);
      const from = (location.state as { from?: string })?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message as string);
      } else {
        setError('Failed to sign in. Please check your credentials.');
      }
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sign In | Koushiks Supplements</title>
        <meta name="description" content="Access your Koushiks Supplements account to manage orders and continue your fitness journey." />
      </Helmet>
      
      <div className="mb-4 sm:mb-6">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 transition-colors hover:text-accent"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="relative w-full max-w-md space-y-6 sm:space-y-8 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to continue your transformation journey.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:scale-100"
          >
            <span className="relative z-10">{loading ? 'Signing in...' : 'Sign In'}</span>
            <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New here?{' '}
          <Link to="/register" className="font-semibold text-accent">
            Create an account
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
