import { RootState } from '@/lib/store';
import {
  updateBookOption,
  updateCurrentTheme,
} from '@/lib/store/ebook/ebookSlice';
import {
  BookOption,
  BookStyle,
  ViewType,
  ViewerLayout,
  ViewerRef,
} from '@/types/ebook';
import { Switch } from '@material-tailwind/react';
import { RefObject, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {
  viewerRef: RefObject<ViewerRef> | any;
};
type useBookStyle = {
  theme: string;
  // setTheme: (theme: string) => void;
  isDarkMode: boolean;
  bookStyle: BookStyle;
  // setBookStyle: (style: BookStyle) => void;
  bookOption: BookOption;
  // setBookOption: (option: BookOption) => void;
  viewerLayout: ViewerLayout;
  // setViewerLayout: (layout: ViewerLayout) => void;
  styleItem: () => JSX.Element;
};
/**
 * hooks này sinh ra với mục đích quản lý style, theme, layout của ebook
 * @param viewerRef RefObject<ViewerRef>
 * @returns
 */
export default function useBookStyle({ viewerRef }: Props): useBookStyle {
  const dispatch = useDispatch();
  const theme = useSelector<RootState, string>(
    (state: RootState) => state.ebook.theme,
  );
  const bookOption = useSelector<RootState, BookOption>(
    (state: RootState) => state.ebook.bookOption,
  );
  const bookStyle = useSelector<RootState, BookStyle>(
    (state: RootState) => state.ebook.bookStyle,
  );
  const viewerLayout = useSelector<RootState, ViewerLayout>(
    (state: RootState) => state.ebook.viewerLayout,
  );
  // const [theme, setTheme] = useState<string>('/themes/dark.theme.css');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(true);
  const [viewType, setViewType] = useState<ViewType>({
    active: true,
    spread: true,
  });

  const onThemeChange = useCallback(
    (type: 'dark' | 'light') => {
      // setTheme(`/themes/${type}.theme.css`);
      dispatch(updateCurrentTheme(`/themes/${type}.theme.css`));
      setIsDarkMode(type === 'dark');
    },
    [theme, dispatch, viewerRef],
  );

  const onDirection = useCallback(
    (type: 'Horizontal' | 'Vertical') => {
      if (type === 'Horizontal') {
        setIsScrollHorizontal(true);
        setViewType({ ...viewType, active: true });
        // setBookOption({ ...bookOption, flow: 'paginated' });
        dispatch(updateBookOption({ ...bookOption, flow: 'paginated' }));
      } else {
        setIsScrollHorizontal(false);
        setViewType({ ...viewType, active: false });
        // setBookOption({ ...bookOption, flow: 'scrolled-doc' });
        dispatch(updateBookOption({ ...bookOption, flow: 'scrolled-doc' }));
      }
    },
    [bookOption, viewType, isScrollHorizontal, viewerRef],
  );

  const onViewType = useCallback(
    (isSpread: boolean) => {
      if (isSpread) {
        setViewType({ ...viewType, spread: true });
        // setBookOption({ ...bookOption, spread: 'auto' });
        dispatch(updateBookOption({ ...bookOption, spread: 'auto' }));
      } else {
        setViewType({ ...viewType, spread: false });
        // setBookOption({ ...bookOption, spread: 'none' });
        dispatch(updateBookOption({ ...bookOption, spread: 'none' }));
      }
    },
    [bookOption, viewType, viewerRef],
  );
  const styleItem = useCallback(() => {
    return (
      <div className="text-gray-300 p-5 bg-gray-900 rounded shadow-lg">
        <h2 className="font-bold text-2xl mb-4 text-white">Style Setting</h2>
        <div className="flex items-center space-x-4 mb-4">
          <span className="font-semibold">Sáng</span>
          <Switch
            color="purple"
            className=""
            crossOrigin={null}
            checked={isDarkMode}
            onChange={() => {
              onThemeChange(isDarkMode ? 'light' : 'dark');
            }}
          />
          <span className="font-semibold">Tối</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <span className="font-semibold">Dọc</span>
          <Switch
            color="purple"
            className=""
            crossOrigin={null}
            checked={isScrollHorizontal}
            onChange={() => {
              onDirection(isScrollHorizontal ? 'Vertical' : 'Horizontal');
            }}
          />
          <span className="font-semibold">Ngang</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Không chia trang</span>
          <Switch
            color="purple"
            className=""
            crossOrigin={null}
            checked={viewType.spread}
            disabled={!viewType.active}
            onChange={() => {
              onViewType(!viewType.spread);
            }}
          />
          <span className="font-semibold">Chia Trang</span>
        </div>
      </div>
    );
  }, [viewerRef, theme, bookStyle, bookOption, viewerLayout]);

  return {
    theme,
    // setTheme,
    // onThemeChange,
    isDarkMode,
    bookStyle,
    // setBookStyle,
    bookOption,
    // setBookOption,
    viewerLayout,
    // setViewerLayout,
    styleItem,
  };
}
