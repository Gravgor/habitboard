import { Metadata } from 'next';
import { defaultMetadata } from '@/lib/metadata';
import SignUpForm from '@/components/auth/SignUpForm';
import { Suspense } from 'react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Sign Up for Habinvest - Start Your Habit Journey',
  description: 'Create your Habinvest account and start transforming your daily habits into valuable assets. Free and Pro plans available.',
  alternates: {
    canonical: '/signup',
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Join Habinvest - Start Your Habit Journey',
    description: 'Create your account and start building valuable habits today. Choose between Free and Pro plans.',
  },
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
} 