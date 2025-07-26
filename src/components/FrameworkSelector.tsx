import { templates } from '../data/templates';
import type { FrameworkKey } from '../data/templates';

interface FrameworkSelectorProps {
  value: FrameworkKey | null;
  onChange: (fw: FrameworkKey) => void;
}

export default function FrameworkSelector({ value, onChange }: FrameworkSelectorProps) {
  return (
    <div className="mb-8">
      <label className="block text-lg font-semibold mb-2" htmlFor="framework-select">
        Select a template framework
      </label>
      <div className="flex gap-4">
        {Object.entries(templates).map(([key, tpl]) => (
          <button
            key={key}
            type="button"
            className={`px-4 py-2 rounded-full font-semibold border transition shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100 ${
              value === key
                ? 'bg-sky-500 text-white border-sky-500' 
                : 'bg-warm-100 hover:bg-warm-200 border-warm-300'
            }`}
            aria-pressed={value === key}
            tabIndex={0}
            onClick={() => {
              onChange(key as FrameworkKey);
              if (window.plausible) window.plausible('framework_selected', { props: { name: key } });
            }}
          >
            {tpl.name}
          </button>
        ))}
      </div>
    </div>
  );
}
