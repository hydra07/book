import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '../../configs/axios';
const initialState = {
  name: null,
  email: null,
  // password: null,
  avatar: null,
  phone: null,
  gender: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAuth(builder, getUser);
  },
});

const handleAuth = (builder, userAction) => {
  builder
    .addCase(userAction.pending, (state) => {
      state.name = null;
      state.email = null;
      // state.password = null;
      state.avatar = null;
      state.phone = null;
      state.gender = null;
    })
    .addCase(userAction.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      // state.password = action.payload.password;
      state.avatar = action.payload.avatar;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
    })
    .addCase(userAction.rejected, (state, action) => {
      state.error = action.payload;
      state.error = JSON.parse(JSON.stringify(action.payload)).error;
      state.error && toast.error(state.error);
    });
};

const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const state = getState();
  try {
    const axios = axiosInstance(state.auth.token);
    const response = await axios.get(`/test/token/user`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const {} = userSlice.actions;
export { getUser };
export default userSlice.reducer;
