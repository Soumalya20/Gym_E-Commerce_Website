import { useEffect, useState, type FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image?: string;
  product: string;
}

interface OrderDetail {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paidAt?: string;
}

const OrderSuccessPage: FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await apiClient.get<OrderDetail>(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        setError('We could not load your order details. Please check your orders page.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <Helmet>
          <title>Payment Successful | Koushiks Supplements</title>
          <meta name="description" content="Your Koushiks Supplements payment was successful. Access your order history from your profile." />
        </Helmet>
        <h1 className="text-3xl font-bold text-primary">Payment Successful!</h1>
        <p className="mt-3 text-sm text-gray-600">
          We could not find the order reference. Visit your <Link to="/profile" className="font-semibold text-accent">profile</Link> to review your purchases.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <Helmet>
          <title>Confirming Order | Koushiks Supplements</title>
        </Helmet>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-gray-600">Confirming your order...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
        <Helmet>
          <title>Payment Successful | Koushiks Supplements</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-primary">Payment Successful!</h1>
        <p className="mt-3 text-sm text-gray-600">
          {error ?? 'Your order has been placed. Visit your profile to see the details.'}
        </p>
        <Link to="/products" className="group relative mt-6 overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50">
          <span className="relative z-10">Continue Shopping</span>
          <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Order Confirmed | Koushiks Supplements</title>
        <meta name="description" content="Your Koushiks Supplements order has been confirmed. Review payment details and order summary." />
      </Helmet>
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-green-100 p-6">
          <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-primary">Payment Successful!</h1>
        <p className="mt-3 text-sm text-gray-600">
          Your order has been confirmed. A confirmation email will be sent shortly.
        </p>
      </div>

      <div className="mt-8 space-y-6 rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Order ID</p>
            <p className="text-sm font-semibold text-primary">{order._id}</p>
          </div>
          {order.paidAt && (
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Paid At</p>
              <p className="text-sm font-semibold text-primary">{new Date(order.paidAt).toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Shipping To</p>
          <p className="mt-2 text-sm text-gray-600">
            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
            {order.shippingAddress.country}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Items</h2>
          <div className="space-y-3">
            {order.orderItems.map((item) => (
              <div key={item.product} className="flex items-center justify-between rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/120x120?text=KS'}
                    alt={item.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-primary">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-primary">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Items</span>
            <span>₹{order.itemsPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingPrice === 0 ? 'Free' : `₹${order.shippingPrice.toLocaleString('en-IN')}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{order.taxPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-primary">
            <span>Total Paid</span>
            <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/products" className="rounded-full border-2 border-accent px-6 py-3 text-sm font-bold text-accent transition-all hover:bg-accent hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-accent/30">
          Continue Shopping
        </Link>
        <Link to="/profile" className="group relative overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50">
          <span className="relative z-10">View Orders</span>
          <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
