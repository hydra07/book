import { RootState } from '@/lib/store';
import { Highlight, Page, ViewerRef } from '@/types/ebook';
import { clashCfiRange } from '@/utils/epub.utils';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {
  viewerRef: React.RefObject<ViewerRef>;
};

export default function useContextMenu({ viewerRef }: Props) {
  const dispatch = useDispatch();
  const highlights = useSelector<RootState, Highlight[]>(
    (state: RootState) => state.ebook.highLight,
  );
  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );

  const onSelection = useCallback(
    (cfiRange: string) => {
      if (!viewerRef.current) return false;

      const iframe = viewerRef.current.querySelector('iframe');
      if (!iframe) return false;

      const iframeWin = iframe.contentWindow;
      if (!iframeWin) return false;

      const filtered = highlights.filter((highlight) =>
        clashCfiRange(highlight.cfiRange, cfiRange),
      );

      if (filtered.length > 0) {
        iframeWin.getSelection()?.removeAllRanges();
        return false;
      }
    },
    [viewerRef],
  );

  useEffect(() => {
    if (!viewerRef.current) return;

    const iframe = viewerRef.current.querySelector('iframe');
    if (!iframe) return;
  }, []);

  return {
    onSelection,
  };
}
