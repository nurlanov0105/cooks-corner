import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './appReducer';
import { authApi } from '@/features/authentication';
import { recipeApi } from '@/entities/recipes';
import { profileAPi } from '@/entities/profile/api/profileAPi';

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
         authApi.middleware,
         recipeApi.middleware,
         profileAPi.middleware
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
