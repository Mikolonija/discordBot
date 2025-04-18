import { useEffect, useCallback } from 'react';

export const useOutsideClickAndEscape = (
  callback: () => void,
  enabled: boolean,
  modalRef: React.RefObject<HTMLDivElement | null>,
) => {
  const handleGlobalClick = useCallback(
    (event: MouseEvent) => {
      if (enabled && !event.defaultPrevented) {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          callback();
        }
      }
    },
    [callback, enabled, modalRef],
  );

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (enabled && event.key === 'Escape' && !event.defaultPrevented) {
        callback();
      }
    },
    [callback, enabled],
  );

  useEffect(() => {
    if (enabled) {
      document.addEventListener('mousedown', handleGlobalClick);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [enabled, handleGlobalClick, handleEscapeKey]);
};
