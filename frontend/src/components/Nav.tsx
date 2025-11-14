import { useState, type FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const Nav: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const cartCount = totalItems;

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-1.5 sm:gap-2 text-base sm:text-xl font-semibold tracking-tight text-primary transition hover:scale-105">
          <span className="relative rounded-full bg-gradient-primary px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-bold uppercase text-white shadow-lg transition-all group-hover:shadow-accent/50 group-hover:scale-110">
            <span className="relative z-10">KS</span>
            <span className="absolute inset-0 rounded-full bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></span>
          </span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all hidden sm:inline">
            Koushiks Supplements
          </span>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all sm:hidden">
            Koushiks
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => setIsOpen((prev: boolean) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-primary focus:outline-none focus:ring-2 focus:ring-accent sm:hidden"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }: { isActive: boolean }) =>
                  `text-sm font-medium transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-gray-600'}`
                }
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to={user.role === 'admin' ? '/admin' : '/profile'}
                  className={({ isActive }: { isActive: boolean }) =>
                    `text-sm font-medium transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-gray-600'
                    }`
                  }
                >
                  {user.name.split(' ')[0]}
                </NavLink>
                <button
                  type="button"
                  onClick={logout}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-accent"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/login"
                  className={({ isActive }: { isActive: boolean }) =>
                    `text-sm font-medium transition-colors hover:text-accent ${
                      isActive ? 'text-accent' : 'text-gray-600'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }: { isActive: boolean }) =>
                    `group relative overflow-hidden rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50 ${
                      isActive ? 'ring-2 ring-accent ring-offset-2' : ''
                    }`
                  }
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
                </NavLink>
              </div>
            )}

            <NavLink
              to="/cart"
              className="relative inline-flex items-center text-gray-600 transition-colors hover:text-accent"
              aria-label="Cart"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a.75.75 0 100 1.5.75.75 0 000-1.5zm8.25 0a.75.75 0 100 1.5.75.75 0 000-1.5zM7.5 14.25h9.75m-12-9h13.036c.746 0 1.29.706 1.112 1.432l-1.35 5.4a1.125 1.125 0 01-1.088.843H8.732a1.125 1.125 0 01-1.087-.918L6.621 6.75z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-primary px-1.5 text-xs font-bold text-white shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white sm:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  `block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    isActive ? 'bg-gray-100 text-accent' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to={user.role === 'admin' ? '/admin' : '/profile'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    `block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      isActive ? 'bg-gray-100 text-accent' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {user.name}
                </NavLink>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    `block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      isActive ? 'bg-gray-100 text-accent' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }: { isActive: boolean }) =>
                    `block rounded-full px-4 py-2 text-base font-semibold text-white transition-all bg-gradient-primary shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-accent/50 ${
                      isActive ? 'ring-2 ring-accent ring-offset-2' : ''
                    }`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}

            <NavLink
              to="/cart"
              onClick={() => setIsOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `flex items-center justify-between rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive ? 'bg-accent/10 text-accent' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              Cart
              {cartCount > 0 && (
                <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-primary px-1.5 text-xs font-bold text-white shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
