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
  const [touched, setTouched] = useState<number>(0);
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setValues({});
    setTouched(0);
    setShake(false);
  }, [framework]);

  if (!framework) return null;
  const tpl: FrameworkTemplate = templates[framework];
  const fields = tpl.fields;

  const handleChange = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (Object.keys(values).length === touched) setTouched(touched + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(values).length < fields.length || Object.values(values).some((v) => !v.trim())) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const prompt = buildPrompt(tpl, values);
    onPromptReady(prompt);
  };


  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-6 transition-all duration-150 ${shake ? 'animate-shake' : ''}`}
      aria-live="polite"
    >
      {fields.map((f, i) => (
        <div
          key={f.key}
          className={`transition-all duration-150 ${i > touched ? 'opacity-0 max-h-0 pointer-events-none' : 'opacity-100 max-h-40'}`}
        >
          <label className="block text-lg font-semibold mb-2" htmlFor={f.key}>
            {f.label} <span className="text-sm text-slate-500 italic">(ex: <em>{f.example}</em>)</span>
          </label>
          <input
            id={f.key}
            name={f.key}
            type="text"
            autoComplete="off"
            tabIndex={i + 1}
            className="w-full px-4 py-3 rounded-lg border border-warm-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-warm-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition"
            value={values[f.key] || ''}
            onChange={e => handleChange(f.key, e.target.value)}
            onFocus={e => e.currentTarget.select()}
            aria-label={f.label}
            required={i === fields.length - 1}
            style={{ minHeight: 44 }}
          />
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          Copy prompt
        </button>
        <button
          type="button"
          className="w-full sm:w-auto bg-warm-200 hover:bg-warm-300 text-slate-900 font-semibold py-3 px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-sky-500"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

function buildPrompt(tpl: FrameworkTemplate, values: Record<string, string>) {
  // Compose the prompt in a readable format
  return tpl.fields
    .map(f => `${f.label}: ${values[f.key] || ''}`)
    .join('\n');
}
