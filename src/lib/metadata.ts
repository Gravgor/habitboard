import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://habinvest.app';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Habinvest - Transform Your Habits into Valuable Assets',
    template: '%s | Habinvest'
  },
  description: 'Build better habits, track progress, and achieve personal growth. Join thousands who are transforming their daily routines into valuable streaks with our habit-tracking app. Sign up today!',
  keywords: ['habit tracking', 'personal development', 'habit building', 'productivity', 'self improvement', 'habit investment', 'Habit tracking app', 'Best habit tracker 2025', 'Daily habit tracker', 'Build streaks app', 'Habit analytics', 'Goal-setting tools', 'Streak builder app', 'Community-driven habit tracker'],
  authors: [{ name: 'Habinvest' }],
  creator: 'Habinvest',
  publisher: 'Habinvest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Habinvest',
    locale: 'en_US',
    url: baseUrl,
    images: [{
      url: `${baseUrl}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Habinvest - Transform Your Habits into Valuable Assets'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@habinvest',
    creator: '@habinvest',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}; 