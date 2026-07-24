import { useEffect, useState } from 'react';
import type { GlossaryEntry } from '../types/GlossaryEntry';

interface GlossaryDialogProps {
  open: boolean;
  entry: GlossaryEntry | null;
  onClose: () => void;
  onSave: (entry: GlossaryEntry) => void;
}

export default function GlossaryDialog({
  open,
  entry,
  onClose,
  onSave,
}: GlossaryDialogProps) {
  const [acronym, setAcronym] = useState('');
  const [expansion, setExpansion] = useState('');

  useEffect(() => {
    if (entry) {
      setAcronym(entry.acronym);
      setExpansion(entry.expansion);
    } else {
      setAcronym('');
      setExpansion('');
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
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            placeholder="Acronym"
            className="w-full rounded-lg bg-zinc-800 p-3"
          />

          <input
            value={expansion}
            onChange={(e) => setExpansion(e.target.value)}
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
                acronym,
                expansion,
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
