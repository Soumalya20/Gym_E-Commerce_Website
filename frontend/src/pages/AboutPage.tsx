import { Helmet } from 'react-helmet-async';
import type { FC } from 'react';

const AboutPage: FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>About Koushiks Supplements</title>
        <meta name="description" content="Learn about Koushiks Supplements' mission to deliver clean, high-impact sports nutrition for athletes and fitness enthusiasts." />
      </Helmet>
      <h1 className="text-3xl font-bold text-primary">About Koushiks Supplements</h1>
      <p className="mt-4 text-sm text-gray-600">
        Storytelling, mission statements, and certification highlights will be added here.
      </p>
    </div>
  );
};

export default AboutPage;
