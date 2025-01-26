'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { stripePromise } from '@/lib/stripe';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
  {
    name: 'Free',
    price: '$0',
    interval: 'forever',
    features: [
      'Track up to 3 habits',
      'Basic habit tracking',
      'Daily streaks',
      'Simple statistics'
    ],
    priceId: null,
    buttonText: 'Current Plan'
  },
  {
    name: 'Pro',
    price: '$5',
    interval: 'month',
    features: [
      'Unlimited habits',
      'Advanced insights',
      'Custom habit icons',
      'Detailed analytics',
      'Priority support'
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    buttonText: 'Upgrade to Pro'
  },
  {
    name: 'Team',
    price: '$49.99',
    interval: 'month',
    features: [
      'Everything in Pro',
      'Team dashboard',
      'Admin controls',
      'Team analytics',
      'Custom branding',
      'Dedicated support'
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID,
    buttonText: 'Upgrade to Team'
  }
];

export default function Upgrade() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (priceId: string | null, planName: string) => {
    if (!priceId || !user) return;

    setLoading(planName);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not loaded');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
        }),
      });

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Upgrade Your Account
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Choose the perfect plan for your habit tracking journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white">
                {plan.name}
              </h2>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  /{plan.interval}
                </span>
              </div>
            </div>

            <ul className="mt-6 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleUpgrade(plan.priceId || null, plan.name)}
              disabled={loading === plan.name || !plan.priceId}
              className={`mt-8 w-full px-4 py-2 rounded-lg transition-colors ${
                plan.priceId
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading === plan.name ? 'Processing...' : plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 