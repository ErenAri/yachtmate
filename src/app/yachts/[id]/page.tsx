import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import YachtGallery from '@/components/YachtGallery';
import BookingForm from '@/components/BookingForm';

export default async function YachtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const yacht = await prisma.yacht.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!yacht) {
    return <div className="text-center py-20 text-red-500 font-semibold">Yacht not found.</div>;
  }

  const coverImage = yacht.images?.[0]?.fileName || yacht.image || 'fallback.jpg';

  return (
    <div className="bg-white min-h-screen">
      {/* Kapak Görseli */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={`/uploads/${coverImage}`}
          alt={yacht.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-4xl font-bold">{yacht.name}</h1>
            <p className="text-lg">{yacht.location}</p>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="max-w-5xl mx-auto py-12 px-6 space-y-8">
        <p className="text-xl italic text-gray-700 leading-relaxed font-parisienne text-center max-w-3xl mx-auto">
          {yacht.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
          <div><strong>Guests:</strong> 12</div>
          <div><strong>Length:</strong> 55m</div>
          <div><strong>Crew:</strong> 10</div>
          <div><strong>Speed:</strong> 15 knots</div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-green-700">
            {yacht.price?.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
          </p>
          <a href="#booking" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition">
            Book Now
          </a>
        </div>
      </div>

      {/* Galeri */}
      {yacht.images.length > 1 && <YachtGallery images={yacht.images} />}

      {/* Rezervasyon Formu */}
      <BookingForm />
    </div>
  );
}
