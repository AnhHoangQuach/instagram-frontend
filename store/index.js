import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice';
import coreUiReducer from './coreUiSlice';

const rootReducer = {
  user: userReducer,
  message: messageReducer,
  coreUi: coreUiReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
