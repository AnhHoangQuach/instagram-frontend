import { createSlice } from '@reduxjs/toolkit';

const coreUiSlice = createSlice({
  name: 'core',
  initialState: {
    mode: 'light',
  },
  reducers: {
    updateDarkmode(state, action) {
      state.mode = action.payload;
      localStorage.setItem('mode', action.payload);
    },
  },
});

const { reducer, actions } = coreUiSlice;
export const { updateDarkmode } = actions;
export default reducer;
