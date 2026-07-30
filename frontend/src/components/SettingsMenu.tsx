import { useEffect, useRef, useState } from 'react';
import { BookOpen, Languages, Settings, AlertTriangle } from 'lucide-react';

interface SettingsMenuProps {
  openGlossary: () => void;
  openNormalization: () => void;
  openFailure: () => void;
}

export default function SettingsMenu({
  openGlossary,
  openNormalization,
  openFailure,
}: SettingsMenuProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 transition hover:bg-zinc-800"
      >
        <Settings size={18} />
        Settings
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <button
            onClick={() => {
              setOpen(false);
              openGlossary();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
          >
            <BookOpen size={18} />
            Glossary
          </button>

          <button
            onClick={() => {
              setOpen(false);
              openNormalization();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
          >
            <Languages size={18} />
            Normalization
          </button>

          <button
            onClick={() => {
              setOpen(false);
              openFailure();
            }}
            className="flex w-full items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
          >
            <AlertTriangle size={18} />
            Failure
          </button>
        </div>
      )}
    </div>
  );
}
