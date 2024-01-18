import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { axiosInstanceNoAuth } from '../../configs/axios';
const initialState = {
  message: null,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAuth(builder, login);
    handleAuth(builder, register);
    handleAuth(builder, google);
  },
});

const handleAuth = (builder, authAction) => {
  builder
    .addCase(authAction.pending, (state) => {
      state.message = null;
      state.error = null;
      state.token = null;
    })
    .addCase(authAction.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.message = JSON.parse(JSON.stringify(action.payload)).message;
      state.message && toast.success(state.message);
    })
    .addCase(authAction.rejected, (state, action) => {
      state.error = action.payload;
      state.error = JSON.parse(JSON.stringify(action.payload)).error;
      state.error && toast.error(state.error);
    });
};

const google = createAsyncThunk('auth/google', async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    console.log(user);
    const axios = axiosInstanceNoAuth();
    const response = await axios.post(`/auth/google`, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.post(`/auth/register`, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const axios = axiosInstanceNoAuth();
    const response = await axios.post(`/auth/authenticate`, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const {} = authSlice.actions;
export { google, login, register };
export default authSlice.reducer;
