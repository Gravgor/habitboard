'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import HabitCard from '@/components/dashboard/HabitCard';
import AddHabitModal from '@/components/dashboard/AddHabitModal';
import TierStatusIndicator from '@/components/dashboard/TierStatusIndicator';
import ProAnalytics from '@/components/dashboard/ProAnalytics';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Habit } from '@/types/habit';
import ShareSnapshot from '@/components/dashboard/ShareSnapshot';

export default function Dashboard() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userTier, setUserTier] = useState<'free' | 'pro'>('free');
  const [habitCount, setHabitCount] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Get user tier
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserTier(doc.data().tier || 'free');
      }
    });

    // Get habits with real-time updates
    const habitsQuery = query(
      collection(db, 'habits'),
      where('userId', '==', user.uid)
    );
    
    const unsubscribeHabits = onSnapshot(habitsQuery, (snapshot) => {
      const habitData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Habit[];
      
      setHabits(habitData);
      setHabitCount(snapshot.size);
      setLoading(false);
    });

    return () => {
      unsubscribeUser();
      unsubscribeHabits();
    };
  }, [user]);

  const toggleHabitCompletion = async (habitId: string) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const habitRef = doc(db, 'habits', habitId);
    const habit = habits.find(h => h.id === habitId);

    if (!habit) return;

    const completedDates = new Set(habit.completedDates);
    
    if (completedDates.has(today)) {
      completedDates.delete(today);
    } else {
      completedDates.add(today);
    }

    await updateDoc(habitRef, {
      completedDates: Array.from(completedDates)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Progress
          </button>
          <TierStatusIndicator />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={() => toggleHabitCompletion(habit.id)}
          />
        ))}
        
        {userTier === 'free' && habitCount >= 3 ? (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You've reached the limit of 3 habits on the free plan
            </p>
            <Link
              href="/dashboard/upgrade"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <PlusIcon className="w-8 h-8 mb-2" />
            <span>Add New Habit</span>
            {userTier === 'free' && (
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {3 - habitCount} remaining
              </span>
            )}
          </button>
        )}
      </div>

      <ProAnalytics habits={habits} userTier={userTier} />

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        habitCount={habitCount}
        userTier={userTier}
      />

      <ShareSnapshot
        habits={habits}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
} 