'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import { Label } from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import { on } from 'events';


export default function CommunicationStep() {
  const router = useRouter();

  const [engagement, setEngage] = useState([0]);
  const [communicationStyle, setCom] = useState([0]);

  const handleSubmit = async(e: React.FormEvent) => { // when next button is pressed
    e.preventDefault();

    // TODO FOR BACKEND: STORE DATA SOMEWEHRE

    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    
    const updatedData = {
      ...existingData,
      Preferences: {
        ...(existingData.Preferences || {}),
        engagement: engagement[0],
        communicationStyle: communicationStyle[0],
      },
    };
    
    localStorage.setItem('onboardingData', JSON.stringify(updatedData));
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    console.log(onboardingData);
    try {
      const USER_UID = localStorage.getItem('USER_UID')?.toString();

      if (!USER_UID) {
        console.error("USER_UID not found in localStorage");
        return;
      }

      await fetch(`/api/addUser?USER_UID=${encodeURIComponent(USER_UID)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(onboardingData),
      });

      localStorage.removeItem("onboardingData");

      console.log({ engagement, communicationStyle });

      router.push('/home/recommended');
    }
    catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Advice Question */}
      <div> 
        <label htmlFor="advice" className="block text-med font-medium mb-1">
          How engaged are you hoping to be in this program?
        </label>
        <div className="flex text-s mt-4">
          <span className='ml-2'>Very Casual</span>
          <div className='flex-1 mx-4 mt-2'>
              <Slider
              min={0}
              max={5}
              step={1}
              value={engagement}
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
          <span className='mr-2 ml-2'>Hands-on</span>
          <div className='flex-1 mx-4 mt-2'>
              <Slider
              min={0}
              max={5}
              step={1}
              value={communicationStyle}
              onValueChange={setCom}
              />
          </div>
        <span className='ml-3 mr-6'>Chat</span>
        </div>
      </div>

      <div className="text-right">
        <Button type="submit" style={{backgroundColor: '#4f364b' }}>Next</Button>
      </div>
    </form>
  );
}