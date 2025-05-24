// /constants/onboardingSteps.ts
export const onboardingSteps = ['info', 'personal', 'preferences', 'communication'] as const;

export type Step = typeof onboardingSteps[number];