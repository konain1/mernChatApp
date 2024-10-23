

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chatUser:[]
}

const OneOneChatSlice = createSlice({
    name:'OneOnOneRedux',
    initialState,
    reducers:{
        addChatUserOneOnOne(state,action){
            state.chatUser = action.payload;
        }
    }
})


 export const {addChatUserOneOnOne} = OneOneChatSlice.actions;
 export default OneOneChatSlice.reducer
