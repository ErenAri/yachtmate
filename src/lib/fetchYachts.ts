export type Yacht = {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  image: string | null;
  images: { id: string; fileName: string }[];
};

export const fetchYachts = async (
  page: number,
  limit: number
): Promise<{ yachts: Yacht[]; total: number }> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/yachts?page=${page}&limit=${limit}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch yachts');
  return res.json();
};
