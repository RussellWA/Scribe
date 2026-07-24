import { useState } from 'react';
import type { NormalizationEntry } from '../types/NormalizationEntry';
import { normalizationData } from '../data/normalization';
import NormalizationDialog from '../components/NormalizationDialog';

interface NormalizationProps {
  onBack: () => void;
}

export default function Normalization({ onBack }: NormalizationProps) {
  const [search, setSearch] = useState('');

  const [entries, setEntries] = useState(normalizationData);

  const [editing, setEditing] = useState<NormalizationEntry | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const filteredEntries = entries.filter((entry) => {
    const keyword = search.toLowerCase();

    return (
      entry.slang.toLowerCase().includes(keyword) ||
      entry.proper.toLowerCase().includes(keyword)
    );
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">Normalization</h1>

          <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500">
            Save Changes
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-6 flex gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 border border-zinc-600/50 rounded-lg px-3"
            />

            <button
              onClick={() => {
                setEditing(null);
                setOpenDialog(true);
              }}
              className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-500"
            >
              + Add Entry
            </button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[150px_1fr_120px] rounded-lg bg-zinc-800 p-3 font-semibold">
              <div>Slang</div>

              <div>Proper Word</div>

              <div>Actions</div>
            </div>

            {filteredEntries.map((item) => (
              <div
                key={item.slang}
                className="grid grid-cols-[150px_1fr_120px] items-center rounded-lg border border-zinc-800 p-3"
              >
                <div className="font-mono">{item.slang}</div>

                <div>{item.proper}</div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setOpenDialog(true);
                    }}
                    className="hover:text-yellow-400"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => {
                      setEntries(entries.filter((e) => e.id !== item.id));
                    }}
                    className="hover:text-red-400"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NormalizationDialog
        open={openDialog}
        entry={editing}
        onClose={() => setOpenDialog(false)}
        onSave={(entry) => {
          if (editing) {
            setEntries(entries.map((e) => (e.id === entry.id ? entry : e)));
          } else {
            setEntries([...entries, entry]);
          }
        }}
      />
      ;
    </main>
  );
}
