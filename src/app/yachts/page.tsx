import YachtCard from '@/components/YachtCard';
import Pagination from '@/components/Pagination';
import { fetchYachts, Yacht } from '@/lib/fetchYachts';

export default async function AllYachtsPage(props: { searchParams?: Record<string, string> }) {
  const pageParam = props.searchParams?.page ?? '1';
  const page = parseInt(pageParam, 10);
  const limit = 6;

  const { yachts, total } = await fetchYachts(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen bg-white py-12 px-6">
      <h1 className="text-center text-4xl font-handwriting underline mt-8 mb-12 text-gray-800">
        Our Fleet
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
        {yachts.map((yacht: Yacht) => (
          <YachtCard key={yacht.id} yacht={yacht} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </main>
  );
}
