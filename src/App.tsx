
import { useState, useRef } from 'react';
// import FrameworkSelector from './components/FrameworkSelector';
import FrameworkForm from './components/FrameworkForm';
import Toast from './components/Toast';
import type { FrameworkKey } from './data/templates';

import IntentPicker from './components/IntentPicker';
import type { IntentType } from './components/IntentPicker';
import Confetti from './components/Confetti';

function App() {
  const [intent, setIntent] = useState<IntentType | null>(null);
  const [framework, setFramework] = useState<FrameworkKey | null>(null);
  const [prompt, setPrompt] = useState('');
  const [showToast, setShowToast] = useState(false);
  // Removed 'copied' state as it's not used
  const previewRef = useRef<HTMLDivElement>(null);

  // Copy prompt to clipboard
  const handlePromptReady = (p: string) => {
    setPrompt(p);
    navigator.clipboard.writeText(p).then(() => {
      setShowToast(true);
      if (window.plausible) window.plausible('prompt_copied');
    });
  };

  // Reset all state
  const handleReset = () => {
    setPrompt('');
    setFramework(null);
    setIntent(null);
  };

  // Map intent to framework
  const handleIntentSelect = (selected: IntentType) => {
    setIntent(selected);
    // Map intent to framework key
    if (selected === 'COSTAR') setFramework('COSTAR');
    else if (selected === 'AUTOMAT') setFramework('AUTOMAT');
    setPrompt('');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center py-8 px-2 sm:px-0 font-inter text-material-textLight dark:text-material-textDark">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-sky-400 via-fuchsia-400 to-emerald-300 opacity-70 dark:from-indigo-900 dark:via-fuchsia-800 dark:to-emerald-900 blur-2xl" style={{ minHeight: '100vh' }} />
      {/* Plausible analytics script */}
      <script
        defer
        data-domain={import.meta.env.VITE_PLAUSIBLE_DOMAIN || 'YOUR_PLAUSIBLE_DOMAIN'}
        src="https://plausible.io/js/script.js"
      ></script>
      <main className="w-full flex flex-col items-center">
        {/* Confetti burst when prompt is copied */}
        <Confetti trigger={showToast} onComplete={() => {}} />
        <div className="max-w-xl w-full bg-white/90 dark:bg-zinc-800/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-2 tracking-tight text-material-textLight dark:text-material-textDark font-inter flex items-center gap-2">
            <span role="img" aria-label="spark">✨</span> PromptAmp
          </h1>
          <p className="mb-2 text-lg font-inter text-zinc-700 dark:text-zinc-200 text-center">Supercharge your prompts in seconds!</p>
          <p className="mb-6 text-zinc-500 dark:text-zinc-300 text-center text-sm">Fast, friendly, and fun prompt engineering for everyone.</p>
          {!intent && (
            <IntentPicker onSelect={handleIntentSelect} />
          )}
          {intent && (
            <>
              <FrameworkForm
                framework={framework}
                onPromptReady={handlePromptReady}
                onReset={handleReset}
              />
              <button
                className="mt-4 w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleReset}
                aria-label="Start over"
              >
                Start Over
              </button>
            </>
          )}
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
      <footer className="mt-8 text-xs text-material-outline">&copy; {new Date().getFullYear()} PromptAmp</footer>
    </div>
  );
}

export default App;
