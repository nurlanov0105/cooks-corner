import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@/features/authentication/model/authSlice';
import { categorySlice } from '@/entities/category';
import { profileSlice } from '@/entities/profile';
import { searchSlice } from '@/entities/search';
import { modalSlice } from '@/widgets/modal';
import { baseApi } from '@/shared/api/baseApi';

export const rootReducer = combineReducers({
   auth: authSlice,
   profile: profileSlice,
   category: categorySlice,
   search: searchSlice,
   modal: modalSlice,
   [baseApi.reducerPath]: baseApi.reducer,
});
