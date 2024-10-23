import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: []
}

const userSlice = createSlice({
    name:'userSliceRedux',
    initialState,
    reducers:{
        updateUser(state,action){

            state.users = action.payload;

            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        }
    }
})
    export const {updateUser} = userSlice.actions;
    export default userSlice.reducer