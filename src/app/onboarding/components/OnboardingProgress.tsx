// components/OnboardingProgress.tsx
'use client';

import { usePathname } from 'next/navigation';
import { onboardingSteps } from '@/app/constants/onboardingSteps';
import { Progress } from '@/components/ui/progress';


export default function OnboardingProgress() {
    const pathname = usePathname();
    const currentStep = pathname.split('/').pop() || '';
    const index = onboardingSteps.indexOf(currentStep as typeof onboardingSteps[number]);
    const progress = index >= 0 ? ((index + 1)) / onboardingSteps.length * 100 : 0;

    return (
        <div className='mb-6'>
            <Progress value={progress} />
            <p className="text-sm text-primary mt-1 text-right">
                Step {index + 1} of {onboardingSteps.length}
            </p>
        </div>
    )
}