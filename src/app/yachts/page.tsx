'use client';

import { useSearchParams } from 'next/navigation';
import YachtCard from '@/components/YachtCard';
import Pagination from '@/components/Pagination';
import { fetchYachts, Yacht } from '@/lib/fetchYachts';
import { useEffect, useState } from 'react';

export default function AllYachtsPageClient() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') ?? '1';
  const page = parseInt(pageParam, 10);
  const limit = 6;

  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/yachts?page=${page}&limit=${limit}`);
      const json = await res.json();
      setYachts(json.yachts);
      setTotalPages(Math.ceil(json.total / limit));
    };
    getData();
  }, [page]);

  return (
    <main className="min-h-screen bg-white py-12 px-6">
      <h1 className="text-center text-4xl font-handwriting underline mt-8 mb-12 text-gray-800">
        Our Fleet
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {yachts.map((yacht) => (
          <YachtCard key={yacht.id} yacht={yacht} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
