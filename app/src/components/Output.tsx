import TextareaAutosize from 'react-textarea-autosize';

interface OutputProps {
  value: string;
}

export default function Output({ value }: OutputProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="font-medium text-zinc-100">Generated Minutes</h2>
      </div>

      <TextareaAutosize
        readOnly
        value={value}
        className="w-full resize-none overflow-hidden bg-transparent p-4 text-sm leading-7 text-zinc-200 font-mono outline-none placeholder:text-zinc-500"
        placeholder="Your generated meeting minutes will appear here..."
      />
    </section>
  );
}
