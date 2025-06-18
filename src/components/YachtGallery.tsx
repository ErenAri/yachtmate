'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Captions from 'yet-another-react-lightbox/plugins/captions';

export default function YachtGallery({
  images,
}: {
  images: { id: string; fileName: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((img) => ({
    src: `/uploads/${img.fileName}`,
    alt: img.fileName,
  }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-xl shadow-md cursor-pointer"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <Image
              src={`/uploads/${img.fileName}`}
              alt="Yacht image"
              width={400}
              height={300}
              className="object-cover w-full h-60 hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Thumbnails, Captions, Zoom, Fullscreen]}
      />
    </div>
  );
}
