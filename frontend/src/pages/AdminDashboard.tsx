import { useEffect, useMemo, useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import apiClient from '../utils/apiClient';

interface AdminProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
  brand?: string;
  images: string[];
}

interface AdminOrderItem {
  name: string;
  qty: number;
  price: number;
}

interface AdminOrder {
  _id: string;
  user?: {
    name: string;
    email: string;
  };
  totalPrice: number;
  isDelivered: boolean;
  createdAt: string;
  orderItems: AdminOrderItem[];
}

const emptyProduct: AdminProduct = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  brand: 'Koushiks Supplements',
  images: [],
};

const AdminDashboard: FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [productForm, setProductForm] = useState<AdminProduct>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data } = await apiClient.get<{ products: AdminProduct[] }>('/products', {
        params: { limit: 100, sortBy: 'newest' },
      });
      setProducts(data.products);
    } catch (err) {
      setError('Unable to load products.');
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data } = await apiClient.get<AdminOrder[]>('/orders');
      setOrders(data);
    } catch (err) {
      setError('Unable to load orders.');
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleProductChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleImagesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    setProductForm((prev) => ({ ...prev, images: value }));
  };

  const resetForm = () => {
    setProductForm(emptyProduct);
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    try {
      if (editingId) {
        await apiClient.put(`/products/${editingId}`, productForm);
        setMessage('Product updated successfully.');
      } else {
        await apiClient.post('/products', productForm);
        setMessage('Product created successfully.');
      }
      resetForm();
      await fetchProducts();
    } catch (err) {
      setError('Unable to save product. Please verify the details.');
    }
  };

  const startEdit = (product: AdminProduct) => {
    setProductForm({
      ...product,
      images: product.images ?? [],
    });
    setEditingId(product._id ?? null);
  };

  const deleteProduct = async (productId: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await apiClient.delete(`/products/${productId}`);
      setMessage('Product removed successfully.');
      await fetchProducts();
    } catch (err) {
      setError('Unable to delete product.');
    }
  };

  const markDelivered = async (orderId: string) => {
    try {
      await apiClient.put(`/orders/${orderId}/deliver`);
      setMessage('Order marked as delivered.');
      await fetchOrders();
    } catch (err) {
      setError('Unable to update order status.');
    }
  };

  const orderTotals = useMemo(() => orders.length, [orders]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 lg:py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Admin Dashboard | Koushiks Supplements</title>
        <meta name="description" content="Manage Koushiks Supplements products and orders from the admin dashboard." />
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">Admin Dashboard</h1>
      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Manage products, orders, and observe store performance.</p>

      <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('products')}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === 'products' ? 'bg-gradient-primary text-white shadow-lg' : 'bg-white text-gray-600 shadow'
          }`}
        >
          Products
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            activeTab === 'orders' ? 'bg-gradient-primary text-white shadow-lg' : 'bg-white text-gray-600 shadow'
          }`}
        >
          Orders ({orderTotals})
        </button>
      </div>

      {message && <p className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</p>}

      {activeTab === 'products' && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form className="space-y-4 rounded-2xl bg-white p-6 shadow" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">{editingId ? 'Edit Product' : 'Create Product'}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-sm font-semibold text-accent">
                  Cancel
                </button>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={productForm.name}
                onChange={handleProductChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productForm.description}
                onChange={handleProductChange}
                required
                rows={4}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                  Price (₹)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  value={productForm.price}
                  onChange={handleProductChange}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="stock">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min={0}
                  value={productForm.stock}
                  onChange={handleProductChange}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  value={productForm.category ?? ''}
                  onChange={handleProductChange}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="brand">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  value={productForm.brand ?? ''}
                  onChange={handleProductChange}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="images">
                Image URLs (one per line)
              </label>
              <textarea
                id="images"
                value={productForm.images.join('\n')}
                onChange={handleImagesChange}
                rows={3}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-full bg-gradient-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
            >
              {editingId ? 'Update Product' : 'Create Product'}
            </button>
          </form>

          <div className="space-y-4 rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Inventory</h2>
              <button
                type="button"
                onClick={fetchProducts}
                className="text-sm font-semibold text-accent"
              >
                Refresh
              </button>
            </div>
            {loadingProducts ? (
              <p className="text-sm text-gray-500">Loading products...</p>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product._id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          ₹{product.price.toLocaleString('en-IN')} • Stock: {product.stock}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => startEdit(product)}
                          className="text-sm font-semibold text-accent"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => product._id && deleteProduct(product._id)}
                          className="text-sm font-semibold text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {products.length === 0 && <p className="text-sm text-gray-500">No products found.</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-primary">Orders</h2>
            <button type="button" onClick={fetchOrders} className="text-sm font-semibold text-accent">
              Refresh
            </button>
          </div>
          {loadingOrders ? (
            <p className="mt-4 text-sm text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="mt-4 text-sm text-gray-500">No orders yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">Order #{order._id.slice(-6)}</p>
                      <p className="text-xs text-gray-500">
                        {order.user?.name ?? 'Guest'} • {order.user?.email ?? 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">
                        ₹{order.totalPrice.toLocaleString('en-IN')}
                      </p>
                      <p className={`text-xs font-medium ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.isDelivered ? 'Delivered' : 'Pending'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-600">
                    {order.orderItems.map((item) => (
                      <span key={`${order._id}-${item.name}`} className="rounded-full bg-gray-100 px-3 py-1">
                        {item.qty} × {item.name}
                      </span>
                    ))}
                  </div>
                  {!order.isDelivered && (
                    <button
                      type="button"
                      onClick={() => markDelivered(order._id)}
                      className="group relative mt-4 overflow-hidden rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
                    >
                      Mark as Delivered
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
