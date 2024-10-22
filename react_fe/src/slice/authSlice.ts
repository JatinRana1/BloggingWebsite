import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userData: object | null;
}

let initialState: AuthState = {
    userData: null
}

interface AuthPayload {
    userData: object | null;
}


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser : (state, action: PayloadAction<AuthPayload>)=> {
            state.userData = action.payload.userData;
        },
        clearUser: (state)=> {
            state.userData = null;
        }
    }
})

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;