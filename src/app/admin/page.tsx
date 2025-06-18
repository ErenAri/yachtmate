import { prisma } from '@/lib/prisma';
import AddYachtForm from '@/components/AddYachtForm';
import AdminYachtTable from '@/components/AdminYachtTable';
import AdminBookingTable from '@/components/AdminBookingTable';

export default async function AdminPage() {
  const yachts = await prisma.yacht.findMany({
    include: { images: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-400 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white-800 dark:text-blue-200">
        Yacht Management
      </h1>

      <AddYachtForm />
      <AdminYachtTable yachts={yachts} />

      
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Booking Submissions</h2>
        <AdminBookingTable />
      </section>
    </main>
  );
}
