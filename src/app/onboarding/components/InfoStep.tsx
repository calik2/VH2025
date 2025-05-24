'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InfoStep() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: save this to context, server, or localStorage
    console.log({ name, linkedin, photo });

    router.push('/onboarding/personal');
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">What’s your name?</label>
        <input
          id="name"
          type="text"
          className="w-full border border-gray-300 rounded-md p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="linkedin">What’s your LinkedIn profile URL?</label>
        <input
          id="linkedin"
          type="url"
          className="w-full border border-gray-300 rounded-md p-2"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="photo">Upload a photo of yourself you’d like to share:</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </form>
  );
}
