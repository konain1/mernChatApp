import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    userUpdateStore: userReducer
  }
});

export default store;
