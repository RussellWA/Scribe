import TextareaAutosize from 'react-textarea-autosize';

interface EditorProps {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}

export default function Editor({ value, onChange, disabled }: EditorProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur">
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="font-medium text-zinc-100">Raw Notes</h2>
      </div>

      <TextareaAutosize
        minRows={3}
        maxRows={20}
        className="w-full resize-none overflow-hidden bg-transparent p-4 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
        placeholder="- Demo endpoint 
? Endpoint sekitar 1200 
+ Siapkan 3 server"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </section>
  );
}
