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
    user: {},
  },
  reducers: {},
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      const { email } = action.payload.data;
      if (!email) {
        state.isLoggedIn = false;
        return;
      }
      return { isLoggedIn: true, user: action.payload };
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
