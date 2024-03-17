import profileSlice, {
   addUserProfile,
   addProfileCategory,
   setProfileRecipes,
   addProfileData,
} from './model/profileSlice';

import {
   profileApi,
   useGetUserProfileQuery,
   useGetProfileRecipesQuery,
   useUpdateProfileMutation,
} from './api/profileAPi';

export {
   profileApi,
   profileSlice,
   addUserProfile,
   addProfileCategory,
   addProfileData,
   useGetUserProfileQuery,
   setProfileRecipes,
   useGetProfileRecipesQuery,
   useUpdateProfileMutation,
};
