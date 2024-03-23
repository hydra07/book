import { useCallback, useEffect, useState } from 'react';
export type MenuControl = {
  display: boolean;
  open: boolean;
};
export default function useMenu(ref: { current: any }, delay: number) {
  const [eventSignal, setEventSignal] = useState(false);
  const [control, setControl] = useState<MenuControl>({
    display: false,
    open: false,
  });

  const onToggle = useCallback(() => {
    let event: any = null;
    window.clearTimeout(event);
    if (!control.display) {
      setControl({ display: true, open: false });
      event = window.setTimeout(
        () => setControl({ display: true, open: true }),
        0,
      );
    } else {
      setControl({ display: true, open: false });
      event = window.setTimeout(
        () => setControl({ display: false, open: false }),
        delay - 50,
      );
    }
  }, [control.display, delay]);

  const onClose = useCallback(
    (e: any) => {
      if (!ref || !ref.current) return;
      if (!e.path.includes(ref.current)) {
        onToggle();
      }
    },
    [ref, onToggle],
  );

  const emitEvent = useCallback(() => {
    window.setTimeout(() => setEventSignal(true), 300);
  }, [setEventSignal]);

  useEffect(() => {
    if (!eventSignal && !control.display) return;

    const epubIframe = document.querySelector('iframe');

    if (control.display) {
      document.addEventListener('click', onClose);
      if (epubIframe && epubIframe.contentWindow) {
        epubIframe.contentWindow.document.addEventListener('click', onClose);
      }
    } else {
      document.removeEventListener('click', onClose);
      if (epubIframe && epubIframe.contentWindow) {
        epubIframe.contentWindow.document.removeEventListener('click', onClose);
      }
    }

    setEventSignal(false);

    return () => {
      document.removeEventListener('click', onClose);
      if (epubIframe && epubIframe.contentWindow) {
        epubIframe.contentWindow.document.removeEventListener('click', onClose);
      }
    };
  }, [control.display, onClose, eventSignal]);

  return [control, onToggle, emitEvent] as const;
}
