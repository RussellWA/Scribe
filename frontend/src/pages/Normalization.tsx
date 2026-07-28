import { useEffect, useState } from 'react';
import type { NormalizationEntry } from '../types/NormalizationEntry';
import NormalizationDialog from '../components/NormalizationDialog';
import { getNormalization, saveGlossary, saveNormalization } from '../lib/api';

interface NormalizationProps {
  onBack: () => void;
}

export default function Normalization({ onBack }: NormalizationProps) {
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState<{ slang: string; proper: string } | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dictionary, setDictionary] = useState<Record<string, string> | null>(null);

    useEffect(() => { 
        async function load() {
            try {
                const normalization = await getNormalization();
                setDictionary(normalization || {});
            } catch (err) {
                console.error(err);
            }
        }
        load();
    }, []);
    

    const filteredDictionary = dictionary ? Object.entries(dictionary).filter(([slang, proper]) => {
        const keyword = search.toLowerCase();

        return (
            slang.toLowerCase().includes(keyword) ||
            proper.toLowerCase().includes(keyword)
        );
    }) : [];

    const handleDialogSave = async (entry: NormalizationEntry) => {
        const newDictionary = { ...dictionary };

        if (editing && editing.slang !== entry.slang) {
            delete newDictionary[editing.slang];
        }

        newDictionary[entry.slang] = entry.proper;

        setDictionary(newDictionary);
        setOpenDialog(false);
        setEditing(null);

        await saveNormalization(newDictionary);
    }

    const handleDelete = async (acronym: string) => {
        if (!dictionary) return;
        
        const newDictionary = { ...dictionary };
        delete newDictionary[acronym];
        
        setDictionary(newDictionary);

        await saveGlossary(newDictionary);
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-3xl p-8">
                <div className="relative mb-8 flex items-center">
                    <button
                        onClick={onBack}
                        className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
                    >
                        ← Back
                    </button>

                    <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">Normalization</h1>
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

                        {filteredDictionary.map(([slang, proper]) => (
                            <div
                                key={slang}
                                className="grid grid-cols-[150px_1fr_120px] items-center rounded-lg border border-zinc-800 p-3"
                            >
                                <div className="font-mono">{slang}</div>

                                <div>{proper}</div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                        setEditing({ slang, proper });
                                        setOpenDialog(true);
                                        }}
                                        className="hover:text-yellow-400"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleDelete(slang);
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
                onClose={() => {
                    setOpenDialog(false);
                    setEditing(null);
                }}
                onSave={handleDialogSave}
            />
        </main>
    );
}
