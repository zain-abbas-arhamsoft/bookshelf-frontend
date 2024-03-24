import { createSlice } from '@reduxjs/toolkit';

const initialuserState = {
    accessToken: '',
};
// Create slice for user
export const userSlice = createSlice({
    name: 'user',
    initialState: initialuserState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.loading = false;
        },
    },
});

export const { setAccessToken } = userSlice.actions;

export const selectAccessToken = (state) => state.user.accessToken;

export default userSlice.reducer;
