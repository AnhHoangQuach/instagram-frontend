import { authService } from '../services/auth';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getMe = createAsyncThunk('auth/me', async () => {
  try {
    const resData = await authService.getMe();
    if (resData && resData.status === 'success') {
      return resData.data;
    }
  } catch (err) {
    throw err;
  }
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
      const { email } = action.payload.user;
      if (!email) {
        state.isLoggedIn = false;
        return;
      }
      return { isLoggedIn: true, user: action.payload.user };
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
