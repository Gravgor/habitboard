'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { stripePromise } from '@/lib/stripe';
import Link from 'next/link';

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'free' | 'pro'>('free');

  useEffect(() => {
    const tier = searchParams.get('tier');
    if (tier === 'pro') {
      setSelectedTier('pro');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { 
        displayName: name,
        photoURL: `https://api.dicebear.com/7.x/avatars/svg?seed=${user.uid}`
      });
      
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        photoURL: `https://api.dicebear.com/7.x/avatars/svg?seed=${user.uid}`,
        createdAt: new Date().toISOString(),
        tier: 'free',
        habits: [],
        achievements: [],
        settings: {
          notifications: {
            email: true,
            push: false
          },
          preferences: {
            theme: 'system',
            weekStartsOn: 'monday'
          }
        },
        stripeCustomerId: '',
        subscriptionId: ''
      });

      if (selectedTier === 'pro') {
        const stripe = await stripePromise;
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
            userId: user.uid,
          }),
        });

        const { sessionId } = await response.json();
        const { error } = await stripe!.redirectToCheckout({ sessionId });

        if (error) {
          setError(error.message || 'Something went wrong');
          return;
        }
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
      <h1 className="font-display text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Create your account
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        {selectedTier === 'pro' 
          ? 'Start your Pro journey today'
          : 'Start building better habits today'}
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

    
<form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-gray-900 dark:text-white">
                {selectedTier === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </div>
              <div className="font-medium text-indigo-600 dark:text-indigo-400">
                {selectedTier === 'pro' ? '$5/month' : 'Free'}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedTier === 'pro' 
                ? 'Unlimited habits, custom icons, and advanced analytics'
                : 'Up to 3 habits with basic features'}
            </p>
            {selectedTier === 'free' && (
              <Link
                href="/signup?tier=pro"
                className="mt-3 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Upgrade to Pro →
              </Link>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>


      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
} 