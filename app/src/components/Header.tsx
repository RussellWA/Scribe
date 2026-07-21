import FileText from 'lucide-react/dist/esm/icons/file-text';

export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
        <FileText className="h-6 w-6 text-blue-400" />
      </div>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Scribe</h1>
        <p className="text-sm text-zinc-400">
          Local AI meeting minutes formatter
        </p>
      </div>
    </header>
  );
}
