export const demoHabits = [
  {
    id: 'demo-1',
    name: 'Morning Workout',
    description: 'Start day with 30min exercise',
    icon: '💪',
    value: 325.50,
    growth: 2.8,
    streak: 12,
    longestStreak: 15,
    completedDates: Array.from({ length: 25 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    })
  },
  {
    id: 'demo-2',
    name: 'Reading',
    description: 'Read 30 pages daily',
    icon: '📚',
    value: 450.75,
    growth: 3.2,
    streak: 8,
    longestStreak: 21,
    completedDates: Array.from({ length: 18 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    })
  },
  {
    id: 'demo-3',
    name: 'Meditation',
    description: '15min mindfulness',
    icon: '🧘‍♂️',
    value: 275.25,
    growth: 1.5,
    streak: 5,
    longestStreak: 10,
    completedDates: Array.from({ length: 15 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    })
  }
];

export const demoUser = {
  id: 'demo-user',
  name: 'Demo User',
  photoURL: 'https://api.dicebear.com/7.x/avatars/svg?seed=demo',
  tier: 'pro' as const,
  totalValue: 1051.50,
  totalGrowth: 2.5,
  joinedDate: '2024-01-01'
};

export const demoLeaderboard = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    photoURL: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarah',
    totalValue: 2450.75,
    streak: 45,
    completionRate: 95
  },
  {
    id: 'user-2',
    name: 'Alex Morgan',
    photoURL: 'https://api.dicebear.com/7.x/avatars/svg?seed=alex',
    totalValue: 1850.25,
    streak: 32,
    completionRate: 88
  },
  // ... more demo users
]; 