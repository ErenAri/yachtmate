'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AddYachtForm() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const yachtData = {
      name: formData.get('name'),
      location: formData.get('location'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
    };

    try {
      setUploading(true);
      let uploadedFileNames: string[] = [];

      // 1️⃣ Görsel varsa önce yükle
      if (imageFiles.length > 0) {
        const imageForm = new FormData();
        imageFiles.forEach((file) => imageForm.append('files', file));

        const uploadRes = await fetch('/api/upload-multiple', {
          method: 'POST',
          body: imageForm,
        });

        if (!uploadRes.ok) throw new Error('Upload failed');
        const { fileNames } = await uploadRes.json();
        uploadedFileNames = fileNames;
      }

      // 2️⃣ Yat kaydı oluştur
      const yachtRes = await fetch('/api/yachts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...yachtData,
          images: uploadedFileNames,
        }),
      });

      if (!yachtRes.ok) throw new Error('Yacht creation failed');

      toast.success('Yacht added successfully!');
      router.refresh();
    } catch (err) {
      console.error('[FORM ERROR]', err);
      toast.error('An error occurred while adding the yacht.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input type="text" name="name" className="mt-1 input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
          <input type="text" name="location" className="mt-1 input-style" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea name="description" className="mt-1 input-style" rows={3}></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (€)</label>
        <input type="number" name="price" className="mt-1 input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Images</label>
        <input type="file" multiple className="mt-1 file:input-style" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Add Yacht
      </button>
    </form>

  );
}
