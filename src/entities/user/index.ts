import userSlice, {
   addUserProfile,
   addProfileCategory,
   setProfileRecipes,
   addProfileData,
   addProfileImg,
   setWrapperRef,
   setCurrentPage,
   setLimit,
} from './model/userSlice';

import {
   getUser,
   getProfileRecipes,
   getUserRecipes,
   updateProfile,
   follow,
   unFollow,
   getUserFollowers,
   getUserFollowing,
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
   setWrapperRef,
   setCurrentPage,
   setLimit,
   getUserFollowers,
   getUserFollowing,
};
