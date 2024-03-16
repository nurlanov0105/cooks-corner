import profileSlice, {
   addUserProfile,
   addProfileCategory,
   setProfileRecipes,
} from './model/profileSlice';

import { profileApi, useGetUserProfileQuery, useGetProfileRecipesQuery } from './api/profileApi';

export {
   profileApi,
   profileSlice,
   addUserProfile,
   addProfileCategory,
   useGetUserProfileQuery,
   setProfileRecipes,
   useGetProfileRecipesQuery,
};
