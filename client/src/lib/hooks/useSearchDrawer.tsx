'use client';
import { useState } from 'react';

export default function useSearchDrawer(isVisible: boolean = false) {
  const [isSearchDrawer, setSearchDrawer] = useState(isVisible);
  const toggleSearchDrawer = () => {
    setSearchDrawer(!isSearchDrawer);
  };

  return {
    isSearchDrawer,
    setSearchDrawer,
    toggleSearchDrawer,
  };
}
