import { authService } from '../services/auth';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getMe = createAsyncThunk('auth/me', async (params, thunkAPI) => {
  const currentUser = await authService.getMe();
  return currentUser;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    currentUser: {},
  },
  reducers: {},
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
