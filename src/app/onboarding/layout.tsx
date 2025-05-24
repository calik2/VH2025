// /app/onboarding/layout.tsx
import OnboardingProgress from "./components/OnboardingProgress";


export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen --background p-6 flex items-top justify-center">
        <div className="bg-white p-6 rounded-xl w-full max-w-xl">
          <OnboardingProgress />
          {children}
        </div>
      </div>
    );
  }