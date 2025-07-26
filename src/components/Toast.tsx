import { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg bg-slate-900 text-white text-sm transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ minWidth: 200, textAlign: 'center' }}
    >
      {message}
    </div>
  );
}
