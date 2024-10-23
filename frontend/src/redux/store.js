import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import OneOneChatReducer from './OneOneChatSlice'
const store = configureStore({
  reducer: {
    userUpdateStore: userReducer,
    addChatUser1on1Store:OneOneChatReducer
  }
});

export default store;
