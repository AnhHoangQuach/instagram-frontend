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
    currentUser: null,
    token: null,
  },
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem('token');
    },
    logout: (state, action) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [getMe.fulfilled]: (state, action) => {
      const { email } = action.payload.user;
      if (!email) {
        state.isLoggedIn = false;
        return;
      }
      return { isLoggedIn: true, currentUser: action.payload.user, token: state.token };
    },
  },
});

const { reducer, actions } = userSlice;
export const { logout, addToken, saveUser } = actions;
export default reducer;
