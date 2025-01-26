'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { Habit } from '@/types/habit';
import { Achievement, achievements } from '@/types/achievement';
import AchievementsList from '@/components/dashboard/AchievementsList';

interface UserAchievement {
  id: string;
  unlockedAt: string;
}

export default function Achievements() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch habits
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
    });

    // Fetch user achievements
    const fetchUserAchievements = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUnlockedAchievements(userDoc.data().achievements || []);
      }
      setLoading(false);
    };

    fetchUserAchievements();
    return () => unsubscribeHabits();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Achievements
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {unlockedAchievements.length}/{achievements.length} Unlocked
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <AchievementsList 
          habits={habits} 
          userId={user?.uid || ''}
        />
      </div>
    </div>
  );
} 