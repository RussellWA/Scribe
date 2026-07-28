import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onClose: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    useKeyboardShortcut('Escape', () => {
        if (open) onClose();
    }, { allowWhileTyping: true });

    useKeyboardShortcut('Enter', () => {
        if (open) {
            onConfirm();
            onClose();
        }
    }, { allowWhileTyping: true });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-96 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
                <h2 className="mb-2 text-xl font-bold text-white">{title}</h2>
                <p className="mb-6 text-zinc-400">{message}</p>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="rounded-lg px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500 transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}