import { useState } from 'react';

export default function useDrawer() {
  const [isLeftDrawer, setIsLeftDrawer] = useState<boolean>(false);
  const [isFirstRightDrawerOpen, setFirstRightDrawerOpen] =
    useState<boolean>(false);
  const [isSecondRightDrawerOpen, setSecondRightDrawerOpen] =
    useState<boolean>(false);
  const [isThirdRightDrawerOpen, setThirdRightDrawerOpen] =
    useState<boolean>(false);
  const [isFourthRightDrawerOpen, setFourthRightDrawerOpen] =
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
    if (isFourthRightDrawerOpen) {
      setFourthRightDrawerOpen(false);
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
    if (isFourthRightDrawerOpen) {
      setFourthRightDrawerOpen(false);
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
    if (isFourthRightDrawerOpen) {
      setFourthRightDrawerOpen(false);
    }
  };

  const toggleFourthRightDrawer = () => {
    setFourthRightDrawerOpen(!isFourthRightDrawerOpen);
    if (isFirstRightDrawerOpen) {
      setFirstRightDrawerOpen(false);
    }
    if (isSecondRightDrawerOpen) {
      setSecondRightDrawerOpen(false);
    }
    if (isThirdRightDrawerOpen) {
      setThirdRightDrawerOpen(false);
    }
  };

  return {
    isLeftDrawer,
    isFirstRightDrawerOpen,
    isSecondRightDrawerOpen,
    isThirdRightDrawerOpen,
    isFourthRightDrawerOpen,
    setFirstRightDrawerOpen,
    setSecondRightDrawerOpen,
    setThirdRightDrawerOpen,
    setFourthRightDrawerOpen,
    toggleLeftDrawer,
    toggleFirstRightDrawer,
    toggleSecondRightDrawer,
    toggleThirdRightDrawer,
    toggleFourthRightDrawer,
  };
}
