import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { types } from '../../wailsjs/go/models';
import Editor from '../components/Editor';
import Header from '../components/Header';
import LegendItem from '../components/LegendItem';
import MeetingTitle from '../components/MeetingTitle';
import Output from '../components/Output';
import SessionStats from '../components/SessionStats';
import Toolbar from '../components/Toolbar';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { generateMinutes } from '../lib/api';
import { copyOutput } from '../utils/copy';
import { saveMarkdown } from '../utils/save';
import { calculateStats } from '../utils/statistics';

interface HomeProps {
    openGlossary: () => void;
    openNormalization: () => void;
    openFailure: () => void;
}

export default function Home({ openGlossary, openNormalization, openFailure }: HomeProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    
    const [title, setTitle] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [elapsed, setElapsed] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState('');

    const canGenerate = title.trim() !== '' && input.trim() !== '';
    const canCopySave = output.trim() !== '';
    const canClear = title !== '' || input !== '' || output !== '';

    const stats = calculateStats(input);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handleClear = () => {
        const ok = window.confirm('Clear the current meeting?');

        if (!ok) return;

        setTitle('');
        setInput('');
        setOutput('');
        setElapsed(0);

        setTimeout(() => {
            titleRef.current?.focus();
        }, 10);
    };

    const handleGenerate = async () => {
        setLoading(true);

        try {
            const request = new types.GenerateRequest({
                title,
                notes: input,
            });
            const result = await generateMinutes(request);
        
            setOutput(result.output);
            setElapsed(result.elapsedMs);
        }
        catch (err) {
            toast.error(String(err));
        }
        finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!canCopySave) return;
        saveMarkdown(title, output);
    };

    const handleCopy = () => {
        if (!canCopySave) return;

        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            return; 
        }

        copyOutput(output);
    };

    // Ctrl + Enter (works inside textarea)
    useKeyboardShortcut('Enter', handleGenerate, {
        ctrl: true,
        allowWhileTyping: true,
    });

    // Ctrl + S (won't trigger while typing)
    useKeyboardShortcut('s', handleSave, {
        ctrl: true,
    });

    // Ctrl + C (Smart Copy)
    useKeyboardShortcut('c', handleCopy, {
        ctrl: true,
    });

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
                    openFailure={openFailure}
                />

                <div className="flex w-full items-stretch gap-6">
                    <div className="flex-1 space-y-4">
                        <MeetingTitle
                            ref={titleRef}
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
                        <SessionStats 
                            stats={stats} 
                            elapsed={elapsed} 
                            selectedModel={selectedModel}
                            onSelectModel={setSelectedModel}
                        />
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
