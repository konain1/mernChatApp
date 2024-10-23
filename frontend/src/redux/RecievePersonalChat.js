import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalChats: []
};

const personalChatSlice = createSlice({
    name: 'personalChatSlice',
    initialState,
    reducers: {
        addPersonalChats(state, action) {
            state.personalChats = action.payload;
        }
    }
});

export const { addPersonalChats } = personalChatSlice.actions;
export default personalChatSlice.reducer;
