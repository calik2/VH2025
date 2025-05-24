'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import { Label } from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

export default function CommunicationStep() {
  const router = useRouter();

  const [engaged, setEngage] = useState([0]);
  const [comPref, setCom] = useState([0]);

  const handleSubmit = (e: React.FormEvent) => { // when next button is pressed
    e.preventDefault();

    // TODO FOR BACKEND: STORE DATA SOMEWEHRE
    console.log({ engaged, comPref });

    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Advice Question */}
      <div> 
        <label htmlFor="advice" className="block text-med font-medium mb-1">
          How engaged are you hoping to be in this program?
        </label>
        <div className="flex text-s mt-4">
          <span>Very Casual</span>
          <div className='flex-1 mx-4 mt-2'>
              <Slider
              min={0}
              max={5}
              step={1}
              value={engaged}
              onValueChange={setEngage}
              />
          </div>
        <span>Very Active</span>
        </div>
      </div>

      {/* Values Question */}
      <div>
        <label htmlFor="values" className="block text-med font-medium mb-1">
        How do you prefer to communicate? <br></br>Hands-on (video calls, regular check-ins) or Chat (DMs, emails, etc.) 
        </label>
        <div className="flex text-s mt-4">
          <span className='mr-4'>Hands-on</span>
          <div className='flex-1 mx-4 mt-2'>
              <Slider
              min={0}
              max={5}
              step={1}
              value={comPref}
              onValueChange={setCom}
              />
          </div>
        <span className='ml-9'>Chat</span>
        </div>
      </div>

      <div className="text-right">
        <Button type="submit" >Next</Button>
      </div>
    </form>
  );
}