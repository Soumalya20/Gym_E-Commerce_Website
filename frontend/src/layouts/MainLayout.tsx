import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const MainLayout: FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 py-6 sm:py-8 text-xs sm:text-sm text-gray-300">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Koushiks Supplements. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <a href="#" className="transition hover:text-accent">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-accent">
              Terms of Service
            </a>
            <a href="mailto:support@koushikssupplements.com" className="transition hover:text-accent break-all sm:break-normal">
              support@koushikssupplements.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
