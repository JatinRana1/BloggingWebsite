import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userData: {
        name: string;
        email: string;
    } | null;
    token: string | null;
}

let initialState: AuthState = {
    userData: null,
    token: null
}

interface AuthPayload {
    userData: {
        name: string;
        email: string;
    } | null;
    token: string | null;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login : (state, action: PayloadAction<AuthPayload>)=> {
            state.userData = action.payload.userData;
            state.token = action.payload.token;
        },
        logout: (state)=> {
            state.userData = null;
            state.token = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;