import type { SessionStat } from '../types/Statistics';
import VerticalDivider from './VerticalDivider';

interface SessionStatsProps {
  stats: SessionStat;
  model: string;
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

export default function SessionStats({ stats, model, elapsed }: SessionStatsProps) {
    return (
        <div className="flex justify-center items-center h-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
            <div className="flex justify-center items-center gap-8">
                <HorStat label="Characters" value={stats.characters} />
                <HorStat label="Words" value={stats.words} />
                <HorStat label="Lines" value={stats.lines} />

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

                <HorStat label="Model" value={model} />
                <HorStat
                    label="Time"
                    value={elapsed ? `${elapsed.toFixed(2)} ms` : '-'}
                />
            </div>
        </div>
    );
}
