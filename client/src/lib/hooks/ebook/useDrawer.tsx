import { useState } from 'react';

export default function useDrawer() {
  const [isLeftDrawer, setIsLeftDrawer] = useState<boolean>(false);
  const [isFirstRightDrawerOpen, setFirstRightDrawerOpen] =
    useState<boolean>(false);
  const [isSecondRightDrawerOpen, setSecondRightDrawerOpen] =
    useState<boolean>(false);
  const [isThirdRightDrawerOpen, setThirdRightDrawerOpen] =
    useState<boolean>(false);

  const toggleLeftDrawer = () => {
    setIsLeftDrawer((prev) => !prev);
  };

  const toggleFirstRightDrawer = () => {
    setFirstRightDrawerOpen(!isFirstRightDrawerOpen);
    if (isSecondRightDrawerOpen) {
      setSecondRightDrawerOpen(false);
    }
    if (isThirdRightDrawerOpen) {
      setThirdRightDrawerOpen(false);
    }
  };

  const toggleSecondRightDrawer = () => {
    setSecondRightDrawerOpen(!isSecondRightDrawerOpen);
    if (isFirstRightDrawerOpen) {
      setFirstRightDrawerOpen(false);
    }
    if (isThirdRightDrawerOpen) {
      setThirdRightDrawerOpen(false);
    }
  };

  const toggleThirdRightDrawer = () => {
    setThirdRightDrawerOpen(!isThirdRightDrawerOpen);
    if (isFirstRightDrawerOpen) {
      setFirstRightDrawerOpen(false);
    }
    if (isSecondRightDrawerOpen) {
      setSecondRightDrawerOpen(false);
    }
  };

  return {
    isLeftDrawer,
    isFirstRightDrawerOpen,
    isSecondRightDrawerOpen,
    isThirdRightDrawerOpen,
    setFirstRightDrawerOpen,
    setSecondRightDrawerOpen,
    setThirdRightDrawerOpen,
    toggleLeftDrawer,
    toggleFirstRightDrawer,
    toggleSecondRightDrawer,
    toggleThirdRightDrawer,
  };
}
