import { categorySlice } from '@/entities/category';
import { profileSlice } from '@/entities/profile';
import { searchSlice } from '@/entities/search';
import { modalSlice } from '@/widgets/modal';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
   profile: profileSlice,
   category: categorySlice,
   search: searchSlice,
   modal: modalSlice,
   // [authApi.reducerPath]: authApi.reducer,
});
