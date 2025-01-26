import Link from 'next/link';
import { Metadata } from 'next';
import { defaultMetadata } from '@/lib/metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Habinvest
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Log in
              </Link>
              <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="pt-20 pb-16 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-white sm:text-7xl">
              Transform Your{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Daily Habits
                </span>
              </span>{' '}
              into a Legacy of Success
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Empowering individuals to build better habits with analytics, growth insights, and a thriving community of like-minded achievers.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/demo"
                className="rounded-lg bg-slate-800/10 dark:bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-800/20 dark:hover:bg-white/20 transition-colors"
              >
                Live Demo
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Habit Growth Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
              Discover the power of consistency. Our app turns your daily routines into a visual portfolio of success by showing how your streaks add value over time.
              </p>
            </div>

            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get detailed insights into your habit performance with beautiful charts and progress tracking.
              </p>
            </div>

            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center justify-center p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Join a community of habit builders. Share progress, compete on leaderboards, and stay motivated.
              </p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-20 py-16">
            <h2 className="font-display text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Simple, Transparent Pricing
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Choose the plan that best fits your needs.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                      Free
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Perfect for getting started
                    </p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="font-display text-5xl font-bold text-gray-900 dark:text-white">
                      $0
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Track up to 3 habits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Daily reminders
                  </li>
                </ul>

                <Link
                  href="/signup"
                  className="mt-8 block w-full text-center px-6 py-3 text-sm font-medium border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  Get Started
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 border-indigo-600 p-8">
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 text-center">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                      Pro
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      For serious habit builders
                    </p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="font-display text-5xl font-bold text-gray-900 dark:text-white">
                      $5
                    </span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">/mo</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-4 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited habits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom habit icons
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Export data & insights
                  </li>
                </ul>

                <Link
                  href="/signup/pro"
                  className="mt-8 block w-full text-center px-6 py-3 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors"
                >
                  Start Your Pro Adventure
                </Link>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Compare Plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-t border-gray-200 dark:border-gray-800">
                    <th className="py-4 px-6 text-left text-gray-500 dark:text-gray-400">Features</th>
                    <th className="py-4 px-6 text-left text-gray-900 dark:text-white">Free</th>
                    <th className="py-4 px-6 text-left text-gray-900 dark:text-white">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Number of Habits</td>
                    <td className="py-4 px-6">Up to 3</td>
                    <td className="py-4 px-6">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Analytics</td>
                    <td className="py-4 px-6">Basic</td>
                    <td className="py-4 px-6">Advanced</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Habit Icons</td>
                    <td className="py-4 px-6">Standard</td>
                    <td className="py-4 px-6">Custom</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Data Export</td>
                    <td className="py-4 px-6">❌</td>
                    <td className="py-4 px-6">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">Priority Support</td>
                    <td className="py-4 px-6">❌</td>
                    <td className="py-4 px-6">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">API Access</td>
                    <td className="py-4 px-6">❌</td>
                    <td className="py-4 px-6">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20" id="faq">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How does habit tracking work?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Simply check in daily with your habits. Our app calculates your streaks and provides insights into your progress over time.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I switch between plans?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! You can upgrade to Pro at any time. If you downgrade, you'll maintain access to Pro features until the end of your billing period.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a mobile app?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our web app is fully responsive and works great on mobile. Native iOS and Android apps are coming soon!
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What happens to my data if I cancel?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is yours. Pro users can export their data at any time, and we retain it for 30 days after cancellation.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <div className="relative isolate overflow-hidden bg-indigo-600 rounded-3xl px-6 py-24 text-center shadow-2xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Start Building Better Habits Today
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
                Join thousands of others who are already transforming their daily habits into valuable assets.
              </p>
              <div className="mt-10 flex justify-center gap-x-6">
                <Link
                  href="/signup/pro"
                  className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition-colors"
                >
                  View Demo
                </Link>
              </div>
              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
              >
                <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
                <defs>
                  <radialGradient id="gradient">
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/help" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Habinvest. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Built with 
              <svg className="w-4 h-4 text-red-500 mx-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              by <a href="https://github.com/marcelborowczak" target="_blank" rel="noopener noreferrer" className="ml-1 font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Marceli Borowczak</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

