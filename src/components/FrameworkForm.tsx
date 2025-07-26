import React, { useState, useRef, useEffect } from 'react';
import { templates } from '../data/templates';
import type { FrameworkTemplate, FrameworkKey } from '../data/templates';

interface FrameworkFormProps {
  framework: FrameworkKey | null;
  onPromptReady: (prompt: string) => void;
  onReset: () => void;
}

export default function FrameworkForm({ framework, onPromptReady, onReset }: FrameworkFormProps) {

  const [values, setValues] = useState<Record<string, string>>({});
  const [visibleCount, setVisibleCount] = useState(1);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setValues({});
    setVisibleCount(1);
    setShake(false);
  }, [framework]);

  useEffect(() => {
    // Auto-focus and scroll to the last visible input
    if (visibleCount > 0 && inputRefs.current[visibleCount - 1]) {
      inputRefs.current[visibleCount - 1]?.focus();
      inputRefs.current[visibleCount - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [visibleCount]);

  if (!framework) return null;
  const tpl: FrameworkTemplate = templates[framework];
  const fields = tpl.fields;

  // Only reveal next field when the current field is non-empty and loses focus (onBlur)
  const handleChange = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
  };


  // Reveal next field only on Next button or Enter
  const handleNext = (idx: number) => {
    if (idx === visibleCount - 1 && visibleCount < fields.length) {
      setVisibleCount(visibleCount + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      // Only trigger on Tab (not Shift+Tab)
      e.preventDefault();
      handleNext(idx);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No required fields; just build prompt from filled fields
    const prompt = buildPrompt(tpl, values);
    onPromptReady(prompt);
  };

  // Reset and scroll to top
  const handleReset = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    setTimeout(() => {
      setValues({});
      setVisibleCount(1);
      onReset();
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  };

  // Live prompt preview with highlights
  const livePrompt = buildPrompt(tpl, values, true);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 transition-all duration-150 ${shake ? 'animate-shake' : ''}`}
      aria-live="polite"
      autoComplete="off"
    >
      {fields.map((f, i) => (
        <div
          key={f.key}
          className={`transition-all duration-150 ease-out ${i < visibleCount ? 'opacity-100 translate-y-0 max-h-40' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'} flex flex-col`}
          style={{ transitionProperty: 'opacity, transform, max-height', minHeight: i < visibleCount ? 44 : 0 }}
        >
          <label
            className="block text-[#1C1B1F] dark:text-[#E6E1E5] text-sm font-medium mb-1"
            htmlFor={f.key}
          >
            {f.label} <span className="text-xs text-[#CAC4D0] italic">(ex: {f.example})</span>
          </label>
          <input
            ref={el => {
              inputRefs.current[i] = el;
            }}
            id={f.key}
            name={f.key}
            type="text"
            autoComplete="off"
            tabIndex={i + 1}
            className="w-full border border-[#CAC4D0] rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6750A4] bg-white dark:bg-[#2A2A3C] text-[#1C1B1F] dark:text-[#E6E1E5] placeholder:text-[#CAC4D0] shadow-sm transition"
            value={values[f.key] || ''}
            onChange={e => handleChange(f.key, e.target.value)}
            aria-label={f.label}
            style={{ minHeight: 44 }}
            onKeyDown={e => handleKeyDown(e, i)}
          />
          {i === visibleCount - 1 && visibleCount < fields.length && (
            <div className="flex items-center mt-2 gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Press Tab or</span>
              <button
                type="button"
                className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-semibold py-1 px-3 rounded transition focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => handleNext(i)}
                disabled={!values[f.key] || values[f.key].trim() === ''}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Live prompt preview */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-2 border-b pb-1 text-[#1C1B1F] dark:text-[#E6E1E5]">Prompt preview</h2>
        <div
          className="font-mono min-h-32 bg-white dark:bg-[#2A2A3C] rounded-xl p-4 border border-[#CAC4D0] text-[#1C1B1F] dark:text-[#E6E1E5] whitespace-pre-line text-base shadow-sm"
          tabIndex={0}
          aria-label="Prompt preview"
          style={{ minHeight: 80 }}
        >
          <span dangerouslySetInnerHTML={{ __html: livePrompt }} />
        </div>
      </section>

      <button
        type="submit"
        className="w-full sm:w-auto bg-[#6750A4] text-white font-semibold py-3 px-6 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#6750A4] hover:bg-purple-700 mt-4"
        style={{ minHeight: 44 }}
      >
        Copy prompt
      </button>

      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="text-[#6750A4] text-sm underline hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-[#6750A4] px-2 py-1 rounded"
          style={{ minHeight: 44 }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

function buildPrompt(tpl: FrameworkTemplate, values: Record<string, string>, highlight = false) {
  // Only include fields that are filled
  return tpl.fields
    .filter(f => (values[f.key] && values[f.key].trim() !== ''))
    .map(f => {
      const val = values[f.key] || '';
      if (highlight && val)
        return `${f.label}: <span class=\"italic text-sky-700 dark:text-sky-300\">${val}</span>`;
      return `${f.label}: ${val}`;
    })
    .join('  ');
}
