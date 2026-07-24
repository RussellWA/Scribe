import { useEffect, useState } from 'react';
import type { NormalizationEntry } from '../types/NormalizationEntry';

interface NormalizationDialogProps {
  open: boolean;
  entry: NormalizationEntry | null;
  onClose: () => void;
  onSave: (entry: NormalizationEntry) => void;
}

export default function GlossaryDialog({
  open,
  entry,
  onClose,
  onSave,
}: NormalizationDialogProps) {
  const [slang, setSlang] = useState('');
  const [proper, setProper] = useState('');

  useEffect(() => {
    if (entry) {
      setSlang(entry.slang);
      setProper(entry.proper);
    } else {
      setSlang('');
      setProper('');
    }
  }, [entry]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-96 rounded-xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {entry ? 'Edit Entry' : 'Add Entry'}
        </h2>

        <div className="space-y-4">
          <input
            value={slang}
            onChange={(e) => setSlang(e.target.value)}
            placeholder="Acronym"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            value={proper}
            onChange={(e) => setProper(e.target.value)}
            placeholder="Expansion"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>

          <button
            className="rounded bg-blue-600 px-4 py-2"
            onClick={() => {
              onSave({
                id: entry?.id ?? crypto.randomUUID(),
                slang,
                proper,
              });

              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
