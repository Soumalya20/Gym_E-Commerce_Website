import { Helmet } from 'react-helmet-async';
import type { FC } from 'react';

const ContactPage: FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contact Koushiks Supplements</title>
        <meta name="description" content="Have questions about Koushiks Supplements? Reach out to our support team for product guidance and order assistance." />
      </Helmet>
      <h1 className="text-3xl font-bold text-primary">Contact Us</h1>
      <p className="mt-4 text-sm text-gray-600">Support form and contact information will be available soon.</p>
    </div>
  );
};

export default ContactPage;
