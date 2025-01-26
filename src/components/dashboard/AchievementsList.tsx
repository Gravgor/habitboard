'use client';

import { useEffect, useState } from 'react';
import { Achievement, achievements } from '@/types/achievement';
import { Habit } from '@/types/habit';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

interface AchievementsListProps {
  habits: Habit[];
  userId: string;
}

export default function AchievementsList({ habits, userId }: AchievementsListProps) {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    const checkAchievements = async () => {
      const newlyUnlocked = achievements.filter(achievement => 
        !unlockedAchievements.includes(achievement.id) && 
        achievement.condition(habits)
      );

      if (newlyUnlocked.length > 0) {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
          achievements: arrayUnion(...newlyUnlocked.map(a => ({
            id: a.id,
            unlockedAt: new Date().toISOString()
          })))
        });
        setUnlockedAchievements(prev => [...prev, ...newlyUnlocked.map(a => a.id)]);
      }
    };

    checkAchievements();
  }, [habits, userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => {
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        
        return (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border ${
              isUnlocked
                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800'
                : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <h3 className="font-display font-semibold text-gray-900 dark:text-white">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 