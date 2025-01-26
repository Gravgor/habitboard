import { Habit } from "@/types/habit";

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
}

export default function HabitCard({ habit, onToggle }: HabitCardProps) {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  const growthColor = habit.growth > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl w-8 h-8 flex items-center justify-center">
            {habit.icon || '📝'}
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
              {habit.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {habit.description}
            </p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${isCompletedToday 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
            }`}
        >
          {isCompletedToday && (
            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Value</span>
          <span className="font-semibold">${habit.value.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Daily Growth</span>
          <span className={`font-semibold ${growthColor}`}>
            {habit.growth > 0 ? '+' : ''}{habit.growth.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Streak</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{habit.streak} days</span>
            {habit.streak > 0 && (
              <span className="text-orange-500">🔥</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">Best Streak</span>
          <span className="font-semibold">{habit.longestStreak} days</span>
        </div>
      </div>
    </div>
  );
} 