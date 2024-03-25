import { AppDispatch, RootState } from '@/lib/store';
import {
  updateBook,
  updateCurrentPage,
  updateToc,
} from '@/lib/store/ebook/ebookSlice';
import { BookType, Page, Toc, ViewerRef } from '@/types/ebook';
import { RefObject, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {
  viewerRef: RefObject<ViewerRef> | any;
};
type useBookStyle = {
  currentLocation: any;
  onPageMove: (type: 'prev' | 'next') => void;
  onPageChange: (page: Page) => void;
  onBookChangeInfor: (book: BookType) => void;
  onTocChange: (toc: Toc[]) => void;
  onLocationChange: (loc: string) => void;
  // onAddBookmark: () => void;
  // onRemoveBookmark: () => void;
};
export default function useBookController({ viewerRef }: Props): useBookStyle {
  const dispatch: AppDispatch = useDispatch();
  const currentLocation = useSelector(
    (state: RootState) => state.ebook.currentLocation,
  );
  // const bookmarks = useSelector((state: RootState) => state.ebook.bookmarks);

  // Dùng để di chuyển giữa các trang
  const onPageMove = useCallback(
    (type: 'prev' | 'next') => {
      const node = viewerRef.current;
      if (!node || !node.prevPage || !node.nextPage) return;
      type === 'prev' && node.prevPage();
      type === 'next' && node.nextPage();
    },
    [viewerRef],
  );

  // Dùng để cập nhật sau khi chuyển trang
  const onPageChange = useCallback(
    async (page: Page) => {
      dispatch(updateCurrentPage(page));
      // const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmN4eXpraG9uZ0BnbWFpbC5jb20iLCJleHAiOjE3MTEwODEwMTN9.0DjJf1T_yrKiyP8MCJBJeidJpX0QA_0oDiV7sB0CZjiUED56V_3BeS5-9J31g6SL4my6JHGPZ-nN9wPukUys9A`;
      // await dispatch(movePageAction(token));
    },
    [viewerRef, onPageMove],
  );
  const onBookChangeInfor = useCallback(
    (book: BookType) => {
      dispatch(updateBook(book));
    },
    [viewerRef],
  );

  //
  const onTocChange = useCallback(
    (toc: Toc[]) => {
      dispatch(updateToc(toc));
    },
    [viewerRef],
  );

  /**
   * Change Epub location
   * @param loc epubCFI or href
   */
  const onLocationChange = useCallback(
    (loc: string) => {
      if (!viewerRef.current) return;
      viewerRef.current.setLocation(loc);
    },
    [viewerRef],
  );

  return {
    currentLocation,
    onPageMove,
    onPageChange,
    onBookChangeInfor,
    onTocChange,
    onLocationChange,
    // onAddBookmark,
    // onRemoveBookmark,
  };
}
