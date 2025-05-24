'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';

const options = ['Learning', 'Impact', 'Creativity', 'Stability', 'Autonomy',
  'Collaboration', 'Growth', 'Innovation', 'Inclusion', 'Ethics', 'Flexibility',
  'Recognition', 'Challenge', 'Security', 'Purpose', 'Leadership', 'Transparency'
];



export default function PersonalStep() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const router = useRouter();

  const [hobbies, setHobbies] = useState('');
  const [values, setValues] = useState('');

  const handleSubmit = (e: React.FormEvent) => { // when next button is pressed
    e.preventDefault();

    // TODO FOR BACKEND: STORE DATA SOMEWEHRE
    console.log({ hobbies, values});

    router.push('/onboarding/preferences');
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hobbies Question */}
      <div> 
        <label htmlFor="hobbies" className="block text-med font-medium mb-1">
          What are a few of your hobbies and interests?
        </label>
        <Input
          id="hobbies"
          placeholder="thrifting, powerlifting, F1"
          type="text"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          required
        />
      </div>

      {/* Values Question */}
      <div>
        <label htmlFor="values" className="block text-med font-medium mb-1">
          What values matter most to you in your career?
        </label>
        <div className="flex flex-wrap flex-wrap gap-2 justify-center">
          {options.map((option) => (
            <Button
              key={option}
              type="button"
              variant={selected.includes(option) ? 'default' : 'outline'}
              onClick={() => toggleOption(option)}
              className=""
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-right">
        <Button type="submit" >Next</Button>
      </div>
    </form>
  );
}