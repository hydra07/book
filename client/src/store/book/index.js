import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstanceNoAuth } from "../../configs/axios";

const initialState = {
  books: [],
  message: null,
  error: null,
};

const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAuth(builder, getbook);
    handleAuth(builder, getlistbook);
    handleSearch(builder, searchBooks);
    handleAdd(builder, addBook);
    handleUpdate(builder, updateBook);
    handleDelete(builder, deleteBook);
  },
});

const handleAuth = (builder, authAction) =>
  builder
    .addCase(authAction.pending, (state) => {
      state.message = null;
      state.error = null;
      state.books = null;
    })
    .addCase(authAction.fulfilled, (state, action) => {
      state.books = action.payload.books || [];
      state.message = action.payload.message;
      if (state.message) {
        toast.success(state.message);
      }
    })
    .addCase(authAction.rejected, (state, action) => {
      state.error = action.payload.error;
      if (state.error) {
        toast.error(state.error);
      }
    });

const handleSearch = (builder, searchAction) =>
  builder
    .addCase(searchAction.pending, (state) => {
      state.message = null;
      state.error = null;
    })
    .addCase(searchAction.fulfilled, (state, action) => {
      state.searchedBooks = action.payload.books || [];
      state.message = action.payload.message;
      if (state.message) {
        toast.success(state.message);
      }
    })
    .addCase(searchAction.rejected, (state, action) => {
      state.error = action.payload.error;
      if (state.error) {
        toast.error(state.error);
      }
    });

const handleAdd = (builder, addAction) =>
  builder
    .addCase(addAction.pending, (state) => {
      state.message = null;
      state.error = null;
    })
    .addCase(addAction.fulfilled, (state, action) => {
      state.books.push(action.payload.book);
      state.message = action.payload.message;
      if (state.message) {
        toast.success(state.message);
      }
    })
    .addCase(addAction.rejected, (state, action) => {
      state.error = action.payload.error;
      if (state.error) {
        toast.error(state.error);
      }
    });

const handleUpdate = (builder, updateAction) =>
  builder
    .addCase(updateAction.pending, (state) => {
      state.message = null;
      state.error = null;
    })
    .addCase(updateAction.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.book.id
      );
      if (index !== -1) {
        state.books[index] = action.payload.book;
      }
      state.message = action.payload.message;
      if (state.message) {
        toast.success(state.message);
      }
    })
    .addCase(updateAction.rejected, (state, action) => {
      state.error = action.payload.error;
      if (state.error) {
        toast.error(state.error);
      }
    });

const handleDelete = (builder, deleteAction) =>
  builder
    .addCase(deleteAction.pending, (state) => {
      state.message = null;
      state.error = null;
    })
    .addCase(deleteAction.fulfilled, (state, action) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.bookId
      );
      if (index !== -1) {
        state.books.splice(index, 1);
      }
      state.message = action.payload.message;
      if (state.message) {
        toast.success(state.message);
      }
    })
    .addCase(deleteAction.rejected, (state, action) => {
      state.error = action.payload.error;
      if (state.error) {
        toast.error(state.error);
      }
    });

const getbook = createAsyncThunk("auth/getbook", async (book, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.post("auth/book", book);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const getlistbook = createAsyncThunk("auth/getlistbook", async (listbook, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.post("auth/book", listbook);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const addBook = createAsyncThunk("books/add", async (book, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.post("auth/book", book);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const updateBook = createAsyncThunk("books/update", async (book, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.put(`auth/book/${book.id}`, book);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const deleteBook = createAsyncThunk("books/delete", async (bookId, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.delete(`auth/book/${bookId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const searchBooks = createAsyncThunk("books/search", async (searchTerm, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.get(`auth/book?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const {} = BookSlice.actions;
export { getbook, getlistbook, addBook, updateBook, deleteBook, searchBooks };
export default BookSlice.reducer;