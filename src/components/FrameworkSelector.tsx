
import { templates } from '../data/templates';
import type { FrameworkKey } from '../data/templates';

interface FrameworkSelectorProps {
  value: FrameworkKey | null;
  onChange: (fw: FrameworkKey) => void;
}

export default function FrameworkSelector({ value, onChange }: FrameworkSelectorProps) {
  return (
    <section className="mb-8">
      <label className="block text-lg font-semibold mb-2 border-b pb-1 text-zinc-700 dark:text-zinc-100" id="framework-label">
        Choose a prompt framework
      </label>
      <div className="flex flex-row gap-2 w-full" role="radiogroup" aria-labelledby="framework-label">
        {Object.entries(templates).map(([key, tpl], idx) => {
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={tpl.name}
              tabIndex={0}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-semibold border text-center transition duration-150 ease-out shadow-md focus:outline-none focus:ring-2 focus:ring-peach-400 text-base
                ${selected ? 'bg-peach-500 text-white border-peach-500 z-10' : 'bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-100'}`}
              style={{ touchAction: 'manipulation', minHeight: 44 }}
              onClick={() => {
                onChange(key as FrameworkKey);
                if (window.plausible) window.plausible('framework_selected', { props: { name: key } });
              }}
            >
              {tpl.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}
