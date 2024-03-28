import { RootState } from '@/lib/store';
import { updateBookmark } from '@/lib/store/ebook/ebookSlice';
import { BookmarkItem } from '@/types/ebook';
import { isCfiInRange, timeFormatter } from '@/utils/epub.utils';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/**
 * Hooks for bookmarking
 */
type Props = {
  onLocationChange: (location: string) => void;
  onTonggle: () => void;
};
/**
 * Bookmark hooks
 * @param onLocationChange
 * @returns
 * - bookmarks: BookmarkItem[]
 * - bookmarkItem: () => JSX.Element
 * - bookmarkButton: () => JSX.Element
 */
type useBookmark = {
  bookmarks: BookmarkItem[];
  bookmarkItem: () => JSX.Element;
  bookmarkButton: () => JSX.Element;
};

export default function useBookmark({
  onLocationChange,
  onTonggle,
}: Props): useBookmark {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.ebook.bookmarks);
  const currentLocation = useSelector(
    (state: RootState) => state.ebook.currentLocation,
  );

  const addBookmark = useCallback(
    (cfi: string) => {
      const bookmark: BookmarkItem = {
        key: Date.now(),
        name: 'Bookmark',
        cfi,
        time: timeFormatter(new Date()),
      };
      console.log('added bookmark', bookmark);
      dispatch(updateBookmark([...bookmarks, bookmark]));
    },
    [bookmarks, dispatch],
  );

  const removeBookmark = useCallback(
    (cfi: string) => {
      const bookmarksFilter = bookmarks.filter(
        (bookmark) => bookmark.cfi !== cfi,
      );
      dispatch(updateBookmark(bookmarksFilter));
    },
    [bookmarks],
  );

  const goToBookmark = useCallback(
    (bookmark: BookmarkItem) => {
      onTonggle();
      const cfi = bookmark.cfi;
      onLocationChange(cfi);
    },
    [onLocationChange],
  );

  const onAddBookmark = useCallback(() => {
    if (currentLocation.startCfi === '') return;
    addBookmark(currentLocation.startCfi);
  }, [currentLocation, bookmarks, addBookmark]);
  
  const onRemoveBookmark = useCallback(() => {
    removeBookmark(currentLocation.startCfi);
  }, [currentLocation, bookmarks, removeBookmark]);

  const isBookmarkAdded = useMemo(
    () =>
      bookmarks.find((bookmark) =>
        isCfiInRange(
          bookmark.cfi,
          currentLocation.startCfi,
          currentLocation.endCfi,
        ),
      ),
    [bookmarks, currentLocation],
  );

  const bookmarkItem = useCallback(() => {
    return (
      <div className="flex flex-col space-y-4 text-gray-300 bg-gray-900 p-5 rounded-lg">
        <div className="font-bold text-white">
          <span>Bookmarks</span>
        </div>
        {bookmarks &&
          bookmarks.map((item) => (
            <div
              className="w-full p-4 flex flex-row justify-between items-center text-left bg-gray-800 rounded-md shadow-md"
              key={item.key}
            >
              <button className="flex-grow" onClick={() => goToBookmark(item)}>
                <div>
                  <div className="text-gray-200">{item.name}</div>
                  <div className="text-gray-400">{item.time}</div>
                </div>
              </button>
              <button onClick={() => removeBookmark(item.cfi)}>
                <img
                  src="/svg/close.svg"
                  className="text-gray-500"
                  height={22}
                  width={22}
                />
              </button>
            </div>
          ))}
      </div>
    );
  }, [dispatch, bookmarks, goToBookmark]);

  const bookmarkButton = useCallback(() => {
    return (
      <div className="flex flex-row space-x-5 justify-end items-center pr-3">
        {!isBookmarkAdded ? (
          <button
            className="h-max items-center justify-between"
            onClick={onAddBookmark}
          >
            <img
              src="/svg/bookmark-white.svg"
              alt="menu"
              width={22}
              height={22}
              className="text-gray-300"
            />
          </button>
        ) : (
          <button
            className="h-max items-center justify-between"
            onClick={onRemoveBookmark}
          >
            <img
              src="/svg/bookmark-added.svg"
              alt="menu"
              width={22}
              height={22}
              className="text-gray-300"
            />
          </button>
        )}
      </div>
    );
  }, [bookmarks, dispatch, onAddBookmark, removeBookmark]);

  return {
    bookmarks,
    bookmarkItem,
    bookmarkButton,
  };
}
