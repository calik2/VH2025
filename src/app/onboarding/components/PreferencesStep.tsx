'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {Slider} from '@/components/ui/slider';
import { Label } from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

export default function PreferencesStep() {
  const router = useRouter();

  const [adviceType, setAdvice] = useState([0]);
  const [connection, setConnection] = useState("student");
  const [valueWeight, setValues] = useState([0]);

  const handleSubmit = (e: React.FormEvent) => { // when next button is pressed
    e.preventDefault();

    // TODO FOR BACKEND: STORE DATA SOMEWEHRE
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    const student = connection === "student";
    const updatedData = {
      ...existingData,
      Preferences: {
        ...(existingData.Preferences || {}),
        adviceType: adviceType[0],
        student: student,
        valueWeight: valueWeight[0],
      },
    };
  
    localStorage.setItem('onboardingData', JSON.stringify(updatedData));

    console.log({ adviceType, connection, valueWeight });

    router.push('/onboarding/communication');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Advice Question */}
      <div> 
        <label htmlFor="advice" className="block text-med font-medium mb-1">
          What kind of advice are you hoping to exchange?
        </label>
        <div className="flex text-s mt-4">
          <span>Career</span>
          <div className='flex-1 mx-4 mt-2'>
              <Slider
              min={0}
              max={5}
              step={1}
              value={adviceType}
              onValueChange={setAdvice}
              />
          </div>
        <span>Social</span>
        </div>
      </div>

      {/* Connection Question */}
      <div>
        <label htmlFor="connection" className="block text-med font-medium mb-1">
          Who would you prefer to connect with?
        </label>
        <div className="flex justify-center text-med mt-4">
          <RadioGroup defaultValue="student" onValueChange={setConnection}>
            <div className='flex items-center space-x-2 gap-12'>
              <div className='justify-center space-x-2'>
              <RadioGroupItem value="student" id="r1" />
              <Label htmlFor="r1">Student</Label>
              </div>
              <div className='justify-center space-x-2'>
              <RadioGroupItem value="professional" id="r2" />
              <Label htmlFor="r2">Industry Professional</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        
      </div>

      {/* Values Question */}
      <div>
        <label htmlFor="values" className="block text-med font-medium mb-1">
          How important is it to you that you and your match share similar values?
        </label>
        <div className="flex text-s mt-4">
          <span>Important</span>
          <div className='flex-1 mx-4 mt-2'>
              <Slider
              min={0}
              max={5}
              step={1}
              value={valueWeight}
              onValueChange={setValues}
              />
          </div>
        <span>Don't Care!</span>
        </div>
      </div>

      <div className="text-right">
        <Button type="submit" style={{backgroundColor: '#4f364b' }} >Next</Button>
      </div>
    </form>
  );
}