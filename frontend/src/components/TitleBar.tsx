import { useEffect, useState } from "react";
import {
    WindowMinimise,
    WindowToggleMaximise,
    Quit,
} from "../../wailsjs/runtime/runtime";
// import scribeLogo from "../assets/logo.svg";
import scribeLogo from "../assets/appicon.png";

export default function TitleBar() {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toLowerCase().includes("mac"));
    }, []);

    return (
        <div
            className="h-10 w-full flex items-center select-none"
            style={{ "--wails-draggable": "drag" } as React.CSSProperties}
        >
            {isMac && (
                <div className="flex items-center gap-2 px-4">
                    <button
                        onClick={Quit}
                        className="w-3 h-3 rounded-full bg-red-500 hover:brightness-90"
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Close"
                    />

                    <button
                        onClick={WindowMinimise}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-90"
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Minimize"
                    />

                    <button
                        onClick={WindowToggleMaximise}
                        className="w-3 h-3 rounded-full bg-green-500 hover:brightness-90"
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Maximize"
                    />
                </div>
            )}

            <div className="flex-1 flex items-center justify-center">
                <img
                    src={scribeLogo}
                    alt="Scribe"
                    className="h-5 w-auto object-contain"
                />
            </div>

            {/* Windows controls */}
            {!isMac && (
                <div className="flex items-center h-full">
                    <button
                        onClick={WindowMinimise}
                        className="h-full w-12 hover:bg-black/5 dark:hover:bg-white/10"
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Minimize"
                    >
                        -
                    </button>

                    <button
                        onClick={WindowToggleMaximise}
                        className="h-full w-12 hover:bg-black/5 dark:hover:bg-white/10"
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Maximize"
                    >
                        □
                    </button>

                    <button
                        onClick={Quit}
                        className="h-full w-12 hover:bg-red-500 hover:text-white"
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Close"
                    >
                        x
                    </button>
                </div>
            )}
        </div>
    );
}
