'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';
import Logo from '@/logo/mentHER_logo.png'; // Adjust the path as necessary
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredential = await login(email, password);
      const uid = userCredential.uid;
      document.cookie = `uid=${uid}; path=/; max-age=86400`;
      localStorage.setItem('USER_UID', uid);
      console.log("STORED IDDDD");
      const response = await fetch(`/api/login?USER_UID=${uid}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in");
      }

      console.log("User ID from Firestore:", data.userId);  
            router.push('/home/recommended');
          } catch (error) {
            console.error('Login error:', error);
          } finally {
            setIsLoading(false);
          }
        };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Image src={ Logo } alt="mentHER Logo" width={150} height={150} className="mb-4" />
          <h2 className="text-2xl text-center font-extrabold" style={{ color: '#4f364b' }}>WELCOME!</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                outlineColor: '#4f364b', // focus ring color
                borderColor: '#4f364b'
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                outlineColor: '#4f364b', // focus ring color
                borderColor: '#4f364b'
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              style={{ backgroundColor: '#4f364b' }}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div> */}

          {/* <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Icons.google className="h-5 w-5" />
            Google
          </button> */}

          <p>Don't have an account?</p>
          <Button style={{backgroundColor: '#4f364b'}}><Link href="/signup">Create one here</Link></Button>
        </form>
      </div>
    </div>
  );
} 