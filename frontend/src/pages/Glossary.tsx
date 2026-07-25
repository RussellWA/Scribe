import { useEffect, useState } from 'react';
import type { GlossaryEntry } from '../types/GlossaryEntry';
import GlossaryDialog from '../components/GlossaryDialog';
import { getGlossary, saveGlossary } from '../lib/api';

interface GlossaryProps {
  onBack: () => void;
}

export default function Glossary({ onBack }: GlossaryProps) {
    const [search, setSearch] = useState('');
    const [editing, setEditing] = useState<{ acronym: string; expansion: string } | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dictionary, setDictionary] = useState<Record<string, string> | null>(null);

    useEffect(() => { 
        async function load() {
            try {
                const glossary = await getGlossary();
                setDictionary(glossary || {});
            } catch (err) {
                console.error(err);
            }
        }
        load();
    }, []);

    const filteredDictionary = dictionary ? Object.entries(dictionary).filter(([acronym, expansion]) => {
        const keyword = search.toLowerCase();
        return (
            acronym.toLowerCase().includes(keyword) ||
            expansion.toLowerCase().includes(keyword)
        );
    }) : [];

    const handleDialogSave = async (entry: GlossaryEntry) => {
        const newDictionary = { ...dictionary };

        if (editing && editing.acronym !== entry.acronym) {
            delete newDictionary[editing.acronym];
        }

        newDictionary[entry.acronym] = entry.expansion;

        setDictionary(newDictionary);
        setOpenDialog(false);
        setEditing(null);

        await saveGlossary(newDictionary);
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

                    <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">
                        Glossary
                    </h1>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                    <div className="mb-6 flex gap-4">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="flex-1 border border-zinc-600/50 bg-zinc-800 rounded-lg px-3"
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

                        {filteredDictionary.map(([acronym, expansion]) => (
                            <div
                                key={acronym}
                                className="grid grid-cols-[150px_1fr_120px] items-center rounded-lg border border-zinc-800 p-3"
                            >
                                <div className="font-mono">{acronym}</div>
                                <div>{expansion}</div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => {
                                            setEditing({ acronym, expansion });
                                            setOpenDialog(true);
                                        }}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        onClick={() => handleDelete(acronym)}
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
            
            <GlossaryDialog
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