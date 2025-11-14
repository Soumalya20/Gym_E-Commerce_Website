import { useEffect, useMemo, useState, type FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import loadRazorpay from '../utils/loadRazorpay';
import apiClient from '../utils/apiClient';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

declare global {
  interface Window {
    Razorpay: new (options: unknown) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
  }
}

const PaymentScreen: FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, shippingAddress, clearCart } = useCart();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shippingPrice = useMemo(() => (subtotal > 1999 ? 0 : items.length > 0 ? 199 : 0), [subtotal, items]);
  const taxPrice = useMemo(() => Number((subtotal * 0.12).toFixed(2)), [subtotal]);
  const totalPrice = useMemo(() => Number((subtotal + shippingPrice + taxPrice).toFixed(2)), [subtotal, shippingPrice, taxPrice]);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    } else if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [items, shippingAddress, navigate]);

  const handlePayment = async () => {
    if (items.length === 0 || !shippingAddress) return;

    try {
      setIsProcessing(true);
      setError(null);

      await loadRazorpay();

      const { data } = await apiClient.post<{ orderId: string; amount: number; currency: string; key: string }>(
        '/payment/orders',
        {
          amount: totalPrice,
          currency: 'INR',
        }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'Koushiks Supplements',
        description: 'Premium sports nutrition order',
        order_id: data.orderId,
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verifyPayload = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderItems: items.map((item) => ({ product: item.productId, qty: item.qty })),
              shippingAddress,
              taxPrice,
              shippingPrice,
              totalPrice,
            };

            const { data: verification } = await apiClient.post<{ orderId: string }>('/payment/verify', verifyPayload);
            clearCart();
            navigate(`/order-success?orderId=${verification.orderId}`);
          } catch (verificationError) {
            setError('Payment verification failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        theme: {
          color: '#c44eee',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', () => {
        setError('Payment failed. Please try again or use a different method.');
        setIsProcessing(false);
      });
      razorpay.open();
    } catch (err) {
      setError('We could not initiate the payment. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Secure Checkout | Koushiks Supplements</title>
        <meta name="description" content="Complete your Koushiks Supplements order using Razorpay's secure checkout experience." />
      </Helmet>
      <h1 className="text-3xl font-bold text-primary">Secure Payment</h1>
      <p className="mt-2 text-sm text-gray-500">Complete your purchase using Razorpay's trusted checkout.</p>

      <div className="mt-8 space-y-6 rounded-2xl bg-white p-8 text-sm text-gray-600 shadow-sm">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Items</span>
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

        {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">{error}</p>}

        <button
          className="group relative w-full overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          onClick={handlePayment}
          disabled={isProcessing || items.length === 0}
        >
          <span className="relative z-10">{isProcessing ? 'Processing...' : 'Pay with Razorpay'}</span>
          <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
