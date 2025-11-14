import { Helmet } from 'react-helmet-async';
import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { useAuth } from '../contexts/AuthContext';

type OrderSummary = {
  _id: string;
  totalPrice: number;
  isDelivered: boolean;
  createdAt: string;
};

const ProfilePage: FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apiClient.get<OrderSummary[]>('/orders/mine');
        setOrders(data);
      } catch (err) {
        setError('Unable to load your orders at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Account | Koushiks Supplements</title>
        <meta name="description" content="Manage your Koushiks Supplements profile and review recent orders." />
      </Helmet>
      <h1 className="text-3xl font-bold text-primary">My Profile</h1>
      <div className="mt-6 space-y-6">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm text-gray-600">Account details</p>
          {user && (
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium text-primary">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium text-primary">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium text-primary">Role:</span> {user.role}
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Recent Orders</h2>
            <Link to="/products" className="text-sm font-semibold text-accent">
              Shop more
            </Link>
          </div>
          {loading && <p className="mt-4 text-sm text-gray-500">Loading your order history...</p>}
          {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>}
          {!loading && !error && orders.length === 0 && (
            <p className="mt-4 text-sm text-gray-500">No orders yet. Start your transformation with our curated supplements.</p>
          )}
          {!loading && !error && orders.length > 0 && (
            <div className="mt-4 space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">Order #{order._id.slice(-6)}</p>
                    <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      ₹{order.totalPrice.toLocaleString('en-IN')}
                    </p>
                    <p className={`text-xs font-medium ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
