'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
 
export default async function Page() {
  const { user, logout } = useAuth();
  const router = useRouter();

  await logout();
  router.push('/login');
 
  return (
    <></>
  )
}