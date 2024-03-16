import profileSlice, { addUser, addProfileCategory } from './model/profileSlice';

import {
   profileAPi,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
} from './api/profileAPi';

export {
   profileAPi,
   profileSlice,
   addUser,
   addProfileCategory,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
};
