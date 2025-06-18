'use client';

import EditYachtModal from './EditYachtModal';
import { useState } from 'react';

type Props = {
  yachts: {
    id: string;
    name: string;
    location: string;
    description: string;
    price: number;
    image: string | null;
    images: { id: string; fileName: string }[];
  }[];
};

export default function AdminYachtTable({ yachts }: Props) {
  const [refresh, setRefresh] = useState(false); // opsiyonel: tabloyu zorla yenilemek istersen

  const handleUpdated = () => {
    // sayfa refresh veya veri çekme işlemi burada yapılabilir
    setRefresh(!refresh); // bu state değişimi üst component'e prop olarak da gönderilebilir
  };

  const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this yacht?')) return;

  const res = await fetch(`/api/yachts/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    alert('Yacht deleted!');
    handleUpdated();
  } else {
    alert('Failed to delete.');
  }
};


  return (
    <div className="mt-10">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {yachts.map((yacht) => (
            <tr key={yacht.id} className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">{yacht.name}</td>
              <td className="px-4 py-2">{yacht.location}</td>
              <td className="px-4 py-2">${yacht.price}</td>
              <td className="px-4 py-2 flex gap-2">
                <EditYachtModal yacht={{ ...yacht, image: yacht.image ?? '' }} onUpdated={handleUpdated} />
                <button
                  onClick={() => handleDelete(yacht.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
