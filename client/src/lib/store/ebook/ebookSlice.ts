import { axiosWithAuth } from '@/lib/axios';
// import { Highlight } from '@/lib/store/ebook/ebookSlice';
import {
  BookOption,
  BookStyle,
  Bookmarks,
  Color,
  // Highlight,
  Page,
  Toc,
  ViewerLayout,
} from '@/types/ebook';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { getServerSession } from 'next-auth';
export interface Highlight {
  key: number;
  cfiRange: string;
  content: string;
  color?: string;
  createAt: string;
  chapterName: string;
  pageNum: number;
  lastAccess?: string;
  // note: string;
}

interface EbookState {
  book: any;
  currentLocation: Page;
  theme: string;
  toc: Toc[];
  highLights: Highlight[];
  bookmarks: Bookmarks;
  bookOption: BookOption;
  bookStyle: BookStyle;
  viewerLayout: ViewerLayout;
  color: Color[];
  _fetchingCurrentLocation: Page | null;
  _fetchingBookmarks: Bookmarks | [];
  _fetchingHighlights: Highlight[] | [];
  _isFetching: boolean;
}

const initialBook = {
  id: 0,
  coverURL: '',
  title: '',
  description: '',
  author: '',
  published_date: '',
  modified_date: '',
};

const initialCurrentLocation: Page = {
  chapterName: '-',
  currentPage: 0,
  totalPage: 0,
  startCfi: '',
  // startCfi: 'epubcfi(/6/2!/14/1:0)',
  endCfi: '',
  base: '',
};

const initialBookOption: BookOption = {
  flow: 'paginated',
  resizeOnOrientationChange: true,
  spread: 'auto',
};

const initialBookStyle: BookStyle = {
  fontFamily: 'Origin',
  fontSize: 22,
  lineHeight: 1.4,
  marginHorizontal: 13,
  marginVertical: 7,
};

const initialColor: Color[] = [
  { name: 'yellow', code: '#f7f48b' },
  { name: 'green', code: '#a1f48b' },
  { name: 'blue', code: '#8bb1f4' },
  { name: 'red', code: '#f48b8b' },
  { name: 'purple', code: '#d88bf4' },
];

const initialViewerLayout: ViewerLayout = {
  MIN_VIEWER_WIDTH: 600,
  MIN_VIEWER_HEIGHT: 300,
  VIEWER_HEADER_HEIGHT: 40,
  VIEWER_FOOTER_HEIGHT: 40,
  VIEWER_SIDEMENU_WIDTH: 0,
};
const initialTheme: string = '/themes/dark.theme.css';

const initialState: EbookState = {
  book: initialBook,
  currentLocation: initialCurrentLocation,
  theme: initialTheme,
  toc: [],
  highLights: [],
  bookmarks: [],
  bookOption: initialBookOption,
  bookStyle: initialBookStyle,
  viewerLayout: initialViewerLayout,
  color: initialColor,
  _fetchingCurrentLocation: null,
  _fetchingBookmarks: [],
  _fetchingHighlights: [],
  _isFetching: false,
};

// Slice
const ebookSlice = createSlice({
  name: 'ebook',
  initialState,
  reducers: {
    updateBook(state, action) {
      state.book = action.payload;
    },
    clearBook(state) {
      state.book = initialBook;
    },
    updateCurrentPage(state, action: PayloadAction<Page>) {
      state.currentLocation = action.payload;
    },
    updateToc(state, action) {
      state.toc = action.payload;
    },
    clearToc(state) {
      state.toc = [];
    },
    updateCurrentTheme(state, action) {
      state.theme = action.payload;
    },
    updateBookmark(state, action) {
      state.bookmarks = action.payload;
      // console.log(JSON.stringify(state.bookmarks));
      // console.table(state.bookmarks);
    },
    updateBookOption(state, action) {
      state.bookOption = action.payload;
    },
    updateBookStyle(state, action) {
      state.bookStyle = action.payload;
    },
    updateViewerLayout(state, action) {
      state.viewerLayout = action.payload;
    },
    initFetchingCurrentLocation(state, action) {
      state._fetchingCurrentLocation = action.payload;
    },
    initFetchingBookmarks(state, action) {
      state._fetchingBookmarks = action.payload;
    },
    updateHighLight(state, action) {
      state.highLights = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initBookReader.rejected, (state, action) => {
        state._fetchingCurrentLocation = null;
        state._fetchingBookmarks = [];
        state._fetchingHighlights = [];
        state._isFetching = true;
      })
      .addCase(
        initBookReader.fulfilled,
        (state, action: PayloadAction<ReaderResponse>) => {
          state._fetchingCurrentLocation = action.payload.currentPage;
          state._fetchingBookmarks = action.payload.bookmarks;
          state._fetchingHighlights = action.payload.highlights;
          state._isFetching = true;
          // state.currentLocation = action.payload.currentPage;
          // console.log('initBookReader.fulfilled', action.payload.currentPage);
        },
      )
      .addCase(movePageAction.fulfilled, (state, action) => {
        state.currentLocation = action.payload.currentPage;
        // console.log('<->', action.payload.bookmarks);
        // console.log('<->', action.payload.bookmarks);
        // state.bookmarks = action.payload.bookmarks;
      })
      .addCase(setBookmark.fulfilled, (state, action) => {
        state.bookmarks = action.payload.bookmarks;
      })
      .addCase(setHighlight.fulfilled, (state, action) => {
        state.highLights = action.payload.highlights;
      });
  },
});

export const movePageAction = createAsyncThunk(
  'ebook/movePage',
  async ({ token, id }: Props, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosWithAuth(token);
      const data = {
        chapterName: state.ebook.currentLocation.chapterName,
        currentPage: state.ebook.currentLocation.currentPage,
        totalPage: state.ebook.currentLocation.totalPage,
        startCfi: state.ebook.currentLocation.startCfi,
        endCfi: state.ebook.currentLocation.endCfi,
        base: state.ebook.currentLocation.base,
        // bookmarks: state.ebook.bookmarks,
        // bookmarks: [
        //   {
        //     cfi: 'epubcfi(/6/12!/14/116/1:341)',
        //     date: '2024-03-28 15:30:10',
        //     key: 1711614610605,
        //     name: 'Bookmark',
        //   },
        // ],
      };

      // console.log('state', state.ebook.bookmarks);
      const response = await axios.post(`/ebook/read/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const initBookReader = createAsyncThunk(
  'ebook/init',
  async ({ token, id, callback }: Props, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosWithAuth(token);
      const response = await axios.get(`/ebook/fetch/${id}`);
      // console.log('init data', response.data.currentPage.startCfi);
      // console.log(response.data);
      callback && callback(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const setBookmark = createAsyncThunk(
  'bookmark/update',
  async ({ token, id }: Props, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosWithAuth(token);
      const data = {
        bookmarks: state.ebook.bookmarks,
      };
      const response = await axios.post(`/ebook/bookmark/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const setHighlight = createAsyncThunk(
  'highlight/update',
  async ({ token, id }: Props, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosWithAuth(token);
      const data = {
        highlights: state.ebook.highLights,
      };
      const response = await axios.post(`/ebook/highlight/${id}`, data);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const {
  updateBook,
  updateCurrentPage,
  updateToc,
  updateCurrentTheme,
  updateBookmark,
  updateBookOption,
  updateBookStyle,
  updateViewerLayout,
  updateHighLight,
  initFetchingCurrentLocation,
  initFetchingBookmarks,
} = ebookSlice.actions;
export default ebookSlice.reducer;

interface Props {
  token: string;
  id: number;
  callback?: (data: ReaderResponse) => void;
}
interface CurrentPage {
  chapterName: string | null;
  currentPage: number;
  totalPage: number;
  startCfi: string;
  endCfi: string;
  base: string;
}
interface ReaderResponse {
  currentPage: Page;
  bookmarks: Bookmarks;
  highlights: Highlight[];
}
