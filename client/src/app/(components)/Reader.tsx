// import ReactViewer from '@/lib/modules/EpubViewer/ReactViewer';
// import ReactViewer from 'react-epub-viewer';
import { RootState } from '@/lib/store';
import { updateCurrentPage } from '@/lib/store/ebook/ebookSlice';
import { Page, ReactEpubViewer, ViewerLayout, ViewerRef } from '@/types/ebook';
import theme from '@material-tailwind/react/theme';
import { Contents } from 'epubjs';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import Footer from './reader/Footer';
import Header from './reader/Header';
export default () => {
  const demoUrl = 'Kiếm Lai - Phong Hoả Hí Chư Hầu.epub';
  const dispatch = useDispatch();
  const currentLocation = useSelector<RootState, Page>(
    (state) => state.ebook.currentLocation,
  );
  const viewRef = useRef<ViewerRef | any>(null);
  const navRef = useRef<HTMLDivElement | null>(null); // navigation
  const optionRef = useRef<HTMLDivElement | null>(null); // option setting

  const [chapterName, setChapterName] = useState<string>('');
  const [viewerLayout, setViewerLayout] = useState<ViewerLayout>({
    MIN_VIEWER_WIDTH: 600,
    MIN_VIEWER_HEIGHT: 300,
    VIEWER_HEADER_HEIGHT: 30,
    VIEWER_FOOTER_HEIGHT: 30,
    VIEWER_SIDEMENU_WIDTH: 0,
  });
  // di chuyen
  const handleMovePage = useCallback(
    (type: 'prev' | 'next') => {
      const node = viewRef.current;
      if (!node || !node.prevPage || !node.nextPage) return;
      type === 'prev' && node.prevPage();
      type === 'next' && node.nextPage();
    },
    [viewRef],
  );

  /**
   * Hàm này dùng để xử lý sự kiện khi chuyển trang
   */
  const onPageChange = useCallback(
    (page: Page) => {
      dispatch(updateCurrentPage(page));
      console.log(currentLocation);
    },
    [viewRef, currentLocation],
  );
  /**
   * Hàm này dùng để xử lý sự kiện khi chọn văn bản
   */
  const handleOnSelection = useCallback(
    (cfiRange: string, contents: Contents) => {
      viewRef.current!.onHighlight(cfiRange, (e: any) => {
        console.log('highlight', e);
      });
    },
    [viewRef],
  );

  const onLocationChange = useCallback(
    (loc: string) => {
      if (!viewRef.current) return;
      viewRef.current.setLocation(loc);
    },
    [viewRef, currentLocation],
  );

  const handleChangeThemeMode = useCallback(async () => {
    // await dispatch(
    //   setCurrentTheme(
    //     theme === '/themes/dark.theme.css'
    //       ? '/themes/light.theme.css'
    //       : '/themes/dark.theme.css',
    //   ),
    // );
  }, [viewRef, theme]);

  return (
    <div className="w-screen h-screen">
      <Header changeTheme={handleChangeThemeMode} currentTheme={theme} />
      <ReactEpubViewer
        url={demoUrl}
        viewerLayout={viewerLayout}
        viewerStyleURL={'/themes/dark.theme.css'}
        // onTocChange={}
        onPageChange={onPageChange}
        onSelection={handleOnSelection}
        loadingView={<Loading />}
        ref={viewRef}
      />

      <Footer chapterName={chapterName} handleMovePage={handleMovePage} />
    </div>
  );
};
