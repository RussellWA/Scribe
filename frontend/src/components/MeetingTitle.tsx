import { forwardRef } from 'react';

interface MeetingTitleProps {
    value: string;
    onChange: (v: string) => void;
    disabled: boolean;
}

const MeetingTitle = forwardRef<HTMLInputElement, MeetingTitleProps>(
    ({ value, onChange, disabled }, ref) => {
        return (
            <div>
                <input
                    ref={ref}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 font-mono outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tokopedia - GTB Demo"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                />
            </div>
        );
    }
);

MeetingTitle.displayName = 'MeetingTitle';

export default MeetingTitle;