'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setError('');
    } catch (err) {
      console.error(err);
      setError('There was a problem sending your message.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Your Name" className="w-full border px-4 py-2 rounded" />
          <input type="email" name="email" placeholder="Your Email" className="w-full border px-4 py-2 rounded" />
          <input type="tel" name="phone" placeholder="Phone Number" className="w-full border px-4 py-2 rounded" />
          <textarea name="message" placeholder="Your Message" rows={4} className="w-full border px-4 py-2 rounded" />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
            Send Message
          </button>
        </form>
      ) : (
        <div className="text-green-600 text-lg font-medium">
          ✅ Your message has been sent successfully.
        </div>
      )}
    </div>
  );
}
