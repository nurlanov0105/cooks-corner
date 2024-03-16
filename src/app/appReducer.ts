import { combineReducers } from '@reduxjs/toolkit';
import { recipeApi, recipeSLice } from '@/entities/recipes';
import { profileApi, profileSlice } from '@/entities/profile';
import { searchApi, searchSlice } from '@/entities/search';
import { modalSlice } from '@/widgets/modal';
import { modalBlurSlice } from '@/widgets/modalBlur';
import { authApi, authSlice } from '@/features/authentication';

export const rootReducer = combineReducers({
   auth: authSlice,
   recipe: recipeSLice,
   profile: profileSlice,
   search: searchSlice,
   modal: modalSlice,
   modalBlur: modalBlurSlice,
   [authApi.reducerPath]: authApi.reducer,
   [recipeApi.reducerPath]: recipeApi.reducer,
   [searchApi.reducerPath]: searchApi.reducer,
   [profileApi.reducerPath]: profileApi.reducer,
});
