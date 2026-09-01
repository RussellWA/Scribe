import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";

interface CustomScrollProps {
    children: ReactNode;
    className?: string;
}

export default function CustomScroll({ children, className = "" }: CustomScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);
    const [dragging, setDragging] = useState(false);
    const dragStartY = useRef(0);
    const dragStartScrollTop = useRef(0);

    const updateThumb = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;
        if (scrollHeight <= clientHeight) {
            setThumbHeight(0);
            return;
        }

        const ratio = clientHeight / scrollHeight;
        const newThumbHeight = Math.max(ratio * clientHeight, 24); // 24px min thumb size
        const maxThumbTop = clientHeight - newThumbHeight;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);

        setThumbHeight(newThumbHeight);
        setThumbTop(scrollRatio * maxThumbTop);
    }, []);

    useEffect(() => {
        updateThumb();
        const el = containerRef.current;
        if (!el) return;

        const ro = new ResizeObserver(updateThumb);
        ro.observe(el);

        el.addEventListener("scroll", updateThumb);
        return () => {
            el.removeEventListener("scroll", updateThumb);
            ro.disconnect();
        };
    }, [updateThumb]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
        dragStartY.current = e.clientY;
        dragStartScrollTop.current = containerRef.current?.scrollTop ?? 0;
    };

    useEffect(() => {
        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const el = containerRef.current;
            if (!el) return;

            const { scrollHeight, clientHeight } = el;
            const deltaY = e.clientY - dragStartY.current;
            const scrollableDist = scrollHeight - clientHeight;
            const trackDist = clientHeight - thumbHeight;

            el.scrollTop =
                dragStartScrollTop.current + (deltaY / trackDist) * scrollableDist;
        };

        const handleMouseUp = () => setDragging(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, thumbHeight]);

    return (
        <div className="relative h-full">
            <div
                ref={containerRef}
                className={`h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none ${className}`}
            >
                {children}
            </div>

            {thumbHeight > 0 && (
                <div className="absolute top-0 right-0 h-full w-2 pointer-events-none">
                    <div
                        onMouseDown={handleThumbMouseDown}
                        className={`absolute right-0 w-1.5 rounded-full pointer-events-auto cursor-pointer transition-colors ${
                            dragging ? "bg-gray-500" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        style={{
                            height: `${thumbHeight}px`,
                            top: `${thumbTop}px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}