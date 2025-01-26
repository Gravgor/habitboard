export default function Pricing() {
  return (
    <section className="py-16">
      <h2 className="font-display text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Simple, Transparent Pricing
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-8 bg-white dark:bg-gray-900">
          <h3 className="font-display text-2xl font-bold mb-4">Free Tier</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for getting started</p>
          <div className="font-display text-4xl font-bold mb-6">$0</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Track up to 3 habits
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Basic statistics
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Daily reminders
            </li>
          </ul>
          <a href="/signup" className="block text-center px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
            Get Started
          </a>
        </div>

        <div className="rounded-2xl border border-indigo-600 p-8 bg-white dark:bg-gray-900 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold mb-4">Pro Tier</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">For serious habit builders</p>
          <div className="font-display text-4xl font-bold mb-6">$5<span className="text-lg">/month</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited habits
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Advanced insights
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Custom habit icons
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Priority support
            </li>
          </ul>
          <a href="/signup/pro" className="block text-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
            Upgrade to Pro
          </a>
        </div>
      </div>
    </section>
  );
} 