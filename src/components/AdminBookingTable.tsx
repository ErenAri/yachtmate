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
      
      <table className="w-full table-auto border-collapse text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
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
            <tr key={b.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
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
