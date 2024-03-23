import { combineReducers } from '@reduxjs/toolkit';
import { recipeSLice } from '@/entities/recipes';
import { userSlice } from '@/entities/user';
import { searchSlice } from '@/entities/search';
import { modalSlice } from '@/widgets/modal';
import { authSlice } from '@/features/authentication';
import { commentSlice } from '@/features/comments';
import mobileModalSlice from '@/widgets/mobileModal/model/mobileModalSlice';

export const rootReducer = combineReducers({
   auth: authSlice,
   recipe: recipeSLice,
   user: userSlice,
   search: searchSlice,
   modal: modalSlice,
   comments: commentSlice,
   mobileModal: mobileModalSlice,
});
