'use client';

import { useState } from 'react';
import { Habit } from '@/types/habit';
import html2canvas from 'html2canvas';

interface ShareSnapshotProps {
  habits: Habit[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareSnapshot({ habits, isOpen, onClose }: ShareSnapshotProps) {
  const [loading, setLoading] = useState(false);
  const totalValue = habits.reduce((sum, h) => sum + h.value, 0);
  const totalStreaks = habits.reduce((sum, h) => sum + h.streak, 0);
  const completionRate = habits.reduce((sum, h) => sum + h.completedDates.length, 0) / (habits.length * 30) * 100;

  const handleShare = async () => {
    setLoading(true);
    try {
      const snapshotElement = document.getElementById('portfolio-snapshot');
      if (!snapshotElement) return;

      const canvas = await html2canvas(snapshotElement, {
        backgroundColor: null,
        scale: 2,
      });

      const image = canvas.toDataURL('image/png');
      
      if (navigator.share) {
        await navigator.share({
          title: 'My Habit Portfolio',
          text: 'Check out my habit portfolio progress!',
          files: [new File([await (await fetch(image)).blob()], 'habit-portfolio.png', { type: 'image/png' })],
        });
      } else {
        // Fallback to download
        const link = document.createElement('a');
        link.download = 'habit-portfolio.png';
        link.href = image;
        link.click();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white">
            Share Portfolio Snapshot
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div 
          id="portfolio-snapshot"
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📈</span>
              <h3 className="font-display text-lg font-semibold">Habit Portfolio</h3>
            </div>
            <div className="text-sm opacity-75">
              {new Date().toLocaleDateString()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75 mb-1">Portfolio Value</div>
              <div className="text-2xl font-semibold">${totalValue.toFixed(2)}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75 mb-1">Total Streaks</div>
              <div className="text-2xl font-semibold">{totalStreaks} days 🔥</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75 mb-1">Completion Rate</div>
              <div className="text-2xl font-semibold">{completionRate.toFixed(1)}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm opacity-75 mb-1">Active Habits</div>
              <div className="text-2xl font-semibold">{habits.length}</div>
            </div>
          </div>

          <div className="space-y-3">
            {habits.slice(0, 3).map(habit => (
              <div key={habit.id} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                <div className="text-xl">{habit.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{habit.name}</div>
                  <div className="text-sm opacity-75">
                    ${habit.value.toFixed(2)} • {habit.streak} day streak
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-sm opacity-75">
            Generated with HabitTracker
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Snapshot
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 