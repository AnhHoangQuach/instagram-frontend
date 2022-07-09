import { createSlice } from '@reduxjs/toolkit';

const coreUiSlice = createSlice({
  name: 'core',
  initialState: {
    isDarkmode: false,
  },
  reducers: {
    updateDarkmode(state, action) {
      state.isDarkmode = action.payload;
      localStorage.setItem('isDarkmode', action.payload);
    },
  },
});

const { reducer, actions } = coreUiSlice;
export const { updateDarkmode } = actions;
export default reducer;
