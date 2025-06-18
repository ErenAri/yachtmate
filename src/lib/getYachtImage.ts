interface Yacht {
  image?: string | null;
  images?: { fileName: string }[];
}

export function getYachtImage(yacht: Yacht): string {
  if (yacht.image?.trim?.()) {
    return `/uploads/${yacht.image.trim()}`;
  }

  const fallbackImage = yacht.images?.[0]?.fileName?.trim();
  if (fallbackImage) {
    return `/uploads/${fallbackImage}`;
  }

  return '/default-yacht.jpg';
}
