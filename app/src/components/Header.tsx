import FileText from 'lucide-react/dist/esm/icons/file-text';
import SettingsMenu from './SettingsMenu';

interface HeaderProps {
  openGlossary: () => void;
  openNormalization: () => void;
}

export default function Header({
  openGlossary,
  openNormalization,
}: HeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Scribe</h1>
        <p className="text-sm text-zinc-400">
          Local AI meeting minutes formatter
        </p>
      </div>

      <SettingsMenu
        openGlossary={openGlossary}
        openNormalization={openNormalization}
      />
    </header>
  );
}
