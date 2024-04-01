'use client';
import { useState } from 'react';

export default function useBookmarkDrawer(isVisible: boolean = false) {
  const [isBookmarkDrawer, setBookmarkDrawer] = useState(isVisible);
  const toggleBookmarkDrawer = () => {
    setBookmarkDrawer(!isBookmarkDrawer);
  };

  return {
    isBookmarkDrawer,
    setSearchDrawer: setBookmarkDrawer,
    toggleBookmarkDrawer,
  };
}
