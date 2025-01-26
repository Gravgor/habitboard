import { Habit } from "@/types/habit";

export const calculateHabitMetrics = (habit: Habit) => {
  const today = new Date().toISOString().split('T')[0];
  const sortedDates = [...habit.completedDates].sort();
  const lastCompletedDate = sortedDates[sortedDates.length - 1];

  // Calculate streak
  let streak = 0;
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1); // Start from yesterday

  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (!habit.completedDates.includes(dateStr)) {
      break;
    }
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Calculate growth rate based on streak
  // Base growth rate is 1%, increases by 0.5% for each day in streak
  const growthRate = Math.min(1 + (streak * 0.5), 10); // Cap at 10%

  // Calculate new value
  // Value increases by growth rate if completed today
  const completed = habit.completedDates.includes(today);
  const previousValue = habit.value;
  let newValue = previousValue;

  if (completed) {
    newValue = previousValue * (1 + (growthRate / 100));
  } else if (streak === 0) {
    // Decrease value by 2% if streak is broken
    newValue = previousValue * 0.98;
  }

  // Ensure value doesn't go below 50 or above 1000
  newValue = Math.max(50, Math.min(1000, newValue));

  return {
    streak,
    longestStreak: Math.max(habit.longestStreak, streak),
    value: Math.round(newValue * 100) / 100,
    growth: growthRate,
    lastChecked: today
  };
}; 