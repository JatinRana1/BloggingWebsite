import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: "tokens",
    initialState: null,
    reducers: {
        setToken : (state, action) => {
            return action.payload
        },
        clearToken: (state)=> {
            return null
        }
    }
})

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;