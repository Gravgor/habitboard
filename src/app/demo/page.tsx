'use client';

import { Metadata } from 'next';
import { demoHabits, demoUser } from '@/lib/demo-data';
import HabitCard from '@/components/dashboard/HabitCard';
import ProAnalytics from '@/components/dashboard/ProAnalytics';
import Link from 'next/link';
import { Habit } from '@/types/habit';


export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Habinvest Demo
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Experience how Habinvest helps you transform daily habits into valuable assets. 
              This is a demo account showing 30 days of habit tracking.
            </p>
            <div className="flex gap-4">
              <Link
                href="/signup"
                className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Start Free Account
              </Link>
              <Link
                href="/login"
                className="bg-indigo-500 bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Portfolio Value: ${demoUser.totalValue.toFixed(2)}
                </h2>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  +{demoUser.totalGrowth}% this month
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  Pro Account
                </span>
              </div>
            </div>
          </div>

          {demoHabits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit as Habit}
              onToggle={() => {}}
              isDemo={true}
            />
          ))}
        </div>

        <ProAnalytics
          habits={demoHabits as Habit[]}
          userTier="pro"
          isDemo={true}
        />

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join Habinvest today and start transforming your daily habits into valuable assets. 
            Track your progress, grow your portfolio, and achieve your goals.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Your Free Account →
          </Link>
        </div>
      </div>
    </div>
  );
} 