import { combineReducers } from '@reduxjs/toolkit';
import { recipeApi, recipeSLice } from '@/entities/recipes';
import { profileSlice } from '@/entities/profile';
import { searchSlice } from '@/entities/search';
import { modalSlice } from '@/widgets/modal';
import { modalBlurSlice } from '@/widgets/modalBlur';
import { authApi, authSlice } from '@/features/authentication';
import { profileAPi } from '@/entities/profile/api/profileAPi';

export const rootReducer = combineReducers({
   auth: authSlice,
   recipe: recipeSLice,
   profile: profileSlice,
   search: searchSlice,
   modal: modalSlice,
   modalBlur: modalBlurSlice,
   [authApi.reducerPath]: authApi.reducer,
   [recipeApi.reducerPath]: recipeApi.reducer,
   [profileAPi.reducerPath]: profileAPi.reducer,
});
