import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useCart, type ShippingAddress } from '../contexts/CartContext';

const ShippingPage: FC = () => {
  const navigate = useNavigate();
  const { items, shippingAddress, saveShippingAddress } = useCart();
  const [formState, setFormState] = useState<ShippingAddress>(
    shippingAddress ?? { address: '', city: '', postalCode: '', country: '' }
  );

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveShippingAddress(formState);
    navigate('/payment');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8 lg:py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Shipping Details | Koushiks Supplements</title>
        <meta name="description" content="Provide your shipping information so Koushiks Supplements can deliver your performance stack." />
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">Shipping Details</h1>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Let us know where to deliver your supplements.</p>

      <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 lg:p-8 shadow-sm" onSubmit={handleSubmit}>
        {[
          { label: 'Address', name: 'address', placeholder: '123 Fitness Street' },
          { label: 'City', name: 'city', placeholder: 'Bengaluru' },
          { label: 'Postal Code', name: 'postalCode', placeholder: '560001' },
          { label: 'Country', name: 'country', placeholder: 'India' },
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              value={formState[field.name as keyof ShippingAddress]}
              onChange={handleChange}
              required
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        ))}
        <button className="group relative w-full overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50">
          <span className="relative z-10">Continue to Payment</span>
          <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
