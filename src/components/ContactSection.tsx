'use client';

import React, { useState } from 'react';

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!res.ok) throw new Error('Failed to submit contact form.');

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          Have questions? Want to book a yacht? Reach out to us using the form below.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto text-left"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="col-span-2 sm:col-span-1 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-600"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="col-span-2 sm:col-span-1 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-600"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-600 text-gray-800"
            />
            {error && <p className="col-span-2 text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-green-600 text-lg font-medium">
            ✅ Thank you! Your message has been sent.
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
