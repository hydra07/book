import { RootState } from '@/lib/store';
import { updateCurrentTheme } from '@/lib/store/ebook/ebookSlice';
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
  bookStyle: BookStyle;
  setBookStyle: (style: BookStyle) => void;
  bookOption: BookOption;
  setBookOption: (option: BookOption) => void;
  viewerLayout: ViewerLayout;
  setViewerLayout: (layout: ViewerLayout) => void;
  styleItem: () => JSX.Element;
};
/**
 * hooks này sinh ra với mục đích quản lý style, theme, layout của ebook
 * @param viewerRef RefObject<ViewerRef>
 * @returns
 */
export default function useBookStyle({ viewerRef }: Props): useBookStyle {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.ebook.theme);
  const [theme, setTheme] = useState<string>('/themes/dark.theme.css');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(true);
  const [viewType, setViewType] = useState<ViewType>({
    active: true,
    spread: true,
  });

  const [bookStyle, setBookStyle] = useState<BookStyle>({
    fontFamily: 'Origin',
    fontSize: 22,
    lineHeight: 1.4,
    marginHorizontal: 13,
    marginVertical: 7,
  });
  const [bookOption, setBookOption] = useState<BookOption>({
    flow: 'paginated',
    resizeOnOrientationChange: true,
    spread: 'auto',
  });
  const [viewerLayout, setViewerLayout] = useState<ViewerLayout>({
    MIN_VIEWER_WIDTH: 600,
    MIN_VIEWER_HEIGHT: 300,
    VIEWER_HEADER_HEIGHT: 40,
    VIEWER_FOOTER_HEIGHT: 40,
    VIEWER_SIDEMENU_WIDTH: 0,
  });

  // const onThemeChange = useCallback(() => {
  //   setTheme((prev) =>
  //     prev === '/themes/dark.theme.css'
  //       ? '/themes/light.theme.css'
  //       : '/themes/dark.theme.css',
  //   );
  //   dispatch(updateCurrentTheme(theme));
  //   console.log('theme', currentTheme);
  // }, [viewerRef]);
  // const onBookOptionChange = useCallback(() => {
  //   setBookOption((prev) => {
  //     return { ...prev, flow: 'scrolled-doc' };
  //   });
  //   console.log(bookOption);
  // }, [bookOption, viewerRef]);
  const onThemeChange = useCallback(
    (type: 'dark' | 'light') => {
      setTheme(`/themes/${type}.theme.css`);
      setIsDarkMode(type === 'dark');
      dispatch(updateCurrentTheme(theme));
    },
    [theme, dispatch, viewerRef],
  );

  const onDirection = useCallback(
    (type: 'Horizontal' | 'Vertical') => {
      if (type === 'Horizontal') {
        setIsScrollHorizontal(true);
        setViewType({ ...viewType, active: true });
        setBookOption({ ...bookOption, flow: 'paginated' });
      } else {
        setIsScrollHorizontal(false);
        setViewType({ ...viewType, active: false });
        setBookOption({ ...bookOption, flow: 'scrolled-doc' });
      }
    },
    [bookOption, viewType, isScrollHorizontal, viewerRef],
  );

  const onViewType = useCallback(
    (isSpread: boolean) => {
      if (isSpread) {
        setViewType({ ...viewType, spread: true });
        setBookOption({ ...bookOption, spread: 'auto' });
      } else {
        setViewType({ ...viewType, spread: false });
        setBookOption({ ...bookOption, spread: 'none' });
      }
    },
    [bookOption, viewType, viewerRef],
  );
  const styleItem = useCallback(() => {
    return (
      <div className="text-black p-3">
        Style Setting
        <div className="flex flex-row space-x-4">
          <span>Sáng</span>
          <Switch
            color="purple"
            className=""
            crossOrigin={null}
            checked={isDarkMode}
            onChange={() => {
              onThemeChange(isDarkMode ? 'light' : 'dark');
            }}
          />
          <span>Tối</span>
        </div>
        <div className="flex flex-row space-x-4">
          <span>Dọc</span>
          <Switch
            color="purple"
            className=""
            crossOrigin={null}
            checked={isScrollHorizontal}
            onChange={() => {
              onDirection(isScrollHorizontal ? 'Vertical' : 'Horizontal');
            }}
          />
          <span>Ngang</span>
        </div>
        <div className="flex flex-row space-x-4">
          <span>Không chia trang</span>
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
          <span>Chia Trang</span>
        </div>
      </div>
    );
  }, [viewerRef, theme, bookStyle, bookOption, viewerLayout]);

  return {
    theme,
    // setTheme,
    // onThemeChange,
    bookStyle,
    setBookStyle,
    bookOption,
    setBookOption,
    viewerLayout,
    setViewerLayout,
    styleItem,
  };
}
