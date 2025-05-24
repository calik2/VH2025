'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      {/* Advice Question */}
      <div> 
        <label htmlFor="advice" className="block text-med font-medium mb-1">
          What kind of advice are you looking for?
        </label>
       
      </div>

      {/* Connection Question */}
      <div>
        <label htmlFor="connection" className="block text-med font-medium mb-1">
          Who would you prefer to connect with?
        </label>
      </div>

      <div className="text-right">
        <Button type="submit" >Next</Button>
      </div>
    </form>
  );
}