import useUser from '@/lib/hooks/useUser';
import { AppDispatch, RootState } from '@/lib/store';
import { Page } from '@/types/ebook';
import { isNotNullOrUndefined } from '@/utils/common.utils';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type HeaderProps = {
  // onThemeChange: () => void;
  onNavToggle: () => void;
  height: number | null;
  onBookmarkToggle?: () => void;
  onAddBookmark?: () => void;
  onRemoveBookmark?: () => void;
  bookmarkButton?: JSX.Element;
  onStyleToggle?: () => void;
  onSelectToggle?: () => void;
  onLocationChange: (loc: string) => void;
};

/**
 * @name Header
 * @description EbookViewer Header
 * @param {number} height - header height (default: 40)
 * @returns {JSX.Element}
 */
export default function Header({
  height,
  onNavToggle,
  onBookmarkToggle,
  onAddBookmark,
  onRemoveBookmark,
  bookmarkButton,
  onStyleToggle,
  onSelectToggle,
  onLocationChange,
}: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useUser();
  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );

  const tieptuc = useCallback(
    (locCurrent: string) => {
      onLocationChange(locCurrent);
    },
    [onLocationChange],
  );
  // useEffect(() => {
  //   const token = user?.accessToken;
  //   token && dispatch(initBookReader({ token, id: 12 }));
  //   // console.log(token);
  // }, [status, user]);
  return (
    <div
      className="w-screen bg-gray-900 flex border-b border-gray-700"
      style={{ height: `${isNotNullOrUndefined(height) ? height : 40}px` }}
    >
      <div className="flex flex-row w-full justify-between text-white px-4 py-2">
        <div className="flex items-center justify-start">
          <button onClick={onNavToggle}>
            <img src="/svg/menu-white.svg" alt="menu" className="w-8 h-8" />
          </button>
        </div>
        <div className="justify-end pr-2 space-x-3 flex flex-row items-center">
          {currentLocation && (
            <button
              // onClick={() => tieptuc(`epubcfi(/6/12!/14/12/1:290)`)}
              onClick={() => tieptuc(currentLocation.startCfi)}
              children={`Tiep tuc doc`}
            />
          )}
          <button onClick={onSelectToggle} children={`Select`} />
          {bookmarkButton}
          <button onClick={onBookmarkToggle}>
            <img
              src="/svg/menu-list-white.svg"
              alt="menu"
              className="w-8 h-8"
            />
          </button>
          <button onClick={onStyleToggle}>
            <img
              src="/svg/setting-white.svg"
              alt="setting"
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
