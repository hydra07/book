import { BookmarkItem } from './reader.d';
// import { Book, Rendition } from 'epubjs/types/epub';
import { Contents } from 'epubjs';
type EpubCFI = string;
/**
 * @type
 * @param coverURL 표지 사진 url
 * @param title 제목
 * @param description 설명
 * @param published_date 출판일
 * @param modified_date 수정일
 * @param author 저자
 * @param publisher 발행자
 * @param language 도서 언어
 */
type BookType = {
  coverURL: string;
  title: string;
  description: string;
  published_date: string;
  modified_date: string;
  author: string;
  publisher: string;
  language: string;
};

/**
 * @type Page
 * @param chapterName 현재 챕터
 * @param currentpage 현재 페이지
 * @param totalPage 총 페이지 수
 * @param startCfi 현재 페이지 시작 CFI
 * @param endCfi 현재 페이지 끝 CFI
 * @param base 현재 페이지 CFI base
 */
interface Page {
  chapterName: string;
  currentPage: number;
  totalPage: number;
  startCfi: string;
  endCfi: string;
  base: string;
}

interface Loc {
  index: number;
  href: string;
  start: EpubCFI;
  end: EpubCFI;
  percentage: number;
}
interface Toc {
  label: string;
  href: string;
}

export interface Highlight {
  // cfiRange: string;
  key: string;
  accessTime: string;
  createTime: string;
  color: string;
  paragraphCfi: string;
  cfiRange: string;
  chpaterName: string;
  pageNum: number;
  content: string;
}
/**
 * Bookmarks
 */
export interface BookmarkItem {
  key: number;
  name: string;
  cfi: string;
  time: string;
}
export type Bookmarks = Array<BookmarkItem>;

/**
 * Epub viewer layout size type
 * @type
 * @param MIN_VIEWER_WIDTH Viewer min width (px)
 * @param MIN_VIEWER_HEIGHT Viewer min height (px)
 * @param VIEWER_HEADER_HEIGHT Viewer header height (px)
 * @param VIEWER_FOOTER_HEIGHT Viewer footer height (px)
 * @param VIEWER_SIDEMENU_WIDTH Viewer sideMenu width (px)
 */
export interface ViewerLayout {
  MIN_VIEWER_WIDTH: number;
  MIN_VIEWER_HEIGHT: number;
  VIEWER_HEADER_HEIGHT: number;
  VIEWER_FOOTER_HEIGHT: number;
  VIEWER_SIDEMENU_WIDTH: number;
}

/**
 * @type
 * @param fontFamily 폰트
 * @param fontSize 폰트 크기
 * @param lineHeight 줄 간격
 * @param marginHorizontal 가로 여백
 * @param marginVertical 세로 여백
 */
export type BookStyle = {
  fontFamily: BookFontFamily;
  fontSize: number;
  lineHeight: number;
  marginHorizontal: number;
  marginVertical: number;
};

/**
 * @type
 * - Origin: 원본
 * - *: 커스텀 폰트
 */
export type BookFontFamily = 'Origin' | 'Roboto';

export type BookFlow = 'paginated' | 'scrolled-doc';

/**
 * @type
 * @param flow 가로읽기 or 세로읽기(스크롤)
 * @param resizeOnOrientationChange 방향 전환시 크기 조절 여부
 * @param spread 펼쳐보기 여부
 */
export type BookOption = {
  flow: BookFlow;
  resizeOnOrientationChange: boolean;
  spread: 'auto' | 'none';
};

export type ViewType = {
  active: boolean;
  spread: boolean;
};
/**
 * DOM Element wrapping the Epub viewer
 * - Provides special methods.
 */
export interface ViewerRef extends HTMLDivElement {
  /** Move the viewer to the previous page */
  prevPage: () => void;
  /** Move the viewer to the next page */
  nextPage: () => void;
  /** Get CFI in current page */
  getCurrentCfi: () => string;
  /**
   * Highlighting specific CFIRange
   * @param cfiRange CFIRange
   * @param callback Callback after click highlight
   * @param color Highlight color
   */
  onHighlight: (
    cfiRange: string,
    callback?: (e: any) => void,
    color?: string,
  ) => void;
  /**
   * Remove specific highlight
   * @param cfiRange CFIRange
   */
  offHighlight: (cfiRange: string) => void;
  /**
   * Move the viewer to the cfi or href
   * @param location CFI or Href
   */
  setLocation: (location: string) => void;
}

/**
 * Epub Viewer Props
 * @type
 * @param url Epub file path
 * @param epubFileOptions Epub file option
 * @param epubOptions Epub viewer option
 * @param style Epub Wrapper style
 * @param location Epub CFI or href
 * @param bookChanged Run when book changed
 * @param rendtionChanged Run when rendition changed
 * @param pageChanged Run when page changed
 * @param tocChanged Run when toc changed
 * @param selectionChanged Run when selected
 * @param loadingView Loading Component
 */
export interface EpubViewerProps {
  url: string;
  epubFileOptions?: BookOptions;
  epubOptions?: RenditionOptions;
  style?: React.CSSProperties;
  location?: string;
  bookChanged?(book: Book): void;
  rendtionChanged?(rendition: Rendition): void;
  pageChanged?(page: Page): void;
  tocChanged?(value: Toc[]): void;
  selectionChanged?(cfiRange: string, contents: Contents): void;
  loadingView?: React.ReactNode;
}

declare class EpubViewer extends React.Component<EpubViewerProps, ViewerRef> {}

/**
 * React Epub Viewer Props
 * @type
 * @param url Epub file path
 * @param viewerLayout Viewer layout
 * @param viewerStyle Viewer style
 * @param viewerStyleURL Viewer style - CSS URL
 * @param viewerOption Viewer option
 * @param onBookInfoChange Run when book information changed
 * @param onPageChange Run when page changed
 * @param onTocChange Run when toc changed
 * @param onSelection Run when selected
 * @param loadingView Loading component
 */
export interface ReactViewerProps {
  url: string;
  viewerLayout?: ViewerLayout;
  viewerStyle?: BookStyle;
  viewerStyleURL?: string;
  viewerOption?: BookOption;
  onBookInfoChange?: (book: BookType) => void;
  onPageChange?: (page: Page) => void;
  onTocChange?: (toc: Toc[]) => void;
  onSelection?: (cfiRange: string, contents: Contents) => void;
  loadingView?: React.ReactNode;
}

declare class ReactEpubViewer extends React.Component<
  ReactViewerProps,
  ViewerRef
> {}

export {
  BookType,
  EpubViewer,
  EpubViewer,
  Loc,
  Page,
  ReactEpubViewer,
  ReactEpubViewer,
  Toc,
  ViewerRef,
};
