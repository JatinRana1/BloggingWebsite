import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sidebarSlice {
    isVisible: boolean;
}

const initialState : sidebarSlice = {
    isVisible: true,
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        setVisible: (state, action) => {
            state.isVisible = action.payload.isVisible;
        }
    }
})

export const { setVisible } = sidebarSlice.actions;

export default sidebarSlice.reducer;