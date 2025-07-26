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


const tips = [
  'Pro tip: The best prompts are specific! Add details about your audience, style, and output for magic results.',
  'Fun fact: Even a single extra detail can make your prompt 10x better! Try it out.',
  'Pro tip: Use examples in your prompt to guide the AI toward your ideal output.',
  'Fun fact: Tone and style matter! Specify them for more on-brand results.',
  'Pro tip: Ask for a specific format (like a table or list) to get structured answers.',
];

const IntentPicker: React.FC<IntentPickerProps> = ({ onSelect }) => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [tipIdx] = React.useState(() => Math.floor(Math.random() * tips.length));
  React.useEffect(() => { setMounted(true); }, []);
  return (
    <>
      <div className="flex flex-col gap-4 items-center py-6">
        <h2 className="text-xl font-bold mb-2 text-center font-inter">
          What do you want to create?
        </h2>
        <div className="flex flex-col md:flex-row gap-3 w-full max-w-2xl">
          {options.map((opt, i) => (
            <button
              key={opt.key}
              onClick={() => onSelect(opt.key as IntentType)}
              onMouseEnter={() => setHovered(opt.key)}
              onMouseLeave={() => setHovered(null)}
              className={`flex-1 flex flex-col items-center rounded-xl border transition-all duration-300 px-4 py-6 min-w-[120px] min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-400
                ${hovered === opt.key ? 'bg-blue-100 border-blue-400 shadow-2xl scale-110 ring-2 ring-blue-300' : 'bg-white border-gray-200 shadow'}
                hover:bg-blue-100 hover:border-blue-400 hover:shadow-2xl hover:scale-110 hover:ring-2 hover:ring-blue-300
                active:scale-95
                text-center
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{
                opacity: hovered && hovered !== opt.key ? 0.5 : 1,
                transitionDelay: mounted ? `${i * 80}ms` : '0ms',
              }}
              aria-label={opt.title}
            >
              <span className={hovered === opt.key ? 'animate-wiggle' : ''} style={{ display: 'inline-block' }}>{opt.icon}</span>
              <span className="font-semibold text-base mb-1 text-zinc-800">{opt.title}</span>
              <span className="text-gray-600 dark:text-gray-300 text-xs leading-tight">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-50 dark:bg-fuchsia-900/30 rounded-lg px-4 py-2 max-w-lg shadow-sm animate-fadein">
        <span role="img" aria-label="lightbulb">💡</span> {tips[tipIdx]}
      </div>
    </>
  );
};

export default IntentPicker;
