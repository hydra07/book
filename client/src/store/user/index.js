import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstanceNoAuth } from '../../configs/axios';

const initialState = {
  message: null,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //---register---
      .addCase(register.pending, (state) => {
        state.message = null;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      //---login---
      .addCase(login.pending, (state) => {
        state.message = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const register = createAsyncThunk(
  'user/register',
  async (user, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState();
    try {
      // const axios = axiosInstance(state.user.token);
      console.log(user);
      const axios = axiosInstanceNoAuth();
      const response = await axios.post(`/auth/register`, user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const state = getState();
  try {
    // const axios = axiosInstance(state.user.token);
    const axios = axiosInstanceNoAuth();
    const response = await axios.post(`/auth/authenticate`, user);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const {} = userSlice.actions;

export default userSlice.reducer;
