import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'Saved recipe',
   user: {},
};

const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      addProfileCategory(state, action) {
         state.category = action.payload;
      },
      addUser(state, action) {
         state.user = action.payload;
      },
   },
});

export const { addUser, addProfileCategory } = profileSlice.actions;

export default profileSlice.reducer;
