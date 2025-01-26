'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { stripePromise } from '@/lib/stripe';
import { useEffect } from 'react';

interface SubscriptionData {
  tier: 'free' | 'pro';
  stripeCustomerId?: string;
  subscriptionId?: string;
  currentPeriodEnd?: string;
}

export default function SubscriptionSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [isManaging, setIsManaging] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        setSubscriptionData({
          tier: doc.data().tier || 'free',
          stripeCustomerId: doc.data().stripeCustomerId,
          subscriptionId: doc.data().subscriptionId,
          currentPeriodEnd: doc.data().currentPeriodEnd,
        });
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleUpgrade = async () => {
    setIsManaging(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
          userId: user?.uid,
        }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsManaging(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsManaging(true);
    if (!subscriptionData) return;
    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: subscriptionData.stripeCustomerId,
          returnUrl: window.location.href,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsManaging(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Subscription
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Current Plan
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {subscriptionData?.tier === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {subscriptionData?.tier === 'pro' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                  Free
                </span>
              )}
            </div>
          </div>

          {subscriptionData?.tier === 'pro' && subscriptionData?.currentPeriodEnd && (
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Next billing date:{' '}
                {new Date(subscriptionData.currentPeriodEnd).toLocaleDateString()}
              </div>
            </div>
          )}

          <div className="pt-4">
            {subscriptionData?.tier === 'free' ? (
              <button
                onClick={handleUpgrade}
                disabled={isManaging}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isManaging ? 'Processing...' : 'Upgrade to Pro'}
              </button>
            ) : (
              <button
                onClick={handleManageSubscription}
                disabled={isManaging}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
              >
                {isManaging ? 'Processing...' : 'Manage Subscription'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-b-xl">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
          Plan Features
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {subscriptionData?.tier === 'pro' ? 'Unlimited habits' : 'Up to 3 habits'}
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {subscriptionData?.tier === 'pro' ? 'Advanced analytics' : 'Basic analytics'}
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {subscriptionData?.tier === 'pro' ? 'Custom icons' : 'Standard icons'}
          </li>
        </ul>
      </div>
    </div>
  );
} 