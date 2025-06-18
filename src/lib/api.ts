import { prisma } from './prisma';

export const getYachts = async () => {
  return await prisma.yacht.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getYachtById = async (id: string) => {
  return await prisma.yacht.findUnique({
    where: { id },
  });
};
