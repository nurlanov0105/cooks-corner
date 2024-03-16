import profileSlice, { addUser, addProfileCategory } from './model/profileSlice';
import { useGetUserQuery, useFollowMutation, useUnfollowMutation } from './api/profileAPi';
export {
   profileSlice,
   addUser,
   addProfileCategory,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
};
