import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    profile:false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        profileState: (state) => {
          state.status = !state.status
        }
     }
})

export const {login, logout, profileState} = authSlice.actions;

export default authSlice.reducer;