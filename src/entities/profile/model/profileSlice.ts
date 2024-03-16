import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'my',
   user: {},
   profileRecipes: [],
};

const profileSlice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      addProfileCategory(state, action) {
         state.category = action.payload;
      },
      addUserProfile(state, action) {
         state.user = action.payload;
      },
      setProfileRecipes(state, action) {
         state.profileRecipes = action.payload;
      },
   },
});

export const { addUserProfile, addProfileCategory, setProfileRecipes } = profileSlice.actions;

export default profileSlice.reducer;
