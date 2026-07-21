import { useEffect } from 'react';

interface ShortcutOptions {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  allowWhileTyping?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: ShortcutOptions = {}
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the user is typing
      const target = event.target as HTMLElement;

      const isTyping =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (isTyping && !options.allowWhileTyping) {
        return;
      }

      // Check shortcut
      if (
        event.key.toLowerCase() !== key.toLowerCase() ||
        !!options.ctrl !== event.ctrlKey ||
        !!options.shift !== event.shiftKey ||
        !!options.alt !== event.altKey
      ) {
        return;
      }

      event.preventDefault();
      callback();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback, options.ctrl, options.shift, options.alt]);
}
