import { axiosWithAuth } from '@/lib/axios';
import { Bookmarks, Highlight, Page, Toc } from '@/types/ebook';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
// import { getServerSession } from 'next-auth';
interface EbookState {
  book: any;
  currentLocation: Page;
  theme: string;
  toc: Toc[];
  highLight: Highlight[];
  bookmarks: Bookmarks;
}

const initialBook = {
  // id: '',
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
  endCfi: '',
  base: '',
};

const initialState: EbookState = {
  book: initialBook,
  currentLocation: initialCurrentLocation,
  theme: '',
  toc: [],
  highLight: [],
  bookmarks: [],
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
    updateCurrentPage(state, action) {
      state.currentLocation = action.payload as Page;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookReader.fulfilled, (state, action) => {
        state.currentLocation.startCfi = action.payload.lastCurrentCfi;
        state.bookmarks = action.payload.bookmarks;
      })
      .addCase(movePageAction.fulfilled, (state, action) => {
        console.log('movePageAction', action.payload);
        state.currentLocation.startCfi = action.payload.lastCurrentCfi;
      });
  },
});

export const movePageAction = createAsyncThunk(
  'ebook/movePage',
  async (token: string, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosWithAuth(token);
      const response = await axios.post(`/ebook/read/18`, {
        lastCurrentCfi: state.ebook.currentLocation.startCfi,
        // bookmark: state.ebook.bookmarks,
      });
      console.log('fetchBookReader', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchBookReader = createAsyncThunk(
  'ebook/fetch',
  async (token: string, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosWithAuth(token);
      const response = await axios.post(`/ebook/read/18`, {
        lastCurrentCfi: state.ebook.currentLocation.startCfi,
        bookmark: state.ebook.bookmarks,
      });
      console.log('fetchBookReader', response.data);
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
} = ebookSlice.actions;
export default ebookSlice.reducer;
