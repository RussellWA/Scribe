import { useEffect, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import ThreeColumnDialog, { type ThreeColumnEntry } from './ThreeColumnDialog';

// The new shape of your data
type ThreeColumnData = Record<string, { wrong: string; right: string }>;

interface ThreeColumnManagerProps {
    title: string;
    fetchData: () => Promise<ThreeColumnData | void | null>;
    saveData: (data: ThreeColumnData) => Promise<void>;
    onBack: () => void;
}

export default function ThreeColumnManager({
    title,
    fetchData,
    saveData,
    onBack,
}: ThreeColumnManagerProps) {
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState<ThreeColumnEntry | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
    const [dictionary, setDictionary] = useState<ThreeColumnData | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchData();
                setDictionary(data || {});
            } catch (err) {
                console.error(err);
            }
        }
        load();
    }, [fetchData]);

    const filteredDictionary = dictionary
        ? Object.entries(dictionary).filter(([k, v]) => {
              const keyword = search.toLowerCase();
              return (
                  k.toLowerCase().includes(keyword) ||
                  v.wrong.toLowerCase().includes(keyword) ||
                  v.right.toLowerCase().includes(keyword)
              );
          })
        : [];

    const handleDialogSave = async (originalKey: string | null, newKey: string, newWrong: string, newRight: string) => {
        if (!dictionary) return;
        const newDictionary = { ...dictionary };

        if (originalKey && originalKey !== newKey) {
            delete newDictionary[originalKey];
        }

        newDictionary[newKey] = { wrong: newWrong, right: newRight };

        setDictionary(newDictionary);
        setOpenDialog(false);
        setEditing(null);

        await saveData(newDictionary);
    };

    const handleDelete = async (keyToDelete: string) => {
        if (!dictionary) return;
        const newDictionary = { ...dictionary };
        delete newDictionary[keyToDelete];

        setDictionary(newDictionary);
        await saveData(newDictionary);
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-7xl p-8">
                <div className="relative mb-8 flex items-center">
                    <button
                        onClick={onBack}
                        className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 transition-colors"
                    >
                        ← Back
                    </button>
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">
                        {title}
                    </h1>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <div className="mb-6 flex gap-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 border border-zinc-600/50 bg-zinc-800 rounded-lg px-3 outline-none focus:border-zinc-500"
                        />
                        <button
                            onClick={() => {
                                setEditing(null);
                                setOpenDialog(true);
                            }}
                            className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-500 transition-colors"
                        >
                            + Add Entry
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-[repeat(3,1fr)_100px] rounded-lg bg-zinc-800 p-3 font-semibold gap-4">
                            <div>Input</div>
                            <div>Wrong</div>
                            <div>Correct</div>
                            <div className="text-right pr-2">Actions</div>
                        </div>

                        {filteredDictionary.map(([k, v]) => (
                            <div
                                key={k}
                                className="grid grid-cols-[repeat(3,1fr)_100px] items-start rounded-lg border border-zinc-800 p-4 gap-6"
                            >
                                <div className="font-mono text-sm wrap-break-word whitespace-pre-wrap">{k}</div>
                            
                                <div className="text-red-400 wrap-break-word whitespace-pre-wrap">
                                    {v.wrong}
                                </div>
                                
                                <div className="text-green-400 wrap-break-word whitespace-pre-wrap">
                                    {v.right}
                                </div>

                                <div className="flex justify-end gap-4 pt-1">
                                    <button
                                        onClick={() => {
                                            setEditing({ key: k, wrong: v.wrong, right: v.right });
                                            setOpenDialog(true);
                                        }}
                                        className="hover:text-yellow-400 transition-colors"
                                        title="Edit Entry"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => setDeleteTarget(k)}
                                        className="hover:text-red-400 transition-colors"
                                        title="Delete Entry"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ThreeColumnDialog
                open={openDialog}
                entry={editing}
                onClose={() => {
                    setOpenDialog(false);
                    setEditing(null);
                }}
                onSave={handleDialogSave}
            />

            <ConfirmDialog
                open={!!deleteTarget}
                title="Delete Entry"
                message={`Are you sure you want to delete "${deleteTarget}"? This cannot be undone.`}
                onClose={() => setDeleteTarget(null)}
                onConfirm={() => {
                    if (deleteTarget) handleDelete(deleteTarget);
                }}
            />
        </main>
    );
}