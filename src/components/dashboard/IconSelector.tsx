'use client';

const defaultIcons = ['📝', '💪', '🏃‍♂️', '🧘‍♀️', '📚', '💧', '🥗', '😴', '🎯', '⭐️', '🌟', '💡', '🎨', '🎵', '🏋️‍♂️', '🧠'];

interface IconSelectorProps {
  selectedIcon: string;
  onSelect: (icon: string) => void;
  customInput?: boolean;
}

export default function IconSelector({ selectedIcon, onSelect, customInput = true }: IconSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-8 gap-2">
        {defaultIcons.map((icon) => (
          <button
            key={icon}
            onClick={() => onSelect(icon)}
            className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              selectedIcon === icon ? 'bg-indigo-100 dark:bg-indigo-900' : ''
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
      
      {customInput && (
        <input
          type="text"
          value={selectedIcon}
          onChange={(e) => onSelect(e.target.value)}
          placeholder="Or type custom emoji"
          className="mt-2 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white text-sm"
        />
      )}
    </div>
  );
} 