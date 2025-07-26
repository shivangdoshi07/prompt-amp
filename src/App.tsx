
import { useState, useRef } from 'react';
import FrameworkSelector from './components/FrameworkSelector';
import FrameworkForm from './components/FrameworkForm';
import Toast from './components/Toast';
import type { FrameworkKey } from './data/templates';

function App() {
  const [framework, setFramework] = useState<FrameworkKey | null>(null);
  const [prompt, setPrompt] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Copy prompt to clipboard
  const handlePromptReady = (p: string) => {
    setPrompt(p);
    navigator.clipboard.writeText(p).then(() => {
      setShowToast(true);
      setCopied(true);
      if (window.plausible) window.plausible('prompt_copied');
    });
  };

  // Reset all state
  const handleReset = () => {
    setPrompt('');
    setCopied(false);
    setFramework(null);
  };

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-slate-900 flex flex-col items-center justify-center px-2 py-8">
      {/* Plausible analytics script */}
      <script
        defer
        data-domain={import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'YOUR_PLAUSIBLE_DOMAIN'}
        src="https://plausible.io/js/script.js"
      ></script>
      <main className="w-full flex flex-col items-center">
        <div className="max-w-xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">PromptAmp</h1>
          <p className="mb-6 text-slate-700 dark:text-slate-300">Craft prompt-engineering templates with COSTAR or AUTOMAT frameworks.</p>
          <FrameworkSelector value={framework} onChange={fw => { setFramework(fw); setPrompt(''); setCopied(false); }} />
          {!framework && (
            <div className="text-center text-slate-500 py-12" aria-live="polite">
              Select a template to start crafting your prompt
            </div>
          )}
          <FrameworkForm
            framework={framework}
            onPromptReady={handlePromptReady}
            onReset={handleReset}
          />
          {prompt && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Prompt preview</h2>
              <div
                ref={previewRef}
                className="min-h-32 font-mono bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-warm-200 text-slate-900 dark:text-slate-100 mb-4 whitespace-pre-line"
                tabIndex={0}
                aria-label="Prompt preview"
                style={{ minHeight: 80 }}
              >
                {prompt}
              </div>
              <button
                className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-sky-500"
                onClick={() => {
                  navigator.clipboard.writeText(prompt);
                  setShowToast(true);
                  setCopied(true);
                  if (window.plausible) window.plausible('prompt_copied');
                }}
                aria-label="Copy prompt to clipboard"
                style={{ minHeight: 44 }}
              >
                Copy prompt
              </button>
            </section>
          )}
        </div>
      </main>
      <Toast message="Prompt copied ✔️" show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}

export default App;
