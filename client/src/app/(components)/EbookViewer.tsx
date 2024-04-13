import useBookController from '@/lib/hooks/ebook/useBookController';
import useBookStyle from '@/lib/hooks/ebook/useBookStyle';
import useBookmark from '@/lib/hooks/ebook/useBookmark';
import useDrawer from '@/lib/hooks/ebook/useDrawer';
import useInitBook from '@/lib/hooks/ebook/useInitBook';
import useSelection from '@/lib/hooks/ebook/useSelection';
// import ReactEpubViewer from '@/lib/modules/ReactViewer/ReactViewer';
import Book from '@/types/book';
import { ViewerRef } from '@/types/ebook';
import { useEffect, useRef, useState } from 'react';
import { ReactEpubViewer } from 'react-epub-viewer';
import Loading from './Loading';
import Footer from './reader/Footer';
import Header from './reader/Header';
import RightDrawer from './reader/RightDrawer';
import TableOfContent from './reader/TableOfContent';

export default ({ book }: { book: Book }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const viewerRef = useRef<ViewerRef | any>(null);
  const {} = useInitBook({ viewerRef, book, isLoading });
  const {
    // currentLocation,
    onPageMove,
    onPageChange,
    onBookChangeInfor,
    onTocChange,
    onLocationChange,
  } = useBookController({ viewerRef, book });

  const {
    isLeftDrawer,
    isFirstRightDrawerOpen,
    isSecondRightDrawerOpen,
    isThirdRightDrawerOpen,
    isFourthRightDrawerOpen,
    setThirdRightDrawerOpen,

    toggleLeftDrawer,
    toggleFirstRightDrawer,
    toggleSecondRightDrawer,
    toggleThirdRightDrawer,
    toggleFourthRightDrawer,
  } = useDrawer();
  const { theme, isDarkMode, bookStyle, bookOption, viewerLayout, styleItem } =
    useBookStyle({ viewerRef });

  const { bookmarkItem, bookmarkButton } = useBookmark({
    viewerRef,
    onLocationChange,
    onTonggle: toggleFirstRightDrawer,
    book,
  });

  const { onSelection, contextItem, listHighLight } = useSelection({
    viewerRef,
    onOpen: toggleFourthRightDrawer,
    onLocationChange,
    book,
  });

  // function isViewerRef(ref: any): ref is ViewerRef {
  //   return (
  //     ref &&
  //     typeof ref.prevPage === 'function' &&
  //     typeof ref.nextPage === 'function' &&
  //     typeof ref.getCurrentCfi === 'function' &&
  //     typeof ref.onHighlight === 'function' &&
  //     typeof ref.offHighlight === 'function' &&
  //     typeof ref.setLocation === 'function'
  //   );
  // }

  useEffect(() => {
    // if (isViewerRef(viewerRef.current)) {
    //   setIsLoading(true);
    // }
    // return () => {
    //   setIsLoading(false);
    // };
    // console.log(isLoading);
  }, [isLoading]);

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
        <ReactEpubViewer
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
          children={listHighLight()}
        />
        <RightDrawer
          isToggle={isFourthRightDrawerOpen}
          onToggle={toggleFourthRightDrawer}
          children={contextItem()}
        />
        {isLoading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
};
