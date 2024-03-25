export type MatchSearches = Array<
  | {
      paragraph: string;
      href: string;
    }
  | undefined
>;

export type BookContents = Array<{
  href: string;
  text: string[];
}>;

export type EpubReaderState = {
  ebookUrl: string;
  book: Book;
  catalogue: NavItem[] | null;
  rendition: React.MutableRefObject<Rendition | null>;
  contentViewRef: React.RefObject<HTMLDivElement>;
  isCatalogue: boolean;
  percentage: number;
  atStart: boolean;
  atEnd: boolean;
  currentChapter: string;
  isSearchDrawer: boolean;
  bookContents: BookContents;
  initialFontSize: string;
  bookmarks: Bookmarks;
  currentCfi: string;
  isBookmarkDrawer: boolean;
  isSnackbar: boolean;
  snackbarMessage: string;
  isPanelBar: boolean;
  setIsPanelBar: (flag: boolean) => void;
  setEbookUrl: (url: string) => void;
  toggleSearchDrawer: () => void;
  toggleCatalogue: () => void;
  setCurretChapter: (href: string) => void;
  searchBookContents: (searchString: string) => MatchSearches;
  addBookmark: addBookmarkFn;
  removeBookmark: removeBookmarkFn;
  toggleBookmarkDrawer: () => void;
  showToast: (message: string) => void;
} | null;

export interface ILocationChangeProps {
  end: string;
  href: string;
  index: number;
  percentage: number;
  start: string;
}

// export type BookmarkItem = {
//   name: string;
//   cfi: string;
//   time: string;
// };

// export type Bookmarks = Array<BookmarkItem>;

export interface addBookmarkFn {
  (bookmark: Omit<BookmarkItem, 'time'>): void;
}

export interface removeBookmarkFn {
  (cfi: string): void;
}

export interface IReaderProps {
  url: string;
  fontSize?: string;
  epubOptions?: Object;
}
