import { AppDispatch } from '@/lib/store';
import {
  movePageAction,
  updateBook,
  updateCurrentPage,
  updateToc,
} from '@/lib/store/ebook/ebookSlice';
import Book from '@/types/book';
import { BookType, Page, Toc, ViewerRef } from '@/types/ebook';
import { RefObject, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useUser from '../useUser';

type Props = {
  isLoading: boolean;
  viewerRef: RefObject<ViewerRef> | any;
  book: Book;
};
type useBookStyle = {
  // currentLocation: any;
  onPageMove: (type: 'prev' | 'next') => void;
  onPageChange: (page: Page) => void;
  onBookChangeInfor: (book: BookType) => void;
  onTocChange: (toc: Toc[]) => void;
  onLocationChange: (loc: string) => void;
  // initialLocation: () => void;
  // onAddBookmark: () => void;
  // onRemoveBookmark: () => void;
};
export default function useBookController({
  viewerRef,
  book,
  isLoading,
}: Props): useBookStyle {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useUser();
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
    (page: Page) => {
      if ('epubcfi(/6/2!/14/1:0)' === page.startCfi) return;
      dispatch(updateCurrentPage(page));
      const token = user?.accessToken;
      if (!token) return;
      dispatch(movePageAction({ token, id: book.id }));
    },
    [viewerRef, onPageMove, user, isLoading],
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
    // currentLocation,
    onPageMove,
    onPageChange,
    onBookChangeInfor,
    onTocChange,
    onLocationChange,
  };
}
