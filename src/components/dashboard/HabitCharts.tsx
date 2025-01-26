'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { format, subDays } from 'date-fns';
import { Habit } from '@/types/habit';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HabitChartsProps {
  habits: Habit[];
  selectedHabitId?: string;
}

export default function HabitCharts({ habits, selectedHabitId }: HabitChartsProps) {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), 29 - i);
    return format(date, 'yyyy-MM-dd');
  });

  const selectedHabit = selectedHabitId 
    ? habits.find(h => h.id === selectedHabitId)
    : null;

  const portfolioValueData = {
    labels: last30Days.map(date => format(new Date(date), 'MMM d')),
    datasets: [{
      label: 'Portfolio Value',
      data: last30Days.map(date => 
        habits.reduce((sum, habit) => 
          habit.completedDates.includes(date) ? sum + habit.value : sum,
          0
        )
      ),
      fill: true,
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4
    }]
  };

  const habitValueData = selectedHabit ? {
    labels: last30Days.map(date => format(new Date(date), 'MMM d')),
    datasets: [{
      label: `${selectedHabit.name} Value`,
      data: last30Days.map(date => 
        selectedHabit.completedDates.includes(date) ? selectedHabit.value : null
      ),
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4
    }]
  } : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Portfolio Performance</h3>
        <Line data={portfolioValueData} options={options} />
      </div>

      {selectedHabit && habitValueData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Habit Performance</h3>
          <Line data={habitValueData} options={options} />
        </div>
      )}
    </div>
  );
} 