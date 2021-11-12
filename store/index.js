import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice';

const rootReducer = {
  user: userReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
