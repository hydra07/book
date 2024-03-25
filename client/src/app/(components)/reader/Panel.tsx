import Image from 'next/image';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import FileReaderInput from 'react-file-reader-input';
import { readerContext } from './Reader';
export default function Panel() {
  const context = useContext(readerContext);
  if (!context) return null;

  const {
    isBookmarkDrawer: isSearchDrawer,
    toggleSearchDrawer,
    toggleCatalogue,
    rendition,
    isPanelBar,
    setIsPanelBar,
    initialFontSize,
    addBookmark,
    removeBookmark,
    currentCfi,
    bookmarks,
    toggleBookmarkDrawer,
    showToast,
    setEbookUrl,
  } = context;

  const appbarRef = useRef<HTMLDivElement>(null);
  //TODO: demo change mode
  const [themeMode, setThemeMode] = useState<boolean>(true);

  let fontSize = initialFontSize;
  const isBookmarkAdded = bookmarks.find(
    (bookmark) => bookmark.cfi === currentCfi,
  );

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await document.body.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const resize = (isFullHeight: boolean) => {
    const originWidth = rendition.current?.settings.width;
    const appbarH = appbarRef.current?.clientHeight;
    if (!originWidth || !appbarH) {
      return;
    }

    const height = isFullHeight
      ? window.innerHeight
      : window.innerHeight - appbarH;

    if (typeof originWidth === 'number') {
      rendition.current?.resize(originWidth, height);
    } else {
      const nOriginWidth = originWidth.match(/\d+/);
      if (nOriginWidth) {
        rendition.current?.resize(Number(nOriginWidth[0]), height);
      }
    }
  };

  const hidePanelBar = () => {
    setIsPanelBar(false);
    resize(true);
  };

  const ShowPanelBar = () => {
    setIsPanelBar(true);
    resize(false);
  };

  const onAddBookmark = () => {
    addBookmark({
      name: 'bookmark',
      cfi: currentCfi,
    });
    showToast('Add bookmark success');
  };

  const onRemoveBookmark = () => {
    removeBookmark(currentCfi);
    showToast('Remove bookmark success');
  };

  const toggleFontSize = () => {
    if (fontSize === '100%') {
      fontSize = '150%';
    } else {
      fontSize = '100%';
    }

    rendition.current?.themes.fontSize(fontSize);
  };

  const changeMode = () => {
    // console.log(':::', rendition.current.themes._current);
    // if (rendition.current?.themes._current === 'dark') {
    //   rendition.current?.themes.select('light');
    // } else {
    //   rendition.current?.themes.select('dark');
    // }
    if (!themeMode) {
      rendition.current?.themes.select('dark');
    } else {
      rendition.current?.themes.select('light');
    }
    setThemeMode(!themeMode);
  };

  const handleBookFileChange = (
    events: ChangeEvent<HTMLInputElement>,
    results: FileReaderInput.Result[],
  ) => {
    if (!results.length) return;

    const [e, file] = results[0];
    if (file.type !== 'application/epub+zip') {
      return showToast('Please choose an epub file');
    }

    const result = (e.target as FileReader)?.result as string;
    setEbookUrl(result);

    events.target.setAttribute('value', '');
  };
  return (
    <header className="h-10 w-screen sticky top-0 left-0 z-50 rounded-none border-b-1 bg-blue-gray-900 justify-between flex">
      <div className="flex items-center justify-between pl-3">
        <button
          className="h-max items-center justify-between"
          onClick={toggleCatalogue}
        >
          <Image src="/svg/menu-white.svg" alt="menu" width={22} height={22} />
        </button>
      </div>
      <div className="flex flex-row space-x-5 justify-end items-center pr-3 ">
        {isBookmarkAdded ? (
          <button
            className="h-max items-center justify-between"
            onClick={onRemoveBookmark}
          >
            <Image
              src="/svg/bookmark-added.svg"
              // src="/svg/menu-list-white.svg"
              alt="menu"
              width={22}
              height={22}
            />
          </button>
        ) : (
          <button
            className="h-max items-center justify-between"
            onClick={onAddBookmark}
          >
            <Image
              src="/svg/bookmark-white.svg"
              // src="/svg/menu-list-white.svg"
              alt="menu"
              width={22}
              height={22}
            />
          </button>
        )}
        <button
          className="h-max items-center justify-between"
          onClick={toggleBookmarkDrawer}
        >
          <Image
            // src="/svg/bookmark-white.svg"
            src="/svg/menu-list-white.svg"
            alt="menu"
            width={22}
            height={22}
          />
        </button>
        <button
          className="h-max items-center justify-between"
          onClick={toggleFontSize}
        >
          <Image src="/svg/font-white.svg" alt="menu" width={22} height={22} />
        </button>
        <button
          className="h-max items-center justify-between"
          onClick={toggleFullScreen}
        >
          <Image
            src="/svg/full-screen-white.svg"
            alt="menu"
            width={22}
            height={22}
          />
        </button>
        <button
          className="h-max items-center justify-between"
          onClick={toggleSearchDrawer}
        >
          <Image src="/svg/search.svg" alt="menu" width={22} height={22} />
        </button>
        {/* <SearchDrawer /> */}
        {/* <BookmarkDrawer /> */}

        {/* <button
          className="h-max items-center justify-between"
          onClick={hidePanelBar}
        >
          <Image
            className="rotate-180"
            src="/svg/double-arrow-white.svg"
            alt="menu"
            width={22}
            height={22}
          />
        </button> */}
        {/* <Switch
          onChange={changeMode}
          crossOrigin={null}
          defaultChecked={themeMode}
        /> */}
        <button onClick={changeMode} className="">
          {themeMode ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  );
}
