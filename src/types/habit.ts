export interface Habit {
  id: string;
  userId: string;
  icon: string;
  name: string;
  description: string;
  streak: number;
  longestStreak: number;
  completedDates: string[];
  value: number; // Base value: 100
  growth: number; // Daily growth rate based on streak
  createdAt: string;
  lastChecked: string;
} 