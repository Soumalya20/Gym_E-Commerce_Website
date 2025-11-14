import { useEffect, useState, type FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import apiClient from '../utils/apiClient';
import ProductCard, { type ProductSummary } from '../components/ProductCard';

const HomePage: FC = () => {
  const [featured, setFeatured] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await apiClient.get<{ products: ProductSummary[] }>('/products', {
          params: { limit: 3, sortBy: 'rating' },
        });
        setFeatured(data.products);
      } catch (error) {
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="space-y-8 sm:space-y-12 lg:space-y-16">
      <Helmet>
        <title>Koushiks Supplements | Premium Sports Nutrition</title>
        <meta
          name="description"
          content="Discover performance-driven supplements crafted by Koushiks Supplements. Explore whey proteins, pre-workouts, and recovery essentials for every athlete."
        />
      </Helmet>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Clinically Backed Formulations',
              description:
                'Each product is developed with evidence-based ingredients to accelerate muscle recovery and performance.',
            },
            {
              title: 'Fast Nationwide Shipping',
              description: 'Secure packaging and trackable deliveries to ensure your supplements arrive fresh and on time.',
            },
            {
              title: 'Trusted by Athletes',
              description:
                'Partnered with elite coaches to craft supplement stacks tailored to strength, endurance, and wellness goals.',
            },
          ].map((feature) => (
            <div key={feature.title} className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 lg:p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 border border-gray-100 hover:border-accent/50">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-5"></div>
              <h3 className="relative z-10 text-lg sm:text-xl font-bold text-primary transition-colors group-hover:text-accent">{feature.title}</h3>
              <p className="relative z-10 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">Featured Supplements</h2>
            <p className="text-xs sm:text-sm text-gray-500">Handpicked bestsellers to kickstart your goals.</p>
          </div>
        </div>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
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
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {featured.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
                No featured products yet. Check back soon!
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
