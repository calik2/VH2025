// components/OnboardingProgress.tsx
'use client';

import { usePathname } from 'next/navigation';
import { onboardingSteps } from '@/app/constants/onboardingSteps';
import { Progress }  from '@/components/ui/progress';
import Image from 'next/image';
import Logo from '@/logo/mentHER_logo.png'; // Adjust the path as necessary



export default function OnboardingProgress() {
    const pathname = usePathname();
    const currentStep = pathname.split('/').pop() || '';
    const index = onboardingSteps.indexOf(currentStep as typeof onboardingSteps[number]);
    const progress = index >= 0 ? ((index + 1)) / onboardingSteps.length * 100 : 0;

    return (
        <div className='mb-6'>
            <div className="flex flex-col items-center">
            <Image src={Logo} alt="mentHER Logo" width={150} height={150} className="mb-7" />
            <Progress value={progress} />
            <p className="text-sm text-primary mt-1 text-right">
                Step {index + 1} of {onboardingSteps.length}
            </p>
            </div>
        </div>
    )
}