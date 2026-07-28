import { useEffect, useState } from 'react';

export interface DictionaryEntry {
    key: string;
    value: string;
}

interface DictionaryDialogProps {
    open: boolean;
    entry: DictionaryEntry | null;
    keyLabel: string;
    valueLabel: string;
    onClose: () => void;
    onSave: (originalKey: string | null, newKey: string, newValue: string) => void;
}

export default function DictionaryDialog({
    open,
    entry,
    keyLabel,
    valueLabel,
    onClose,
    onSave,
}: DictionaryDialogProps) {
    const [inputKey, setInputKey] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (entry) {
            setInputKey(entry.key);
            setInputValue(entry.value);
        } else {
            setInputKey('');
            setInputValue('');
        }
    }, [entry]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="w-96 rounded-xl bg-zinc-900 p-6">
                <h2 className="mb-4 text-xl font-semibold">
                    {entry ? 'Edit Entry' : 'Add Entry'}
                </h2>

                <div className="space-y-4">
                    <input
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder={keyLabel}
                        className="w-full rounded-lg bg-zinc-800 p-3"
                    />

                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={valueLabel}
                        className="w-full rounded-lg bg-zinc-800 p-3"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="hover:text-zinc-300">
                        Cancel
                    </button>

                    <button
                        className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500 transition-colors"
                        onClick={() => {
                            onSave(entry?.key || null, inputKey, inputValue);
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