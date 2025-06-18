'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <html lang="en">
      <body className="bg-white text-black">
        {/* Admin sayfalarında navbar'ı gizle */}
        {!isAdmin && <Navbar />}
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
