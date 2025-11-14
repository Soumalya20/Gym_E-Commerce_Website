import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import apiClient from '../utils/apiClient';
import ProductCard, { type ProductSummary } from '../components/ProductCard';

interface ProductListResponse {
  products: ProductSummary[];
  page: number;
  pages: number;
  total: number;
  categories?: string[];
}

interface Filters {
  keyword: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  sortBy: 'newest' | 'price' | 'rating';
}

const defaultFilters: Filters = {
  keyword: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  sortBy: 'newest',
};

const ProductListPage: FC = () => {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [formFilters, setFormFilters] = useState<Filters>(defaultFilters);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string | number> = { page };

      if (filters.keyword.trim()) params.keyword = filters.keyword.trim();
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sortBy !== 'newest') params.sortBy = filters.sortBy;

      const { data } = await apiClient.get<ProductListResponse>('/products', { params });
      setProducts(data.products);
      setCategories(data.categories ?? []);
      setPage(data.page);
      setPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      setError('Unable to load products right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setFilters(formFilters);
  };

  const clearFilters = () => {
    setFormFilters(defaultFilters);
    setFilters(defaultFilters);
    setPage(1);
  };

  const hasResults = products.length > 0;
  const pagination = useMemo(() => {
    return Array.from({ length: pages }, (_, index) => index + 1);
  }, [pages]);

  const pageTitle = 'Shop Sports Nutrition Supplements | Koushiks';
  const metaDescription = hasResults
    ? 'Browse premium whey protein, creatine, and performance supplements from Koushiks. Filter by category and price to build your stack.'
    : 'Discover performance supplements from Koushiks. Use filters to find whey protein, creatine, vitamins, and more tailored to your goals.';

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <div className="flex flex-col justify-between gap-4 sm:gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Shop All Products</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">{total} premium supplements curated for your goals.</p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6 lg:flex-row">
        <aside className="w-full rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm lg:w-80">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                id="keyword"
                name="keyword"
                value={formFilters.keyword}
                onChange={handleInputChange}
                placeholder="Search by name or description"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formFilters.category}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <input
                  id="minPrice"
                  name="minPrice"
                  type="number"
                  min={0}
                  value={formFilters.minPrice}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                  Max Price
                </label>
                <input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  min={0}
                  value={formFilters.maxPrice}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={formFilters.sortBy}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm shadow focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="group relative flex-1 overflow-hidden rounded-full bg-gradient-primary px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/50"
              >
                <span className="relative z-10">Apply</span>
                <div className="absolute inset-0 bg-gradient-accent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </form>
        </aside>

        <section className="flex-1">
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-4 aspect-square rounded-xl bg-gray-100" />
                  <div className="space-y-2">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                    <div className="h-4 w-1/3 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
          )}

          {!loading && !error && !hasResults && (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-600">
              No products found. Try adjusting your filters.
            </div>
          )}

          {!loading && !error && hasResults && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {pages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {pagination.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                        pageNumber === page ? 'bg-gradient-primary text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-accent/10 hover:border-accent/50 border border-gray-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((prev) => Math.min(prev + 1, pages))}
                    disabled={page === pages}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductListPage;
