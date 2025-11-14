import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Hero: FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary via-accent/20 to-dark py-8 sm:py-12 lg:py-16 min-h-[85vh] flex items-center text-white">
      {/* Animated colorful gradient orbs with multiple layers */}
      <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-gradient-to-r from-pink-500/40 via-accent/50 to-cyan-400/40 blur-3xl animate-float animate-color-shift" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-l from-blue-500/40 via-accent/40 to-purple-600/40 blur-3xl animate-float-reverse animate-color-shift" style={{ animationDelay: '1s' }} aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/30 via-accent/40 to-pink-500/30 blur-3xl animate-pulse-slow animate-rotate-gradient" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
      <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-gradient-to-br from-violet-500/30 to-accent/30 blur-2xl animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 left-1/4 h-40 w-40 rounded-full bg-gradient-to-tr from-rose-400/30 to-accent/30 blur-2xl animate-float-reverse" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
      
      {/* Animated sparkle particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/60 animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
          }}
          aria-hidden="true"
        />
      ))}
      
      {/* Animated gradient mesh overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-shimmer bg-[length:200%_100%]" aria-hidden="true" />
      
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 w-full">
        <div className="max-w-2xl space-y-4 sm:space-y-5 lg:space-y-6 animate-slide-in-left w-full lg:w-auto">
          <div className="inline-block animate-scale-pulse">
            <p className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.4em] text-white drop-shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-pink-500 via-accent to-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 via-accent to-cyan-400 shadow-lg shadow-accent/50"></span>
              </span>
              <span className="bg-gradient-to-r from-pink-300 via-accent to-cyan-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
                Premium Nutrition
              </span>
            </p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight animate-slide-up drop-shadow-2xl">
            <span className="block">Fuel Your</span>
            <span className="block bg-gradient-to-r from-cyan-300 via-accent via-pink-300 to-cyan-300 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Transformation
            </span>
            <span className="block text-white">with</span>
            <span className="block bg-gradient-to-r from-white via-accent via-pink-300 via-cyan-300 to-accent bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              Koushiks Supplements
            </span>
          </h1>
          <p className="text-sm sm:text-base text-gray-100 animate-slide-up drop-shadow-lg backdrop-blur-sm bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10" style={{ animationDelay: '0.2s' }}>
            Discover science-backed supplements crafted to boost performance, enhance recovery, and deliver results.
            Built for athletes, trusted by professionals.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/products"
              className="group relative overflow-hidden rounded-full bg-gradient-primary px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Shop Bestsellers
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
            <Link
              to="/about"
              className="group relative overflow-hidden rounded-full border-2 border-accent/70 bg-white/5 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:border-accent hover:bg-accent/10 hover:shadow-xl hover:shadow-accent/30 active:scale-95"
            >
              <span className="relative z-10">Why Choose Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>

        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] mx-auto lg:mx-0 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
          <div className="relative flex flex-col items-center gap-3 sm:gap-4 lg:gap-5">
            {/* Strength Badge - Positioned above card */}
            <div className="group relative animate-float hidden sm:block">
              <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-r from-accent/60 via-primary/50 to-accent/60 blur-lg sm:blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative rounded-full border border-accent/60 bg-gradient-primary px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-accent/50">
                💪 Strength
              </div>
            </div>

            {/* Main Product Card Container - Made smaller */}
            <div className="relative w-full animate-float" style={{ animationDelay: '0.3s' }}>
              {/* Animated background glow */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-2xl sm:rounded-3xl bg-gradient-primary blur-xl sm:blur-2xl opacity-30 animate-pulse-slow"></div>
              
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-accent/40 bg-gradient-to-br from-white/10 to-primary/20 shadow-xl transition-all duration-500 hover:border-accent/70 hover:shadow-2xl hover:shadow-accent/30">
                <div className="relative flex h-full flex-col justify-end bg-[url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=60')] bg-cover bg-center p-4 sm:p-5 lg:p-6 transition-transform duration-500 group-hover:scale-[1.03]">
                  {/* Smooth gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-primary/70 via-accent/40 to-transparent transition-opacity duration-500 group-hover:from-dark/98 group-hover:via-primary/80"></div>
                  
                  {/* Product Info */}
                  <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-r from-dark/85 via-primary/75 to-dark/85 p-4 sm:p-5 lg:p-6 backdrop-blur-md transition-all duration-500 group-hover:from-dark/90 group-hover:via-accent/70 group-hover:to-dark/90 border border-accent/30 shadow-lg">
                    <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                      <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex h-full w-full rounded-full bg-accent"></span>
                      </span>
                      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-accent">
                        ✨ New Arrival
                      </p>
                    </div>
                    <p className="mt-1 sm:mt-2 text-lg sm:text-xl lg:text-2xl font-extrabold text-white transition-colors duration-300 group-hover:text-accent drop-shadow-lg">
                      HydroMax Whey Isolate
                    </p>
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs">
                      <span className="flex items-center gap-1 sm:gap-2 rounded-full bg-accent/30 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 backdrop-blur-sm border border-accent/50 shadow-md transition-transform duration-300 group-hover:scale-105">
                        <span className="font-bold text-accent">25g</span>
                        <span className="text-white font-semibold">protein</span>
                      </span>
                      <span className="flex items-center gap-1 sm:gap-2 rounded-full bg-accent/30 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 backdrop-blur-sm border border-accent/50 shadow-md transition-transform duration-300 group-hover:scale-105">
                        <span className="font-bold text-accent">5.5g</span>
                        <span className="text-white font-semibold">BCAAs</span>
                      </span>
                      <span className="flex items-center gap-1 sm:gap-2 rounded-full bg-accent/25 px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 backdrop-blur-sm border border-accent/40 shadow-md transition-transform duration-300 group-hover:scale-105">
                        <span className="font-bold text-accent">Zero</span>
                        <span className="text-white font-semibold">Sugar</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Badge - Positioned below card */}
            <div className="group relative animate-float-reverse hidden sm:block" style={{ animationDelay: '0.7s' }}>
              <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-r from-accent/60 via-primary/50 to-accent/60 blur-lg sm:blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative rounded-full border border-accent/60 bg-gradient-accent px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-accent/50">
                🎯 Focus
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
