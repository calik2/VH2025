'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

export default function InfoStep() {
  const router = useRouter();

  const [Name, setName] = useState('');
  const [LinkedIn, setLinkedin] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [mentor, setMentor] = useState("mentor");
  const [isAStudent, setStudent] = useState("student");


  const handleSubmit = (e: React.FormEvent) => { // when next button is pressed
    e.preventDefault();

    // TODO FOR BACKEND: STORE DATA SOMEWEHRE
    const isMentor = mentor === "mentor"
    const isStudent = isAStudent === "student"
    const onboardingData = {
      isMentor: isMentor,
      isStudent: isStudent,
      Name,
      LinkedIn,
      // optionally: add photo.name or type here, not full file
    };
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    
    console.log({ Name, LinkedIn, mentor, isAStudent, photo });

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
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Mentor Question */}
      <div>
        <label htmlFor="setMentor" className="block text-med font-medium mb-1">
          Are you a mentor or mentee?
        </label>
        <div className="flex justify-center text-med mt-4">
          <RadioGroup defaultValue="mentor" onValueChange={setMentor}>
            <div className='flex items-center space-x-2 gap-12'>
              <div className='justify-center space-x-2'>
              <RadioGroupItem value="mentor" id="r1" />
              <Label htmlFor="r1">Mentor</Label>
              </div>
              <div className='justify-center space-x-2'>
              <RadioGroupItem value="mentee" id="r2" />
              <Label htmlFor="r2">Mentee</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div>
        <label htmlFor="setStudent" className="block text-med font-medium mb-1">
          Are you a student or industry professional?
        </label>
        <div className="flex justify-center text-med mt-4">
          <RadioGroup defaultValue="student" onValueChange={setStudent}>
            <div className='flex items-center space-x-2 gap-12'>
              <div className='justify-center space-x-2'>
              <RadioGroupItem value="student" id="r1" />
              <Label htmlFor="r1">Student</Label>
              </div>
              <div className='justify-center space-x-2'>
              <RadioGroupItem value="industry" id="r2" />
              <Label htmlFor="r2">Industry Professional</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        
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
          value={LinkedIn}
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
