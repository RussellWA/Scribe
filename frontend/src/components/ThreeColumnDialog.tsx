import { useEffect, useState } from 'react';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

export interface ThreeColumnEntry {
    key: string;
    wrong: string;
    right: string;
}

interface ThreeColumnDialogProps {
    open: boolean;
    entry: ThreeColumnEntry | null;
    onClose: () => void;
    onSave: (originalKey: string | null, key: string, wrong: string, right: string) => void;
}

export default function ThreeColumnDialog({
    open,
    entry,
    onClose,
    onSave,
}: ThreeColumnDialogProps) {
    const [inputKey, setInputKey] = useState('');
    const [inputWrong, setInputWrong] = useState('');
    const [inputRight, setInputRight] = useState('');

    useEffect(() => {
        if (entry) {
            setInputKey(entry.key);
            setInputWrong(entry.wrong);
            setInputRight(entry.right);
        } else {
            setInputKey('');
            setInputWrong('');
            setInputRight('');
        }
    }, [entry]);

    // Close on Escape
    useKeyboardShortcut('Escape', () => {
        if (open) onClose();
    }, { allowWhileTyping: true });

    // Save on Enter
    useKeyboardShortcut('Enter', () => {
        if (open && inputKey.trim()) {
            onSave(entry?.key || null, inputKey, inputWrong, inputRight);
            onClose();
        }
    }, { ctrl: true, allowWhileTyping: true });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="max-w-2xl w-full rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        {entry ? 'Edit Entry' : 'Add Entry'}
                    </h2>
                    <span className="text-xs text-zinc-500">Press Ctrl+Enter to save</span>
                </div>

                <div className="space-y-4">
                    <textarea
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder="Input (e.g. Word or Phrase)"
                        rows={2}
                        className="w-full resize-y rounded-lg border border-transparent bg-zinc-800 p-3 text-white outline-none focus:border-zinc-500"
                    />

                    <textarea
                        value={inputWrong}
                        onChange={(e) => setInputWrong(e.target.value)}
                        placeholder="Wrong"
                        rows={3}
                        className="w-full resize-y rounded-lg border border-transparent bg-zinc-800 p-3 text-white outline-none focus:border-red-500/50"
                    />

                    <textarea
                        value={inputRight}
                        onChange={(e) => setInputRight(e.target.value)}
                        placeholder="Right"
                        rows={3}
                        className="w-full resize-y rounded-lg border border-transparent bg-zinc-800 p-3 text-white outline-none focus:border-green-500/50"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 transition-colors"
                        onClick={() => {
                            if (!inputKey.trim()) return; // Prevent empty keys
                            onSave(entry?.key || null, inputKey, inputWrong, inputRight);
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