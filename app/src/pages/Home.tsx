import Header from '../components/Header';
import MeetingTitle from '../components/MeetingTitle';
import Editor from '../components/Editor';
import Output from '../components/Output';
import Toolbar from '../components/Toolbar';
import { useState } from 'react';
import SessionStats from '../components/SessionStats';
import LegendItem from '../components/LegendItem';
import { calculateStats } from '../utils/statistics';
import { saveMarkdown } from '../utils/save';
import { copyOutput } from '../utils/copy';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { useGenerate } from '../hooks/useGenerate';

interface HomeProps {
  openGlossary: () => void;
  openNormalization: () => void;
}

export default function Home({ openGlossary, openNormalization }: HomeProps) {
  const [title, setTitle] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const { loading, generate } = useGenerate();

  const canGenerate = title.trim() !== '' && input.trim() !== '';
  const canCopySave = output.trim() !== '';
  const canClear = title !== '' || input !== '' || output !== '';

  const stats = calculateStats(input);

  const handleClear = () => {
    const ok = window.confirm('Clear the current meeting?');

    if (!ok) return;

    setTitle('');
    setInput('');
    setOutput('');
    setElapsed(0);
  };

  const handleGenerate = async () => {
    const result = await generate(title, input);

    setOutput(result.output);
    setElapsed(result.elapsed);
  };

  // Ctrl + Enter (works inside textarea)
  useKeyboardShortcut('Enter', handleGenerate, {
    ctrl: true,
    allowWhileTyping: true,
  });

  // Ctrl + S (won't trigger while typing)
  // useKeyboardShortcut('s', handleSave, {
  //   ctrl: true,
  // });

  // Ctrl + K (won't trigger while typing)
  // useKeyboardShortcut('k', openSettings, {
  //   ctrl: true,
  // });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 p-6 lg:p-8">
        <Header
          openGlossary={openGlossary}
          openNormalization={openNormalization}
        />

        <div className="flex w-full items-stretch gap-6">
          <div className="flex-1 space-y-4">
            <MeetingTitle
              value={title}
              onChange={setTitle}
              disabled={loading}
            />
            <div className="mb-3 flex flex-wrap gap-2">
              <LegendItem symbol="-" label="Meeting Notes" />
              <LegendItem symbol="?" label="Need Confirmation" />
              <LegendItem symbol="+" label="Action Items" />
            </div>
          </div>

          <div className="shrink-0">
            <SessionStats stats={stats} model="qwen3:4b" elapsed={elapsed} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Editor value={input} onChange={setInput} disabled={loading} />
          <Output value={output} />
        </div>

        <Toolbar
          loading={loading}
          canGenerate={canGenerate}
          canCopySave={canCopySave}
          canClear={canClear}
          onClear={handleClear}
          onGenerate={handleGenerate}
          onCopy={() => copyOutput(output)}
          onSave={() => saveMarkdown(title, output)}
        />
      </div>
    </main>
  );
}
