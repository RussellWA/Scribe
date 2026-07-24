interface LegendItemProps {
  symbol: string;
  label: string;
}

export default function LegendItem({ symbol, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1">
      <span className="font-mono font-bold text-blue-400">{symbol}</span>

      <span className="text-sm text-zinc-300">{label}</span>
    </div>
  );
}
