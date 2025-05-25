'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { NavigationBar } from "@/components/app-navbar"


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
        <main className="flex w-full items-center justify-center px-4">
        <SidebarTrigger className="absolute top-4 left-4" />
        <div className="w-full">
          {children}
        </div>
      </main>
      </SidebarProvider>
    </>
  );  
} 


