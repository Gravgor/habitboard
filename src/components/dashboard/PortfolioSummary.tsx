'use client';

import { useMemo } from 'react';
import { Habit } from '@/types/habit';

interface PortfolioSummaryProps {
  habits: Habit[];
}

export default function PortfolioSummary({ habits }: PortfolioSummaryProps) {
  const stats = useMemo(() => {
    const totalValue = habits.reduce((sum, habit) => sum + habit.value, 0);
    const totalGrowth = habits.reduce((sum, habit) => sum + habit.growth, 0);
    const avgGrowth = totalGrowth / (habits.length || 1);
    const activeStreaks = habits.filter(h => h.streak > 0).length;

    return {
      totalValue,
      avgGrowth,
      activeStreaks,
      totalHabits: habits.length
    };
  }, [habits]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Portfolio Overview
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Value</p>
          <p className="text-2xl font-semibold">${stats.totalValue.toFixed(2)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Growth</p>
          <p className={`text-2xl font-semibold ${stats.avgGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stats.avgGrowth > 0 ? '+' : ''}{stats.avgGrowth.toFixed(1)}%
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Streaks</p>
          <p className="text-2xl font-semibold">{stats.activeStreaks}/{stats.totalHabits}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Habits</p>
          <p className="text-2xl font-semibold">{stats.totalHabits}</p>
        </div>
      </div>
    </div>
  );
} 