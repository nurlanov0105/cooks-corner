import userSlice, {
   addUserProfile,
   addProfileCategory,
   setProfileRecipes,
   addProfileData,
} from './model/userSlice';

import {
   getUser,
   getProfileRecipes,
   getUserRecipes,
   updateProfile,
   follow,
   unFollow,
} from './api/userAPi';

export {
   userSlice,
   addUserProfile,
   addProfileCategory,
   addProfileData,
   setProfileRecipes,
   getUser,
   getProfileRecipes,
   getUserRecipes,
   updateProfile,
   follow,
   unFollow,
};
