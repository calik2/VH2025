'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from "next/image";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex w-full items-center justify-center min-h-svh px-4">
  <SidebarTrigger className="absolute top-4 left-4" />
  <div className="max-w-md w-full">
    {children}
  </div>
</main>
      </SidebarProvider>
    </>
  );
} 



// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
    
//   )
// }
