import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import OneOneChatReducer from './OneOneChatSlice'
import personalChatReducer from './RecievePersonalChat'



const store = configureStore({
  reducer: {
    userUpdateStore: userReducer,
    ChatUser1on1Store:OneOneChatReducer,
    PersonalChatStore:personalChatReducer
  }
});

export default store;
