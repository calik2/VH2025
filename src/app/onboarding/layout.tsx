// /app/onboarding/layout.tsx
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
          {children}
        </div>
      </div>
    );
  }