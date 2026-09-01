import { useEffect, useState } from "react";
import {
    WindowMinimise,
    WindowToggleMaximise,
    Quit,
    WindowIsMaximised,
} from "../../wailsjs/runtime/runtime";
// import scribeLogo from "../assets/logo.svg";
import scribeLogo from "../assets/appicon.png";

export default function TitleBar() {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(navigator.platform.toLowerCase().includes("mac"));
    }, []);

    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        WindowIsMaximised().then(setIsMaximized);
    }, []);

    return (
        <div
            className="relative h-10 w-full flex items-center select-none"
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

           <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
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
                        className="
                            h-full w-12
                            flex items-center justify-center
                            text-gray-400
                            hover:text-gray-700
                            hover:bg-gray-100
                            transition-colors
                        "
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Minimize"
                    >
                        −
                    </button>

                    <button
                        onClick={async () => {
                            await WindowToggleMaximise();
                            setIsMaximized(await WindowIsMaximised());
                        }}
                        className="
                            h-full w-12
                            flex items-center justify-center
                            text-gray-400
                            hover:text-gray-700
                            hover:bg-gray-100
                            transition-colors
                        "
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label={isMaximized ? "Restore" : "Maximize"}
                    >
                        {isMaximized ? "🗗" : "□"}
                    </button>

                    <button
                        onClick={Quit}
                        className="
                            h-full w-12
                            flex items-center justify-center
                            text-gray-400
                            hover:text-white
                            hover:bg-red-500
                            transition-colors
                        "
                        style={{ "--wails-draggable": "no-drag" } as React.CSSProperties}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}
