import { notFound } from 'next/navigation';
import { onboardingSteps } from '@/app/constants/onboardingSteps';
import InfoStep from '@/app/onboarding/components/InfoStep';
import PersonalStep from '@/app/onboarding/components/PersonalStep';
import PreferencesStep from '@/app/onboarding/components/PreferencesStep';
import CommunicationStep from '@/app/onboarding/components/CommunicationStep';

const components: Record<string, () => React.ReactNode> = {
  info: () => <InfoStep />,
  personal: () => <PersonalStep />,
  preferences: () => <PreferencesStep />,
  communication: () => <CommunicationStep />,
};

export default async function OnboardingStep({ params }: { params: { step: string } }) {
  const { step } = await params;
  const Component = components[step];

  if (!Component) return notFound();

  return Component();
}
