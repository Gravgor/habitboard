'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface LeaderboardUser {
  id: string;
  displayName: string;
  photoURL: string;
  totalValue: number;
  totalStreaks: number;
  completionRate: number;
  rank?: number;
}

export default function Leaderboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('week');
  const [category, setCategory] = useState<'value' | 'streaks' | 'completion'>('value');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const usersRef = collection(db, 'users');
        const habitsRef = collection(db, 'habits');
        
        // Get top 10 users
        const usersSnapshot = await getDocs(query(usersRef, limit(10)));
        const leaderboardData: LeaderboardUser[] = [];

        for (const userDoc of usersSnapshot.docs) {
          const userData = userDoc.data();
          
          // Get user's habits
          const habitsSnapshot = await getDocs(
            query(habitsRef, where('userId', '==', userDoc.id))
          );
          
          const habits = habitsSnapshot.docs.map(doc => doc.data());
          
          // Calculate user stats
          const totalValue = habits.reduce((sum, h) => sum + (h.value || 0), 0);
          const totalStreaks = habits.reduce((sum, h) => sum + (h.streak || 0), 0);
          const completionRate = habits.reduce((sum, h) => {
            const completed = h.completedDates?.length || 0;
            return sum + (completed / 30);
          }, 0) / Math.max(habits.length, 1) * 100;

          leaderboardData.push({
            id: userDoc.id,
            displayName: userData.displayName || 'Anonymous User',
            photoURL: userData.photoURL || '/default-avatar.png',
            totalValue,
            totalStreaks,
            completionRate
          });
        }

        // Sort based on selected category
        leaderboardData.sort((a, b) => {
          switch (category) {
            case 'value':
              return b.totalValue - a.totalValue;
            case 'streaks':
              return b.totalStreaks - a.totalStreaks;
            case 'completion':
              return b.completionRate - a.completionRate;
          }
        });

        // Add ranks
        leaderboardData.forEach((user, index) => {
          user.rank = index + 1;
        });

        setUsers(leaderboardData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [category, timeframe]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
          Leaderboard
        </h2>
        <div className="flex gap-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm"
          >
            <option value="value">Portfolio Value</option>
            <option value="streaks">Total Streaks</option>
            <option value="completion">Completion Rate</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((leaderboardUser) => {
            const isCurrentUser = leaderboardUser.id === user?.uid;
            return (
              <div
                key={leaderboardUser.id}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  isCurrentUser
                    ? 'bg-indigo-50 dark:bg-indigo-900/30'
                    : 'bg-gray-50 dark:bg-gray-700/30'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center font-semibold">
                  {leaderboardUser.rank === 1 && '🏆'}
                  {leaderboardUser.rank === 2 && '🥈'}
                  {leaderboardUser.rank === 3 && '🥉'}
                  {leaderboardUser.rank! > 3 && leaderboardUser.rank}
                </div>
                <img
                  src={leaderboardUser.photoURL}
                  alt={leaderboardUser.displayName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {leaderboardUser.displayName}
                    {isCurrentUser && ' (You)'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {category === 'value' && `$${leaderboardUser.totalValue.toFixed(2)} portfolio value`}
                    {category === 'streaks' && `${leaderboardUser.totalStreaks} days total streaks`}
                    {category === 'completion' && `${leaderboardUser.completionRate.toFixed(1)}% completion rate`}
                  </div>
                </div>
                {isCurrentUser && (
                  <div className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                    Your Rank
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 