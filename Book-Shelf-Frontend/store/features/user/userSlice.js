import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: null,
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setAccessToken } = userSlice.actions;

export const selectAccessToken = (state) => state.user.accessToken;

export default userSlice.reducer;
