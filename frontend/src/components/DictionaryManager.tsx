import { useEffect, useState } from 'react';
import DictionaryDialog, { type DictionaryEntry } from './DictionaryDialog';

interface DictionaryManagerProps {
    title: string;
    keyLabel: string;
    valueLabel: string;
    fetchData: () => Promise<Record<string, string> | void | null>;
    saveData: (data: Record<string, string>) => Promise<void>;
    onBack: () => void;
}

export default function DictionaryManager({
    title,
    keyLabel,
    valueLabel,
    fetchData,
    saveData,
    onBack,
}: DictionaryManagerProps) {
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState<DictionaryEntry | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dictionary, setDictionary] = useState<Record<string, string> | null>(null);

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
                  v.toLowerCase().includes(keyword)
              );
          })
        : [];

    const handleDialogSave = async (originalKey: string | null, newKey: string, newValue: string) => {
        if (!dictionary) return;
        const newDictionary = { ...dictionary };

        // If editing and the key changed, remove the old key
        if (originalKey && originalKey !== newKey) {
            delete newDictionary[originalKey];
        }

        newDictionary[newKey] = newValue;

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
            <div className="mx-auto max-w-3xl p-8">
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

                    <div className="space-y-2">
                        <div className="grid grid-cols-[150px_1fr_120px] rounded-lg bg-zinc-800 p-3 font-semibold">
                            <div>{keyLabel}</div>
                            <div>{valueLabel}</div>
                            <div>Actions</div>
                        </div>

                        {filteredDictionary.map(([k, v]) => (
                            <div
                                key={k}
                                className="grid grid-cols-[150px_1fr_120px] items-center rounded-lg border border-zinc-800 p-3"
                            >
                                <div className="font-mono">{k}</div>
                                <div>{v}</div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            setEditing({ key: k, value: v });
                                            setOpenDialog(true);
                                        }}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        onClick={() => handleDelete(k)}
                                        className="hover:text-red-400 transition-colors"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DictionaryDialog
                open={openDialog}
                entry={editing}
                keyLabel={keyLabel}
                valueLabel={valueLabel}
                onClose={() => {
                    setOpenDialog(false);
                    setEditing(null);
                }}
                onSave={handleDialogSave}
            />
        </main>
    );
}