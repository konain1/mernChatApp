import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: [],
  selectedChat: null
}

const OneOneChatSlice = createSlice({
  name: 'ChatUser1on1',
  initialState,
  reducers: {
    addChatUserOneOnOne: (state, action) => {
      state.chats = action.payload
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload
    },
    clearChats: (state) => {
      state.chats = []
      state.selectedChat = null
    }
  }
})

export const {
  addChatUserOneOnOne,
  setSelectedChat,
  clearChats
} = OneOneChatSlice.actions

export default OneOneChatSlice.reducer