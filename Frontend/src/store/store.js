import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/redux';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
