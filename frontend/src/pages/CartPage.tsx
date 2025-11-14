import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  const shippingPrice = subtotal > 1999 ? 0 : items.length > 0 ? 199 : 0;
  const taxPrice = Number((subtotal * 0.12).toFixed(2));
  const totalPrice = Number((subtotal + shippingPrice + taxPrice).toFixed(2));

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    if (!user) {
      navigate('/login', { state: { from: '/shipping' } });
      return;
    }
    navigate('/shipping');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 lg:py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Your Cart | Koushiks Supplements</title>
        <meta name="description" content="Review the supplements in your cart before completing your Koushiks Supplements purchase." />
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">Shopping Cart</h1>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Review your selections before heading to checkout.</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-12 text-center text-sm text-gray-600">
          Your cart is empty. Explore our <button onClick={() => navigate('/products')} className="font-bold text-accent hover:underline transition-all">product collection</button> to get started.
        </div>
      ) : (
        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex flex-col gap-4 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm sm:flex-row">
                <img
                  src={item.image || 'https://via.placeholder.com/200x200?text=Koushiks+Supplements'}
                  alt={item.name}
                  className="h-32 w-full rounded-xl object-cover sm:w-32"
                />
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
                    <p className="text-sm text-gray-500">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <label htmlFor={`qty-${item.productId}`} className="text-sm text-gray-600">
                        Qty
                      </label>
                      <select
                        id={`qty-${item.productId}`}
                        value={item.qty}
                        onChange={(event) => updateQuantity(item.productId, Number(event.target.value))}
                        className="rounded-full border border-gray-200 px-3 py-1 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                      >
                        {Array.from({ length: Math.min(item.stock, 10) }, (_, index) => index + 1).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-semibold text-primary">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-sm font-medium text-red-500 transition hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-primary">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString('en-IN')}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (12%)</span>
                <span>₹{taxPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-primary">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button
              className="group relative mt-6 w-full overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
              onClick={handleCheckout}
            >
              <span className="relative z-10">Proceed to Checkout</span>
              <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
