import { Habit } from "./habit";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (habits: Habit[]) => boolean;
  unlockedAt?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'first_habit',
    title: 'Getting Started',
    description: 'Create your first habit',
    icon: '🌱',
    condition: (habits) => habits.length > 0
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak on any habit',
    icon: '🔥',
    condition: (habits) => habits.some(h => h.streak >= 7)
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: 'Maintain a 30-day streak on any habit',
    icon: '👑',
    condition: (habits) => habits.some(h => h.streak >= 30)
  },
  {
    id: 'value_500',
    title: 'Growth Investor',
    description: 'Grow any habit to $500 in value',
    icon: '📈',
    condition: (habits) => habits.some(h => h.value >= 500)
  },
  {
    id: 'portfolio_1000',
    title: 'Portfolio Pro',
    description: 'Reach a total portfolio value of $1,000',
    icon: '💎',
    condition: (habits) => habits.reduce((sum, h) => sum + h.value, 0) >= 1000
  },
  {
    id: 'three_streaks',
    title: 'Triple Threat',
    description: 'Maintain streaks on 3 habits simultaneously',
    icon: '🎯',
    condition: (habits) => habits.filter(h => h.streak > 0).length >= 3
  }
]; 