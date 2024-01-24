import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstanceNoAuth } from '../../configs/axios';

const initState = {
  types: [],
  error: null,
};

const typeSlice = createSlice({
  name: 'type',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    handleTypes(builder, getAllBookTypes);
  },
});

const handleTypes = (builder, typeAction) => {
  builder
    .addCase(typeAction.pending, (state) => {
      state.types = [];
      state.error = null;
    })
    .addCase(typeAction.fulfilled, (state, action) => {
      state.types = action.payload;
    })
    .addCase(typeAction.rejected, (state, action) => {
      state.error = action.payload;
    });
};

export const getAllBookTypes = createAsyncThunk(
  'type/getAllBookTypes',
  async (_, thunkAPI) => {
    try {
      const axios = axiosInstanceNoAuth();
      const response = await axios.get(`/test/token/getType`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const {} = typeSlice.actions;

export default typeSlice.reducer;
