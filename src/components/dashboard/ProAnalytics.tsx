'use client';

import { useState, useMemo } from 'react';
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
import { Habit } from '@/types/habit';
import Link from 'next/link';
import { format, subDays } from 'date-fns';

// Register ChartJS components
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

interface ProAnalyticsProps {
  habits: Habit[];
  userTier: 'free' | 'pro';
}

export default function ProAnalytics({ habits, userTier }: ProAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const timeframeDays = {
    week: 7,
    month: 30,
    year: 365
  };

  const chartData = useMemo(() => {
    const days = timeframeDays[timeframe];
    const dates = Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - 1 - i);
      return format(date, 'yyyy-MM-dd');
    });

    const completionData = {
      labels: dates.map(date => format(new Date(date), 'MMM d')),
      datasets: [{
        label: 'Completion Rate',
        data: dates.map(date => {
          const completedHabits = habits.filter(h => 
            h.completedDates.includes(date)
          ).length;
          return habits.length > 0 
            ? (completedHabits / habits.length) * 100 
            : 0;
        }),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };

    const valueData = {
      labels: dates.map(date => format(new Date(date), 'MMM d')),
      datasets: [{
        label: 'Total Portfolio Value',
        data: dates.map(date => 
          habits.reduce((sum, habit) => {
            const dateIndex = habit.completedDates.indexOf(date);
            if (dateIndex === -1) return sum;
            // Estimate historical value based on completion date index
            const historicalValue = 100 + (dateIndex * (habit.value - 100) / habit.completedDates.length);
            return sum + historicalValue;
          }, 0)
        ),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };

    return { completionData, valueData };
  }, [habits, timeframe]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            const value = context.raw;
            if (context.dataset.label === 'Completion Rate') {
              return `Completion Rate: ${value.toFixed(1)}%`;
            }
            return `Portfolio Value: $${value.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            //@ts-ignore
            if (this.chart.config._config.data.datasets[0].label === 'Completion Rate') {
              return value + '%';
            }
            return '$' + value;
          }
        }
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

  if (userTier === 'free') {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 text-center">
        <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Advanced Analytics
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Upgrade to Pro to unlock detailed insights, trends, and advanced analytics
        </p>
        <Link
          href="/dashboard/upgrade"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white">
          Advanced Analytics
        </h3>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-sm ${
                timeframe === t
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Completion Rate
          </h4>
          <Line data={chartData.completionData} options={chartOptions} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Portfolio Value
          </h4>
          <Line data={chartData.valueData} options={chartOptions} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {habits.map(habit => (
            <div
              key={habit.id}
              className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
            >
              <div className="text-2xl mb-2">{habit.icon}</div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                {habit.name}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {((habit.completedDates.length / 30) * 100).toFixed(1)}% success
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 