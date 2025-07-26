import React from "react";

export type IntentType = "COSTAR" | "AUTOMAT";

interface IntentPickerProps {
  onSelect: (intent: IntentType) => void;
}

const options = [
  {
    key: "COSTAR",
    title: "Write Content",
    icon: (
      <svg className="w-7 h-7 mb-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    description: "Create a stand-alone, audience-focused piece.",
  },
  {
    key: "AUTOMAT",
    title: "Automate Task",
    icon: (
      <svg className="w-7 h-7 mb-2 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    description: "For chatbots, agents, or scheduled jobs.",
  },
];


const IntentPicker: React.FC<IntentPickerProps> = ({ onSelect }) => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <div className="flex flex-col gap-4 items-center py-6">
      <h2 className="text-xl font-bold mb-2 text-center">
        What do you want to create?
      </h2>
      <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key as IntentType)}
            onMouseEnter={() => setHovered(opt.key)}
            onMouseLeave={() => setHovered(null)}
            className={`flex-1 flex flex-col items-center rounded-xl border transition-all duration-150 px-4 py-6 min-w-[120px] min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-400
              ${hovered === opt.key ? 'bg-blue-50 border-blue-400 shadow-lg scale-105' : 'bg-white border-gray-200 shadow'}
              hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:scale-105
              text-center`}
            style={{ opacity: hovered && hovered !== opt.key ? 0.5 : 1 }}
            aria-label={opt.title}
          >
            {opt.icon}
            <span className="font-semibold text-base mb-1 text-zinc-800">{opt.title}</span>
            <span className="text-gray-600 dark:text-gray-300 text-xs leading-tight">{opt.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntentPicker;
