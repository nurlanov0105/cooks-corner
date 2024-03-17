import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'my',
   user: {},
   profileRecipes: [],
   profileData: {
      name: null,
      bio: null,
   },
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

      addProfileData(state, action) {
         const { name, bio } = action.payload;
         state.profileData.name = name;
         state.profileData.bio = bio;
      },
   },
});

export const { addUserProfile, addProfileCategory, setProfileRecipes, addProfileData } =
   profileSlice.actions;

export default profileSlice.reducer;
