'use client';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { readerContext } from './Reader';
/**
 * @description: Content view
 */
export default function ContentView() {
  const context = useContext(readerContext);
  if (!context) return null;

  const { rendition, atStart, atEnd, isPanelBar } = context;

  const goPrevPage = async () => {
    rendition.current && (await rendition.current.prev());
  };

  const goNextPage = async () => {
    rendition.current && (await rendition.current.next());
  };

  const handleKeyPress = ({ key }: KeyboardEvent) => {
    key && key === 'ArrowRight' && goNextPage();
    key && key === 'ArrowLeft' && goPrevPage();
  };

  const offListenKeyup = () => {
    document.removeEventListener('keyup', handleKeyPress, false);
  };

  useEffect(() => {
    offListenKeyup();
    rendition.current?.on('keyup', handleKeyPress);
    document.addEventListener('keyup', handleKeyPress, false);

    return offListenKeyup;
  }, [rendition.current]);
  //event listener mouse
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      let selectedText = window.getSelection()?.toString();
      if (selectedText && selectedText.length > 0) {
        console.log('User selected: ', selectedText);
      }
    };
    console.log('running...');
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  // console.log(isPanelBar);
  return (
    <div
      className={
        isPanelBar
          ? // ? 'flex w-screen h-[calc(100vh-48px)] overflow-x-hidden'
            // : 'flex w-screen h-screen overflow-x-hidden'
            'flex w-screen h-[calc(100vh-48px)] overflow-hidden'
          : 'flex w-screen h-screen overflow-hidden'
      }
    >
      <div
        className="w-[100px] flex items-center justify-center transition-all duration-300 cursor-pointer select-none hover:bg-opacity-15 "
        onClick={goPrevPage}
      >
        <button hidden={atStart ? true : false}>
          <Image
            className="transform hover:scale-125 transition-transform duration-150"
            src="/svg/left-white.svg"
            alt="arrow-left"
            width={40}
            height={40}
          />
        </button>
      </div>
      <div
        // className="content-view content-view__book"
        className="flex w-screen h-[calc(100vh-48px)] overflow-x-hidden flex-grow"
        ref={context.contentViewRef}
      ></div>
      <div
        className="w-[100px] flex items-center justify-center transition-all duration-300 cursor-pointer select-none  hover:bg-opacity-15"
        onClick={goNextPage}
      >
        <button hidden={atEnd ? true : false}>
          <Image
            className="transform hover:scale-125 transition-transform duration-150"
            src="/svg/right-white.svg"
            alt="arrow-right"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}
