import { AppDispatch, RootState } from '@/lib/store';
import {
  initBookReader,
  updateCurrentPage,
} from '@/lib/store/ebook/ebookSlice';
import Book from '@/types/book';
import { Page, ViewerRef } from '@/types/ebook';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUser from '../useUser';

interface Props {
  viewerRef: RefObject<ViewerRef>;
  book: Book;
}

export default function useInitBook({ viewerRef, book }: Props) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { user, status } = useUser();
  const dispatch = useDispatch<AppDispatch>();

  const currentLocation = useSelector<RootState, Page>(
    (state: RootState) => state.ebook.currentLocation,
  );

  const setLocation = useCallback(
    (loc: string) => {
      if (!viewerRef.current) return;
      viewerRef.current.setLocation(loc);
    },
    [viewerRef],
  );

  useEffect(() => {
    console.log(isFetching);
    if (viewerRef.current)
      if (typeof viewerRef.current.setLocation === 'function') {
        if (isFetching) return;
        setIsFetching(true);
      }
  }, [viewerRef.current?.setLocation, isFetching]);

  useEffect(() => {
    const int = async () => {
      const token = user?.accessToken;
      if (!token) return;
      await dispatch(
        initBookReader({
          token,
          id: book.id,
          callback: async (page) => {
            // setLocation(page.startCfi);
            await dispatch(updateCurrentPage(page));
            if (isFetching) setLocation(page.startCfi);
            // setIsInit(true);
          },
        }),
      );
    };
    setTimeout(() => {
      console.log(isFetching);
      int();
    }, 1000);
  }, [status, user, isFetching]);
  return {
    isFetching,
    currentLocation,
  };
}
