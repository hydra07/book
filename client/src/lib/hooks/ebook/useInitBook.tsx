import { AppDispatch, RootState } from '@/lib/store';
import {
  Highlight,
  initBookReader,
  updateBookmark,
  updateHighLight,
} from '@/lib/store/ebook/ebookSlice';
import Book from '@/types/book';
import { Bookmarks, Page, ViewerRef } from '@/types/ebook';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUser from '../useUser';

interface Props {
  viewerRef: RefObject<ViewerRef>;
  book: Book;
  isLoading: boolean;
}

export default function useInitBook({ viewerRef, book, isLoading }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { user, status } = useUser();
  const hasRunOnce = useRef<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );
  const bookmarks = useSelector<RootState, Bookmarks>(
    (state: RootState) => state.ebook.bookmarks,
  );
  const highlights = useSelector<RootState, Highlight[]>(
    (state: RootState) => state.ebook.highLights,
  );

  const _currentLocation = useSelector<RootState, Page | null>(
    (state: RootState) => state.ebook._fetchingCurrentLocation,
  );
  const _bookmarks = useSelector<RootState, Bookmarks | []>(
    (state: RootState) => state.ebook._fetchingBookmarks,
  );
  const _highlights = useSelector<RootState, Highlight[]>(
    (state: RootState) => state.ebook._fetchingHighlights,
  );
  const _isfetching = useSelector<RootState, boolean>(
    (state: RootState) => state.ebook._isFetching,
  );
  const setLocation = useCallback(
    (loc: string) => {
      if (!viewerRef.current) return;
      viewerRef.current.setLocation(loc);
    },
    [viewerRef],
  );
  useEffect(() => {
    if (user?.accessToken && !hasRunOnce.current) {
      dispatch(initBookReader({ token: user.accessToken, id: book.id }));
      hasRunOnce.current = true;
    }
  }, [user]);

  //init bookmark
  useEffect(() => {
    if (_bookmarks.length > 0 && bookmarks.length === 0) {
      dispatch(updateBookmark(_bookmarks));
    }
  }, [_bookmarks]);
  useEffect(() => {
    if (_highlights.length > 0 && highlights.length === 0) {
      dispatch(updateHighLight(_highlights));
    }
  }, [_highlights]);
  // useEffect(() => {
  //   if (_currentLocation) {
  //     setLocation(_currentLocation.startCfi);
  //     // console.log('line check _currentLocation    ', _currentLocation);
  //   }
  // }, [_currentLocation]);

  // useEffect(() => {
  //   if (_isfetching && isLoading) {
  //     console.log(_currentLocation, _bookmarks);
  //     // dispatch(updateCurrentPage(_currentLocation!));
  //     dispatch(updateBookmark(_bookmarks!));
  //     dispatch(updateCurrentPage(_currentLocation!));
  //     // if (isValidCfi(_currentLocation!.startCfi))
  //     setLocation(_currentLocation!.startCfi);
  //   }
  // }, [_isfetching, isLoading]);

  useEffect(() => {
    console.log('currentLocation', currentLocation);
    console.log('_currentLocation', _currentLocation);
  }, [currentLocation, _currentLocation]);

  return {
    isFetching,
    currentLocation,
    hasRunOnce,
  };
}
