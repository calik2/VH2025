'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Welcome, {user?.email}</h2>
      <p className="text-gray-600">
        This is your dashboard. You can start exploring the database visualization tools here.
      </p>
      <button className="text-black" onClick={handleSubmit}>logout</button>
    </div>
  );
} 