'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Ruler } from 'lucide-react';
import { getYachtImage } from '@/lib/getYachtImage';

interface Yacht {
  id: string;
  name: string;
  location: string;
  price: number;
  capacity?: number | null;
  length?: number | null;
  image?: string | null;
  images?: { fileName: string }[];
}

interface YachtCardProps {
  yacht?: Yacht;
}

export default function YachtCard({ yacht }: YachtCardProps) {
  if (!yacht) return null;

  const imageUrl = getYachtImage(yacht);

  return (
    <Link href={`/yachts/${yacht.id}`}>
      <div className="w-[360px] md:w-[400px] lg:w-[440px] bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer">
        
        {/* Görsel */}
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={yacht.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Bilgiler */}
        <div className="p-4 text-gray-800">
          <h2 className="text-lg font-semibold truncate">{yacht.name}</h2>

          <div className="flex items-center text-sm mt-1 gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{yacht.location || '—'}</span>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{yacht.capacity ? `${yacht.capacity} kişi` : '— kişi'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              <span>{yacht.length ? `${yacht.length} m` : '— m'}</span>
            </div>
          </div>

          <div className="mt-3 text-green-600 font-semibold text-md">
            {yacht.price?.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
          })}

          </div>
        </div>
      </div>
    </Link>
  );
}
