import { AppDispatch, RootState } from '@/lib/store';
import {
  Highlight,
  setHighlight,
  updateHighLight,
} from '@/lib/store/ebook/ebookSlice';
import Book from '@/types/book';
import { Color, Page, ViewerRef } from '@/types/ebook';
import { cfiRangeSpliter, compareCfi, timeFormatter } from '@/utils/epub.utils';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUser from '../useUser';
type Props = {
  viewerRef: React.RefObject<ViewerRef>;
  onOpen: () => void;
  onLocationChange: (cfi: string) => void;
  book: Book;
};
type Mark = {
  cfiRange: string;
  text: string;
};
type Selection = {
  cfiRange: string;
  content: string;
  color?: string;
  // paragraphCfi: string;
};

export default function useContextMenu({
  viewerRef,
  onOpen,
  onLocationChange,
  book,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );
  const highlights = useSelector<RootState, Highlight[]>(
    (state: RootState) => state.ebook.highLights,
  );
  const color = useSelector<RootState, Color[]>(
    (state: RootState) => state.ebook.color,
  );

  const [selection, setSelection] = useState<Highlight>();

  const { user } = useUser();

  const onSelection = useCallback(
    (cfiRange: string) => {
      if (!viewerRef.current) return false;

      const iframe = viewerRef.current.querySelector('iframe');
      if (!iframe) return false;

      const iframeWin = iframe.contentWindow;
      if (!iframeWin) return false;

      const content = iframeWin.getSelection()!.toString().trim();
      console.log(content, currentLocation);
      onOpen();

      setSelection({
        key: Date.now(),
        cfiRange,
        content,
        createAt: timeFormatter(new Date()),
        chapterName: currentLocation.chapterName,
        pageNum: currentLocation.currentPage,
        // note: '',
      });
      console.log('ls', highlights);
    },
    [viewerRef, highlights, selection, currentLocation, onOpen],
  );

  const onHighlight = useCallback(
    (color: Color) => {
      if (!viewerRef.current) return;
      if (!selection) return;
      const newSelection = {
        ...selection,
        color: color.code,
      };
      setSelection(newSelection);
      const isSelectInHighlight = highlights.find(
        (item) => item.key === selection.key,
      );
      if (isSelectInHighlight) {
        // If the selection is already in the highlights array, update it
        const updatedHighlights = highlights.map((highlight) =>
          highlight.key === selection.key ? newSelection : highlight,
        );
        dispatch(updateHighLight(updatedHighlights));
        const token = user?.accessToken;
        console.log(token);
        token && dispatch(setHighlight({ token, id: book.id }));
      } else {
        // If the selection is not in the highlights array, add it
        dispatch(updateHighLight([...highlights, newSelection]));
        const token = user?.accessToken;
        token && dispatch(setHighlight({ token, id: book.id }));
      }
    },
    [
      viewerRef,
      highlights,
      selection,
      setSelection,
      dispatch,
      currentLocation,
      user,
    ],
  );

  const gotoHighlight = useCallback(
    (selection: Highlight) => {
      const startCfi = cfiRangeSpliter(selection.cfiRange)?.startCfi;
      if (!startCfi) return;
      onLocationChange(startCfi);
    },
    [viewerRef, onLocationChange, highlights],
  );

  const onRemoveHighlight = useCallback(
    (highlight: Highlight) => {
      if (!viewerRef.current) return;
      const newHighlights = highlights.filter(
        (item) => item.key !== highlight.key,
      );
      dispatch(updateHighLight(newHighlights));
      viewerRef.current.offHighlight(highlight.cfiRange);
      setSelection(undefined);
    },
    [viewerRef, highlights, dispatch],
  );

  const onHighlightClick = useCallback(
    (highlight: Highlight) => {
      // onSelection(highlight.cfiRange);
      onOpen();
      setSelection(highlight);
      // selection && setSelection({ ...selection, content: highlight.content });
    },
    [viewerRef, selection, highlights, currentLocation, onOpen],
  );
  const contextItem = useCallback(() => {
    if (!selection) return null;
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold mb-2">HighLight</span>
          <div className="flex flex-col space-y-2 justify-center mb-4 w-4/5">
            {color.map((item) => (
              <div
                key={item.name}
                className="cursor-pointer w-full text-center rounded text-black"
                style={{ backgroundColor: item.code }}
                onClick={() => {
                  console.log(selection);
                  onHighlight(item);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="w-full rounded border">
            <div className="p-2" style={{ color: selection?.color }}>
              "{selection.content?.substring(0, 100) + '...'}"
            </div>
          </div>
          {highlights.find((item) => item.key === selection?.key) && (
            <div className="flex flex-col space-y-10">
              <button
                className="w-full bg-red-500 text-white p-2 rounded mb-5"
                onClick={() => {
                  onRemoveHighlight(selection);
                }}
              >
                Remove
              </button>
              {/* <Textarea
                className="mt-5 text-white"
                // variant="static"
                // placeholder="Ghi chú"
                id="note"
                label="Ghi chú"
                value={selection.note}
                onChange={handleChange}
                success
              /> */}
            </div>
          )}
        </div>
      </div>
    );
  }, [
    viewerRef,
    onOpen,
    onSelection,
    selection,
    onHighlight,
    // onUpdateHighlight,
    // handleChange,
  ]);

  const listHighLight = useCallback(() => {
    return (
      <div className="flex flex-col space-y-3 w-full">
        <span>HighLight</span>
        <div className="space-y-4 w-full self-center items-center">
          {highlights.map((item) => (
            <HighlightItem
              key={item.key}
              item={item}
              onHighlightClick={() => gotoHighlight(item)}
            />
          ))}
        </div>
      </div>
    );
  }, [
    viewerRef,
    onSelection,
    highlights,
    currentLocation,
    selection,
    // handleChange,
  ]);

  useEffect(() => {
    if (!viewerRef.current) return;
    const iframe = viewerRef.current!.querySelector('iframe');
    if (!iframe) return;

    const iframeWin = iframe.contentWindow;
    if (!iframeWin) return;

    highlights.forEach((item) => {
      const cfiRange = cfiRangeSpliter(item.cfiRange);
      if (!cfiRange) return;
      const { startCfi } = cfiRange;
      if (
        compareCfi(currentLocation.startCfi, startCfi) < 1 &&
        compareCfi(currentLocation.endCfi, startCfi) > -1
      ) {
        viewerRef.current?.onHighlight(
          item.cfiRange,
          (e: any) => {
            onHighlightClick(item);
          },
          item.color,
        );
        iframeWin.getSelection()!.removeAllRanges();
      }
    });
  }, [
    dispatch,
    viewerRef,
    currentLocation,
    highlights,
    selection,
    onHighlight,
    onRemoveHighlight,
    onSelection,
    onOpen,
    contextItem,
  ]);

  return {
    onSelection,
    contextItem,
    listHighLight,
  };
}

const HighlightItem = ({ item, onHighlightClick }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayContent = isExpanded ? item.content : item.content.slice(0, 100);

  return (
    <div
      key={item.cfiRange}
      className="cursor-pointer w-5/6 mx-auto text-center rounded-lg shadow-lg p-4 mb-4 bg-black "
    >
      <div className="text-gray-500 mb-2 text-left">
        <div>Chapter: {item.chpaterName}</div>
        <div>Page: {item.pageNum}</div>
      </div>
      <div
        onClick={() => {
          console.log(item);
          onHighlightClick(item);
        }}
        className="font-semibold text-sm text-left"
        style={{ color: item.color }}
      >
        "{displayContent} ..."
      </div>
      {item.content.length > 100 && (
        <button
          className="mt-2 text-blue-500 hover:text-blue-700 text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
      {/* {item.note && ( */}
      {/* <div className="mt-2 text-gray-500 text-sm text-left">
        Note: {item.note}
      </div> */}
      {/* )} */}
      <div className="text-gray-500 text-xs text-left">{item.createAt}</div>
    </div>
  );
};
