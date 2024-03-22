import userSlice, {
   addUserProfile,
   addProfileCategory,
   setProfileRecipes,
   addProfileData,
   addProfileImg,
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
   addProfileImg,
   getUser,
   getProfileRecipes,
   getUserRecipes,
   updateProfile,
   follow,
   unFollow,
};
