'use client';

import Leaderboard from '@/components/dashboard/Leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Leaderboard
        </h1>
      </div>

      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How it Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-2xl">💰</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Portfolio Value</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total value of all your habits combined. Grow your habits to climb the ranks!
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">🔥</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Streaks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Combined streak days across all habits. Consistency is key!
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-2xl">✅</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Completion Rate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your overall habit completion percentage. Stay on track!
              </p>
            </div>
          </div>
        </div>

        <Leaderboard />
      </div>
    </div>
  );
} 