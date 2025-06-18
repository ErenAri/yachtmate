'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-white/40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/#" className="text-xl font-bold text-gray-800">
          YachtMate
        </Link>
        <div className="space-x-4">
          <Link href="/#fleet" className="text-gray-800 hover:text-blue-600">
            Fleet
          </Link>
          <Link href="/#yachts" className="text-gray-800 hover:text-blue-600">
            Yachts
          </Link>
          <Link href="/#contact" className="text-gray-800 hover:text-blue-600">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
