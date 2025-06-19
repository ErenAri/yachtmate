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
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-900 text-white shadow-lg rounded-xl p-6 space-y-4 mb-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
        <input name="name" required className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
        <input name="location" required className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
        <textarea name="description" required className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
        <input name="price" type="number" required className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {uploading ? 'Uploading...' : 'Add Yacht'}
      </button>
    </form>
  );
}
