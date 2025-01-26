'use client';

import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">H</span>
          </div>
          <span className="font-display text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            HabitBoard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 dark:text-gray-300">
            {user?.email}
          </span>
          <button
            onClick={() => signOut(auth)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
} 