import { useState } from 'react';

export default function useDrawer() {
  const [isLeftDrawer, setIsLeftDrawer] = useState<boolean>(false);
  const [isFirstRightDrawerOpen, setFirstRightDrawerOpen] =
    useState<boolean>(false);
  const [isSecondRightDrawerOpen, setSecondRightDrawerOpen] =
    useState<boolean>(false);

  const toggleLeftDrawer = () => {
    setIsLeftDrawer((prev) => !prev);
  };
  // const toggleRightDrawer = () => {
  //   setIsRightDrawer((prev) => !prev);
  // };
  const toggleFirstRightDrawer = () => {
    setFirstRightDrawerOpen(!isFirstRightDrawerOpen);
    if (isSecondRightDrawerOpen) {
      setSecondRightDrawerOpen(false);
    }
  };

  const toggleSecondRightDrawer = () => {
    setSecondRightDrawerOpen(!isSecondRightDrawerOpen);
    if (isFirstRightDrawerOpen) {
      setFirstRightDrawerOpen(false);
    }
  };
  return {
    isLeftDrawer,
    isFirstRightDrawerOpen,
    isSecondRightDrawerOpen,
    toggleLeftDrawer,
    toggleFirstRightDrawer,
    toggleSecondRightDrawer,
  };
}
