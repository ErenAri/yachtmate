import YachtCard from './YachtCard';

interface Yacht {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity: number;
  length: number;
  imageUrl: string;
}

interface YachtListProps {
  yachts: Yacht[];
}

export default function YachtList({ yachts }: YachtListProps) {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Featured Yachts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {yachts.map((yacht) => (
          <YachtCard key={yacht.id} yacht={yacht} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="/yachts"
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Yachts →
        </a>
      </div>
    </section>
  );
}
