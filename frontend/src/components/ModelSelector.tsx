import { useState, useEffect } from 'react';
import { FetchInstalledModels } from '../../wailsjs/go/service/OllamaService';

export function ModelSelector({ selectedModel, onSelectModel }: { 
    selectedModel: string; 
    onSelectModel: (model: string) => void; 
}) {
    const [models, setModels] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        FetchInstalledModels()
            .then((installedModels: string[]) => {
                if (installedModels && installedModels.length > 0) {
                    setModels(installedModels);
                    if (!selectedModel || !installedModels.includes(selectedModel)) {
                        onSelectModel(installedModels[0]);
                    }
                }
            })
            .catch((err: unknown) => {
                console.warn("Failed to load models from Ollama:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <span className="text-xs text-zinc-500 font-mono">Loading models...</span>;
    }

    if (models.length === 0) {
        return (
            <input
                type="text"
                value={selectedModel}
                onChange={(e) => onSelectModel(e.target.value)}
                placeholder="e.g. qwen3:8b"
                className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100 font-mono outline-none focus:border-blue-500"
            />
        );
    }

    return (
        <select
            value={selectedModel}
            onChange={(e) => onSelectModel(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100 font-mono outline-none focus:border-blue-500 cursor-pointer"
        >
            {models.map((m) => (
                <option key={m} value={m}>
                    {m}
                </option>
            ))}
        </select>
    );
}