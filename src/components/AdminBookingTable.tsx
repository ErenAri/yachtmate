'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export default function AdminBookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then(setBookings);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booking Submissions</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-2 border">{b.name}</td>
              <td className="p-2 border">{b.email}</td>
              <td className="p-2 border">{b.phone}</td>
              <td className="p-2 border">{b.message}</td>
              <td className="p-2 border">{new Date(b.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
