'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function InfoStep() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => { // when next button is pressed
    e.preventDefault();

    // TODO FOR BACKEND: STORE DATA SOMEWEHRE
    console.log({ name, linkedin, photo });

    router.push('/onboarding/personal');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Question */}
      <div> 
        <label htmlFor="name" className="block text-med font-medium mb-1">
          What’s your name?
        </label>
        <Input
          id="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* LinkedIn Question */}
      <div>
        <label htmlFor="linkedin" className="block text-med font-medium mb-1">
          What’s your LinkedIn profile URL?
        </label>
        <Input
          id="linkedin"
          placeholder='https://www.linkedin.com/in/...'
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>

      {/* Photo Question */}
      <div>
        <label htmlFor="photo" className="block text-med font-medium mb-1">
          Upload a photo of yourself you'd like to share:
        </label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)} // only allows photo files
          className="file:border-0 file:bg-secondary file:text-sm file:font-medium file:text-foreground"
        />
      </div>

      <div className="text-right">
        <Button type="submit" >Next</Button>
      </div>
    </form>
  );
}
