'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function Hero() {
  const scrollToFleet = () => {
    const el = document.getElementById('fleet');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Arka plan görseli */}
      <Image
        src="/images/hero.jpg"
        alt="Luxury Yacht"
        fill
        priority
        className="object-cover"
      />

      {/* Beyaz yarı saydam overlay */}
      <div className="absolute inset-0 bg-white/70 z-10" />

      {/* İçerik */}
      <div className="relative z-20 text-center text-black px-6">
        <h1 className="text-4xl sm:text-6xl font-bold">
          Sail into Luxury with <span className="text-blue-600">YachtMate</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl">
          Discover our exclusive fleet of modern yachts across the globe.
        </p>
        <button
          onClick={scrollToFleet}
          className="bg-white/30 backdrop-blur-md border border-white/50 text-gray-900 px-6 py-3 rounded-xl shadow-md hover:bg-white/50 transition"
        >
          View Fleet ↓
        </button>
      </div>
    </section>
  );
}
