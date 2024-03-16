import profileSlice, { addUser, addProfileCategory } from './model/profileSlice';

import {
   profileApi,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
} from './api/profileApi';

export {
   profileApi,
   profileSlice,
   addUser,
   addProfileCategory,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
};
