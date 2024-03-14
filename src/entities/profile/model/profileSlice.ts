import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   accessToken: null,
   refreshToken: null,
   category: 'Saved recipe',
};

const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      addProfileCategory(state, action) {
         state.category = action.payload;
      },
   },
});

export const { addProfileCategory } = profileSlice.actions;

export default profileSlice.reducer;
