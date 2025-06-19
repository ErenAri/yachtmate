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
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
          Yacht Management Dashboard
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Add New Yacht
          </h2>
          <AddYachtForm />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Yacht Listings
          </h2>
          <AdminYachtTable yachts={yachts} />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Booking Submissions
          </h2>
          <AdminBookingTable />
        </div>
      </div>
    </main>

  );
}
