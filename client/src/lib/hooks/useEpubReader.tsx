'use client';
import {
  EpubReaderState,
  ILocationChangeProps,
  IReaderProps,
} from '@/types/reader';
import Epub, { Book, NavItem, Rendition } from 'epubjs';
import { useEffect, useRef, useState } from 'react';
import useBookContent from './useBookContent';
import useBookmark from './useBookmark';
import useBookmarkDrawer from './useBookmarkDrawer';
import useSearchDrawer from './useSearchDrawer';
import useSelectContent from './useSelectContent';
import useSnackbar from './useSnackBar';
export default function useEpubReader({
  url,
  fontSize,
  epubOptions,
}: IReaderProps): EpubReaderState {
  if (!url) return null;
  const [book, setBook] = useState<Book | null>(null);
  const [ebookUrl, setEbookUrl] = useState(url);
  const [isBookSet, setIsBookSet] = useState(false);
  useEffect(() => {
    /**
     * mục đích của hàm useEffect này là để fix lỗi ssr trên nextjs
     * khi chạy trên server thì window không tồn tại
     */
    if (typeof window !== 'undefined') {
      const book = Epub(ebookUrl, epubOptions);
      setBook(book);
      if (book) {
        setIsBookSet(true);
      }
    }
  }, []);

  const { isSearchDrawer, toggleSearchDrawer } = useSearchDrawer();
  const { isBookmarkDrawer, toggleBookmarkDrawer } = useBookmarkDrawer();
  const { selectedContent, setSelectedContent, handleSelect } =
    useSelectContent();
  const contentViewRef = useRef<HTMLDivElement>(null);
  const [catalogue, setCatalogue] = useState<NavItem[] | null>(null);
  const [isCatalogue, setIsCatalogue] = useState(false);
  const [isPanelBar, setIsPanelBar] = useState(true);
  const rendition = useRef<Rendition | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [currentChapter, setCurretChapter] = useState('');
  const [currentCfi, setCurrentCfi] = useState('');
  // const [themeMode, setThemeMode] = useState<boolean>(false);
  const { isSnackbar, snackbarMessage, showToast } = useSnackbar();

  const toggleCatalogue = () => {
    setIsCatalogue(!isCatalogue);
  };

  // const [book, setBook] = useState(() => Epub(ebookUrl, epubOptions) as Book);
  const initialFontSize = fontSize ? fontSize : '100%';

  const { bookContents, searchBookContents } = useBookContent(book!);
  const { bookmarks, addBookmark, removeBookmark } = useBookmark();

  /**
   * @description: khởi tạo ebook
   */
  const init = async () => {
    const { toc } = await book!.loaded.navigation;
    const node = contentViewRef.current as HTMLDivElement;
    const width = window.getComputedStyle(node).getPropertyValue('width');
    const epubRendition = book!.renderTo(node, { width, height: '100%' });
    const firstChapter = toc[0];
    const currentCfi = epubRendition.location?.start.cfi;

    setCurretChapter(firstChapter.href);
    setCurrentCfi(currentCfi);
    setCatalogue(toc);
    rendition.current = epubRendition;

    epubRendition.themes.fontSize(initialFontSize);
    // epubRendition.themes.register('dark', {
    //   body: {
    //     color: 'white',
    //     backgroundColor: 'black',
    //   },
    //   a: {
    //     color: 'red',
    //   },
    //   li: {
    //     'list-style-type': 'none',
    //   },
    // });
    epubRendition.themes.register('dark', 'themes/dark.theme.css');
    epubRendition.themes.register('light', 'themes/light.theme.css');
    epubRendition.themes.select('dark');
    epubRendition.display(currentCfi);

    epubRendition.on(
      'locationChanged',
      ({ percentage, href }: ILocationChangeProps) => {
        setCurretChapter(href);
        setPercentage(percentage);
        setCurrentCfi(epubRendition.location.start.cfi);
        setAtStart(epubRendition.location.atStart);
        setAtEnd(epubRendition.location.atEnd);
      },
    );

    epubRendition.on('selected', function (cfiRange: any, contents: any) {
      // epubRendition.annotations.highlight(cfiRange, {}, (e: any) => {
      //   console.log('highlight clicked', e.target) ;
      // });
      // epubRendition.annotations.remove(cfiRange, 'highlight');
      // epubRendition.annotations.highlight(cfiRange, {}, (e: any) => {
      //   console.log('underline clicked', e.target);
      //   epubRendition.annotations.remove(cfiRange, 'highlight');
      // });
      // console.log(epubRendition.annotations.);
      // contents.window.getSelection().removeAllRanges();
    });
    // epubRendition.on('clicked', function (cfiRange: any, contents: any) {
    //   epubRendition.annotations.remove(cfiRange, 'highlight');
    // });
    // epubRendition.on('selected', function (cfiRange: string, contents: any) {
    //   // epubRendition.annotations.mark(cfiRange, {}, (e: any) => {
    //   //   console.log('highlight clicked', contents);
    //   //   console.log('highlight clicked', e.target);
    //   // });
    //   epubRendition.annotations.highlight(cfiRange, {}, (e: any) => {
    //     console.log(contents);
    //   });
    // });
  };

  useEffect(() => {
    /**
     * mục đích của hàm useEffect này là để fix lỗi ssr trên nextjs
     * nó phải xác định book tồn tại trước khi gọi hàm init
     */
    if (book) {
      init();
      return () => {
        book!.destroy();
      };
    }
  }, [book ? book : null]);

  return {
    ebookUrl,
    book,
    catalogue,
    isCatalogue,
    rendition,
    contentViewRef,
    percentage,
    atStart,
    atEnd,
    currentChapter,
    isSearchDrawer,
    bookContents,
    initialFontSize,
    bookmarks,
    currentCfi,
    isBookmarkDrawer,
    isSnackbar,
    snackbarMessage,
    isPanelBar,
    setIsPanelBar,
    setEbookUrl,
    toggleSearchDrawer,
    toggleCatalogue,
    setCurretChapter,
    searchBookContents,
    addBookmark,
    removeBookmark,
    toggleBookmarkDrawer,
    showToast,
  };
}
