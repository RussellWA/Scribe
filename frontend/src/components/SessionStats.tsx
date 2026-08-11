import type { SessionStat } from '../types/Statistics';
import { ModelSelector } from './ModelSelector';
import VerticalDivider from './VerticalDivider';

interface SessionStatsProps {
    stats: SessionStat;
    selectedModel: string;
    onSelectModel: (model: string) => void;
    elapsed?: number;
}

function HorStat({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-zinc-500">
                {label}
            </span>

            <span className="text-lg font-semibold text-white">{value}</span>
        </div>
    );
}

function VertStat({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-zinc-500">
                {label}
            </span>

            <span className="text-lg font-semibold text-white">{value}</span>
        </div>
    );
}

export default function SessionStats({ stats, elapsed, selectedModel, onSelectModel }: SessionStatsProps) {
    return (
        <div className="flex justify-center items-center h-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
            <div className="flex justify-center items-center gap-8">
                {/* <HorStat label="Characters" value={stats.characters} /> */}
                <HorStat label="Words" value={stats.words} />
                {/* <HorStat label="Lines" value={stats.lines} /> */}

                <VerticalDivider />

                <div>
                    <VertStat label="Meeting Notes" value={stats.meetingNotes} />
                    <VertStat label="Need Confirmation" value={stats.confirmations} />
                </div>

                <div>
                    <VertStat label="Next Plan" value={stats.actions} />
                    <VertStat label="Unrecognized Lines" value={stats.unrecognized} />
                </div>

                <VerticalDivider />

                <HorStat 
                    label="Model" 
                    value={
                        <ModelSelector 
                            selectedModel={selectedModel} 
                            onSelectModel={onSelectModel} 
                        />
                    } 
                />
                <HorStat
                    label="Time"
                    value={elapsed ? `${(elapsed / 1000).toFixed(2)} s` : '-'}
                />
            </div>
        </div>
    );
}
