import { notFound } from 'next/navigation';
import { onboardingSteps } from '@/app/constants/onboardingSteps';
import InfoStep from '@/app/components/onboarding/InfoStep';
import PersonalStep from '@/app/components/onboarding/PersonalStep';
import PreferencesStep from '@/app/components/onboarding/PreferencesStep';
import CommunicationStep from '@/app/components/onboarding/CommunicationStep';

const components: Record<string, () => React.ReactNode> = {
  info: () => <InfoStep />,
  personal: () => <PersonalStep />,
  preferences: () => <PreferencesStep />,
  communication: () => <CommunicationStep />,
};

export default async function OnboardingStep({ params }: { params: { step: string } }) {
  const { step } = params;
  const Component = components[step];

  if (!Component) return notFound();

  return Component();
}
