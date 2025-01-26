import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://habinvest.app';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Habinvest - Transform Your Habits into Valuable Assets',
    template: '%s | Habinvest'
  },
  description: 'Transform your daily habits into valuable assets with Habinvest. Track habits, build streaks, and grow your habit portfolio.',
  keywords: ['habit tracking', 'personal development', 'habit building', 'productivity', 'self improvement', 'habit investment'],
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