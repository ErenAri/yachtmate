import { prisma } from '@/lib/prisma';
import ClientWrapper from '@/components/ClientWrapper';

export default async function HomePage() {
  const yachts = await prisma.yacht.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  });

  return <ClientWrapper yachts={yachts} />;
}
