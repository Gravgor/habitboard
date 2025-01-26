'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function TierStatusIndicator() {
  const { user } = useAuth();
  const [habitCount, setHabitCount] = useState(0);
  const [userTier, setUserTier] = useState<'free' | 'pro'>('free');

  useEffect(() => {
    if (!user) return;

    // Get user tier
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserTier(doc.data().tier || 'free');
      }
    });

    // Real-time habit count
    const habitsQuery = query(
      collection(db, 'habits'),
      where('userId', '==', user.uid)
    );
    
    const unsubscribeHabits = onSnapshot(habitsQuery, (snapshot) => {
      setHabitCount(snapshot.size);
    });

    return () => {
      unsubscribeUser();
      unsubscribeHabits();
    };
  }, [user]);

  if (userTier === 'pro') {
    return (
      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">👑</span>
          <div>
            <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">
              Pro Plan
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Unlimited habits & all features
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Free Plan
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {habitCount}/3 habits used
            </p>
          </div>
        </div>
        {habitCount >= 2 && (
          <Link
            href="/dashboard/upgrade"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Upgrade to Pro →
          </Link>
        )}
      </div>
      {habitCount >= 2 && (
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${(habitCount / 3) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
} 