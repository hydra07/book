import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstanceNoAuth } from '../../configs/axios';
const initialState = {
  books: [],
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleBooks(builder, getBooks);
  },
});

const handleBooks = (builder, bookAction) => {
  builder
    .addCase(bookAction.pending, (state) => {
      state.books = [];
      state.error = null;
      state.message = null;
    })
    .addCase(bookAction.fulfilled, (state, action) => {
      state.books = action.payload;
      console.log(state.books);
      // state.message = JSON.parse(JSON.stringify(action.payload)).message;
    })
    .addCase(bookAction.rejected, (state, action) => {
      // state.error = action.payload;
      // state.error = JSON.parse(JSON.stringify(action.payload)).error;
    });
};

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const axios = axiosInstanceNoAuth();
      const response = await axios.get(`/test/token/getBook`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const {} = bookSlice.actions;

export default bookSlice.reducer;
