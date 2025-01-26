export default function Hero() {
  return (
    <main className="flex flex-col items-center justify-center text-center gap-8 py-12">
      <h1 className="font-display text-5xl sm:text-6xl font-bold max-w-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Track Your Habits Like a Stock Portfolio
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        Transform your daily habits into measurable success. Watch your consistency grow like stocks in a portfolio.
      </p>
      
      <div className="flex gap-4 mt-8">
        <a
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2"
          href="/signup"
        >
          Start Tracking Free
        </a>
        <a
          className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
          href="/demo"
        >
          View Demo
        </a>
      </div>
    </main>
  );
} 