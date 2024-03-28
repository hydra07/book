import { axiosWithAuth } from '@/lib/axios';
import {
  BookOption,
  BookStyle,
  Bookmarks,
  Highlight,
  Page,
  Toc,
  ViewerLayout,
} from '@/types/ebook';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { getServerSession } from 'next-auth';
interface EbookState {
  book: any;
  currentLocation: Page;
  theme: string;
  toc: Toc[];
  highLight: Highlight[];
  bookmarks: Bookmarks;
  bookOption: BookOption;
  bookStyle: BookStyle;
  viewerLayout: ViewerLayout;
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
  highLight: [],
  bookmarks: [],
  bookOption: initialBookOption,
  bookStyle: initialBookStyle,
  viewerLayout: initialViewerLayout,
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
  },
  extraReducers: (builder) => {
    builder
      // .addCase(initBookReader.pending, () => {
      //   console.log('initBookReader.pending');
      // })
      .addCase(
        initBookReader.fulfilled,
        (state, action: PayloadAction<ReaderResponse>) => {
          // state.currentLocation = action.payload.currentPage;
          console.log('initBookReader.fulfilled', action.payload.currentPage);
        },
      )
      .addCase(movePageAction.fulfilled, (state, action) => {
        state.currentLocation = action.payload.currentPage;
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
      };

      console.log(state.ebook.currentLocation);
      const response = await axios.post(`/ebook/read/${id}`, data);
      console.log('movePageAction');
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
      console.log('init data', response.data.currentPage.startCfi);
      console.log(response.data);
      callback && callback(response.data.currentPage);
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
} = ebookSlice.actions;
export default ebookSlice.reducer;

interface Props {
  token: string;
  id: number;
  callback?: (currenPage: Page) => void;
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
}
