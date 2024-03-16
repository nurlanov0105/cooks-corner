import profileSlice, { addUser } from './model/usersSlice';

import {
   usersAPi,
   useGetUserRecipesQuery,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
} from './api/usersAPi';

export {
   usersAPi,
   useGetUserRecipesQuery,
   profileSlice,
   addUser,
   useGetUserQuery,
   useFollowMutation,
   useUnfollowMutation,
};
