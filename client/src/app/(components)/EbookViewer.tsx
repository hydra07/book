import useBookController from '@/lib/hooks/ebook/useBookController';
import useBookStyle from '@/lib/hooks/ebook/useBookStyle';
import useBookmark from '@/lib/hooks/ebook/useBookmark';
import useDrawer from '@/lib/hooks/ebook/useDrawer';
import useInitBook from '@/lib/hooks/ebook/useInitBook';
import useSelection from '@/lib/hooks/ebook/useSelection';
import ReactViewer from '@/lib/modules/ReactViewer/ReactViewer';
import Book from '@/types/book';
import { ViewerRef } from '@/types/ebook';
import { useRef, useState } from 'react';
import Loading from './Loading';
import Footer from './reader/Footer';
import Header from './reader/Header';
import RightDrawer from './reader/RightDrawer';
import TableOfContent from './reader/TableOfContent';

export default ({ book }: { book: Book }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const viewerRef = useRef<ViewerRef>(null);
  const {} = useInitBook({ viewerRef, book });
  const {
    // currentLocation,
    onPageMove,
    onPageChange,
    onBookChangeInfor,
    onTocChange,
    onLocationChange,
  } = useBookController({ viewerRef, book, isLoading });

  const {
    isLeftDrawer,
    isFirstRightDrawerOpen,
    isSecondRightDrawerOpen,
    isThirdRightDrawerOpen,
    setThirdRightDrawerOpen,
    toggleLeftDrawer,
    toggleFirstRightDrawer,
    toggleSecondRightDrawer,
    toggleThirdRightDrawer,
  } = useDrawer();
  const { theme, isDarkMode, bookStyle, bookOption, viewerLayout, styleItem } =
    useBookStyle({ viewerRef });

  const { bookmarkItem, bookmarkButton } = useBookmark({
    onLocationChange,
    onTonggle: toggleFirstRightDrawer,
  });

  const { onSelection, contextItem } = useSelection({
    viewerRef,
    onOpen: toggleThirdRightDrawer,
  });

  return (
    <>
      <div
        className="w-screen h-screen overflow-hidden "
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
          // color: isDarkMode ? '#fff' : '#000',
        }}
      >
        <Header
          onLocationChange={onLocationChange}
          onNavToggle={toggleLeftDrawer}
          height={viewerLayout.VIEWER_HEADER_HEIGHT}
          onBookmarkToggle={toggleFirstRightDrawer}
          onStyleToggle={toggleSecondRightDrawer}
          bookmarkButton={bookmarkButton()}
          onSelectToggle={toggleThirdRightDrawer}
        />
        <ReactViewer
          url={book.url}
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
        <RightDrawer
          isToggle={isThirdRightDrawerOpen}
          onToggle={toggleThirdRightDrawer}
          children={contextItem()}
        />
      </div>
    </>
  );
};
