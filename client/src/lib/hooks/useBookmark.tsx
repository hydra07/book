'use client';
import { Bookmarks, addBookmarkFn } from '@/types/reader';
import { getCurLocaleTime } from '@/utils/date.utils';
import { useState } from 'react';

export default function useBookmark() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>([]);
  const addBookmark: addBookmarkFn = (bookmark) => {
    const bookmarkWithTime = {
      ...bookmark,
      time: getCurLocaleTime(),
    };
    setBookmarks([...bookmarks, bookmarkWithTime]);
  };

  const removeBookmark = (cfi: string) => {
    const bookmarksFilter = bookmarks.filter(
      (bookmark) => bookmark.cfi !== cfi,
    );
    setBookmarks(bookmarksFilter);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
  };
}
