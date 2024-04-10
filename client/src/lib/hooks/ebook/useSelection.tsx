import { AppDispatch, RootState } from '@/lib/store';
import { Highlight, updateHighLight } from '@/lib/store/ebook/ebookSlice';
import { Color, Page, ViewerRef } from '@/types/ebook';
import { cfiRangeSpliter, compareCfi, timeFormatter } from '@/utils/epub.utils';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {
  viewerRef: React.RefObject<ViewerRef>;
  onOpen: () => void;
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

export default function useContextMenu({ viewerRef, onOpen }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );
  const highlights = useSelector<RootState, Highlight[]>(
    (state: RootState) => state.ebook.highLight,
  );
  const color = useSelector<RootState, Color[]>(
    (state: RootState) => state.ebook.color,
  );
  // const marks: Mark[] = [];
  // const [ls, setLs] = useState<Selection[]>([]);
  const [selection, setSelection] = useState<Highlight>();

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
      // const paragraphCfi = getParagraphCfi(cfiRange);
      // const item: Selection = {
      //   cfiRange,
      //   content: _content,
      // };
      setSelection({
        key: Date.now(),
        cfiRange,
        content,
        createAt: timeFormatter(new Date()),
        chpaterName: currentLocation.chapterName,
        pageNum: currentLocation.currentPage,
      });
      // console.log('item', item);
      // setLs([...ls, item]);
      console.log('ls', highlights);
    },

    [viewerRef, highlights, selection, currentLocation],
  );

  const onHighlight = useCallback(
    (color: Color) => {
      if (!selection) return;
      const newSelection = {
        ...selection,
        color: color.code,
      };
      setSelection(newSelection);
      dispatch(updateHighLight([...highlights, newSelection]));
      // setSelection(null);
      return () => {
        setSelection(undefined);
      };
      // if (selection.color) {
      //   setLs([...ls, selection]);
      // }
    },
    [viewerRef, highlights, selection, dispatch, currentLocation],
  );

  const contextItem = useCallback(() => {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold mb-2">HighLight</span>
          <div className="flex flex-col space-y-2 justify-center mb-4 w-4/5">
            {color.map((item) => (
              <div
                key={item.name}
                className="cursor-pointer w-full text-center rounded "
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

          <div className="w-full">
            <div style={{ color: selection?.color }}>
              {selection?.content?.substring(0, 100) + '...'}
            </div>
          </div>
        </div>
      </div>
    );
  }, [viewerRef, onOpen, onSelection, selection, onHighlight]);

  const listHighLight = useCallback(() => {
    return (
      <div className="flex flex-col space-y-3 w-full">
        <span>HighLight</span>
        <div className="space-y-4 w-full self-center items-center">
          {highlights.map((item) => (
            <HighlightItem
              key={item.cfiRange}
              item={item}
              onHighlightClick={onHighlightClick}
            />
          ))}
        </div>
      </div>
    );
  }, [viewerRef, onSelection, highlights, currentLocation]);
  const onHighlightClick = useCallback(
    (highlight: Highlight) => {
      onSelection(highlight.cfiRange);
      selection && setSelection({ ...selection, content: highlight.content });
    },
    [viewerRef, selection, highlights, currentLocation],
  );

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
      }
    });
  }, [
    dispatch,
    viewerRef,
    currentLocation,
    highlights,
    selection,
    onHighlight,
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
        "{displayContent}"
      </div>
      {item.content.length > 100 && (
        <button
          className="mt-2 text-blue-500 hover:text-blue-700 text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
      <div className="text-gray-500 text-xs text-left">{item.createAt}</div>
    </div>
  );
};
