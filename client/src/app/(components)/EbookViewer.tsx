import useBookController from '@/lib/hooks/ebook/useBookController';
import useBookStyle from '@/lib/hooks/ebook/useBookStyle';
import useBookmark from '@/lib/hooks/ebook/useBookmark';
import useDrawer from '@/lib/hooks/ebook/useDrawer';
import ReactViewer from '@/lib/modules/ReactViewer/ReactViewer';
import Book from '@/types/book';
import { ViewerRef } from '@/types/ebook';
import { Contents } from 'epubjs';
import { useCallback, useRef, useState } from 'react';
import Loading from './Loading';
import Footer from './reader/Footer';
import Header from './reader/Header';
import RightDrawer from './reader/RightDrawer';
import TableOfContent from './reader/TableOfContent';

function getTheme(): string {
  return '/themes/dark.theme.css';
}

export default ({ book }: { book: Book }) => {
  const viewerRef = useRef<ViewerRef>(null);
  const [url, setUrl] = useState<string>(
    // 'Kiếm Lai - Phong Hoả Hí Chư Hầu.epub',
    // 'Cú Sốc Tương Lai - Alvin Toffler.epub',
    book.url,
  );
  const {
    isLeftDrawer,
    isFirstRightDrawerOpen,
    isSecondRightDrawerOpen,
    toggleLeftDrawer,
    toggleFirstRightDrawer,
    toggleSecondRightDrawer,
  } = useDrawer();
  const {
    theme,
    bookStyle,
    bookOption,
    viewerLayout,
    styleItem,
  } = useBookStyle({ viewerRef });

  const {
    currentLocation,
    onPageMove,
    onPageChange,
    onBookChangeInfor,
    onTocChange,
    onLocationChange,
  } = useBookController({ viewerRef });

  const { bookmarkItem, bookmarkButton } = useBookmark({
    onLocationChange,
    onTonggle: toggleFirstRightDrawer,
  });

  // const { onSelection } = useContextMenu({ viewerRef });
  const onSelection = useCallback(
    (cfiRange: string, contents: Contents) => {
      console.log('onSelection', contents.content);
    },
    [viewerRef],
  );

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Header
        onNavToggle={toggleLeftDrawer}
        height={viewerLayout.VIEWER_HEADER_HEIGHT}
        onBookmarkToggle={toggleFirstRightDrawer}
        onStyleToggle={toggleSecondRightDrawer}
        bookmarkButton={bookmarkButton()}
      />
      <ReactViewer
        url={url}
        viewerStyleURL={theme}
        viewerLayout={viewerLayout}
        viewerStyle={bookStyle}
        onBookInfoChange={onBookChangeInfor}
        viewerOption={bookOption}
        onPageChange={onPageChange}
        onTocChange={onTocChange}
        onSelection={onSelection}
        loadingView={<Loading />}
        ref={viewerRef}
      />
      <Footer
        title={currentLocation.chapterName}
        currentPage={currentLocation.currentPage}
        totalPage={currentLocation.totalPage}
        onPageMove={onPageMove}
        height={viewerLayout.VIEWER_FOOTER_HEIGHT}
      />
      <TableOfContent
        isToggle={isLeftDrawer}
        onToggle={toggleLeftDrawer}
        onLocation={onLocationChange}
      />
      <RightDrawer
        isToggle={isFirstRightDrawerOpen}
        onToggle={toggleFirstRightDrawer}
        children={bookmarkItem()}
      />
      <RightDrawer
        isToggle={isSecondRightDrawerOpen}
        onToggle={toggleSecondRightDrawer}
        children={styleItem()}
      />
    </div>
  );
};
