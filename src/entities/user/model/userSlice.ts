import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './types';

const initialState: IUserState = {
   category: 'my',
   user: {},
   profileRecipes: [],
   profileData: {
      name: null,
      bio: null,
   },
   profileImg: '',
   wrapperRef: null,
   currentPage: 0,
   limit: 12,
};

const userSlice = createSlice({
   name: 'user',
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

      addProfileImg(state, action) {
         state.profileImg = action.payload;
      },
      setWrapperRef(state, action) {
         state.wrapperRef = action.payload;
      },
      setCurrentPage(state, action) {
         state.currentPage = action.payload;
      },
      setLimit(state, action) {
         state.limit = action.payload;
      },
   },
});

export const {
   addUserProfile,
   addProfileCategory,
   setProfileRecipes,
   addProfileData,
   addProfileImg,
   setWrapperRef,
   setCurrentPage,
   setLimit,
} = userSlice.actions;

export default userSlice.reducer;
