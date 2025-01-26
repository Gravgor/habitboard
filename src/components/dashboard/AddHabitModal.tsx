'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import IconSelector from './IconSelector';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  habitCount: number;
  userTier: 'free' | 'pro';
}

export default function AddHabitModal({ 
  isOpen, 
  onClose, 
  habitCount, 
  userTier 
}: AddHabitModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📝');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    if (userTier === 'free' && habitCount >= 3) {
      setError('Free tier is limited to 3 habits. Please upgrade to Pro for unlimited habits.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    try {
      await addDoc(collection(db, 'habits'), {
        userId: user.uid,
        name,
        description,
        icon: userTier === 'pro' ? selectedIcon : '📝', // Use selected icon for Pro users
        streak: 0,
        longestStreak: 0,
        completedDates: [],
        value: 100,
        growth: 0,
        createdAt: new Date().toISOString(),
        lastChecked: new Date().toISOString()
      });

      onClose();
    } catch (err) {
      console.error('Error adding habit:', err);
      setError('Failed to create habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <h2 className="font-display text-2xl font-bold mb-6">Add New Habit</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {userTier === 'free' && habitCount >= 3 && (
          <div className="mb-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              You've reached the habit limit for the free tier.{' '}
              <a 
                href="/dashboard/upgrade" 
                className="font-semibold hover:underline"
              >
                Upgrade to Pro
              </a>
              {' '}for unlimited habits!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Habit Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
              rows={3}
            />
          </div>

          {userTier === 'pro' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon
              </label>
              <IconSelector
                selectedIcon={selectedIcon}
                onSelect={setSelectedIcon}
              />
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (userTier === 'free' && habitCount >= 3)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 