import { RootState } from '@/lib/store';
import { Highlight, Page, ViewerRef } from '@/types/ebook';
import { Contents } from 'epubjs';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  viewerRef: React.RefObject<ViewerRef>;
  onOpen: () => void;
};
type Mark = {
  cfiRange: string;
  text: string;
};
export default function useContextMenu({ viewerRef, onOpen }: Props) {
  const dispatch = useDispatch();
  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );
  const highlights = useSelector<RootState, Highlight[]>(
    (state: RootState) => state.ebook.highLight,
  );
  const marks: Mark[] = [];
  const [selection, setSelection] = useState<any>(null);

  const onSelection = useCallback(
    (cfiRange: string, content: Contents) => {
      onOpen();
      setSelection(content);
      // marks.push(mark);
      console.log('marks', marks);
    },

    [viewerRef],
  );
  const contextItem = useCallback(() => {
    return (
      <div>
        <div>
          {marks.map((mark, index) => (
            <div key={index}>
              <p>{mark.cfiRange}</p>
              <p>{mark.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }, [viewerRef, onOpen,onSelection]);

  return {
    onSelection,
    contextItem,
  };
}
