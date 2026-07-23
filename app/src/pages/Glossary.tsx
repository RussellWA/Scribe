import { useState } from 'react';
import type { GlossaryEntry } from '../types/GlossaryEntry';
import { glossaryData } from '../data/glossary';
import GlossaryDialog from '../components/GlossaryDialog';

interface GlossaryProps {
  onBack: () => void;
}

export default function Glossary({ onBack }: GlossaryProps) {
  const [search, setSearch] = useState('');

  const [entries, setEntries] = useState(glossaryData);

  const [editing, setEditing] = useState<GlossaryEntry | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const filteredEntries = entries.filter((entry) => {
    const keyword = search.toLowerCase();

    return (
      entry.acronym.toLowerCase().includes(keyword) ||
      entry.expansion.toLowerCase().includes(keyword)
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

          <h1 className="text-3xl font-bold">Glossary</h1>

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
              <div>Acronym</div>

              <div>Expansion</div>

              <div>Actions</div>
            </div>

            {filteredEntries.map((item) => (
              <div
                key={item.acronym}
                className="grid grid-cols-[150px_1fr_120px] items-center rounded-lg border border-zinc-800 p-3"
              >
                <div className="font-mono">{item.acronym}</div>

                <div>{item.expansion}</div>

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
      <GlossaryDialog
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
