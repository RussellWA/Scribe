import {
  Sparkles,
  Copy,
  Download,
  BrushCleaning,
  LoaderCircle,
} from 'lucide-react';
import { useEffect } from 'react';

interface ToolbarProps {
  loading: boolean;
  canGenerate: boolean;
  canCopySave: boolean;
  canClear: boolean;
  onGenerate: () => void;
  onCopy: (output: string) => void;
  onSave: (title: string, output: string) => void;
  onClear: () => void;
}

export default function Toolbar({
  loading,
  canGenerate,
  canCopySave,
  canClear,
  onGenerate,
  onCopy,
  onSave,
  onClear,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        disabled={!canGenerate || loading}
        onClick={onGenerate}
        className="
          inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.99]
          disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:bg-zinc-700
          "
      >
        {loading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate
          </>
        )}
      </button>

      <button
        disabled={!canCopySave}
        onClick={onCopy}
        className="
          inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 active:scale-[0.99]
          disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:bg-zinc-700
          "
      >
        <Copy className="h-4 w-4" />
        Copy
      </button>

      <button
        disabled={!canCopySave}
        onClick={onSave}
        className="
          inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 active:scale-[0.99]
          disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:bg-zinc-700
        "
      >
        <Download className="h-4 w-4" />
        Save
      </button>

      <button
        disabled={!canClear}
        onClick={onClear}
        className="
          inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500 active:scale-[0.99]
          disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:hover:bg-zinc-700  
        "
      >
        <BrushCleaning className="h-4 w-4" />
        Clear
      </button>
    </div>
  );
}
