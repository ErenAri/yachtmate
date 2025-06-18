'use client';

import { useState } from 'react';

type Yacht = {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  image: string ;
};

type Props = {
  yacht: Yacht;
  onUpdated: () => void;
};

export default function EditYachtModal({ yacht, onUpdated }: Props) {
  const [form, setForm] = useState({ ...yacht });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`/api/yachts/${yacht.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });

    if (response.ok) {
      alert('Yacht updated!');
      onUpdated();
      setIsOpen(false);
    } else {
      alert('Error updating yacht.');
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Yacht</h2>
            <form onSubmit={handleSubmit}>
              <input name="name" value={form.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
              <input name="location" value={form.location} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
              <textarea name="description" value={form.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
              <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
              <input name="image" value={form.image} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />

              <div className="flex justify-between">
                <button type="button" onClick={() => setIsOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
