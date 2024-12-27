import { createSlice } from "@reduxjs/toolkit";

export interface userData {
    userID: Number,
    userName: String,
    userRole: Number,
    userTheme: Number,
}

export interface userDataState {
    userData: userData | null
}

const initialState : userDataState = {
    userData: null 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser : (state, action)=> {
            state.userData = action.payload.userData;
        },
        clearUser: (state)=> {
            state.userData = null;
        }
    }
})

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;