import { createSlice } from '@reduxjs/toolkit';
import { getTokensFromLS } from '@/shared/lib/helpers';
import { getUserInfoFomLS } from '@/shared/lib/helpers/getUserInfoFomLS';
import { IAuthState } from './types';

const { accessToken } = getTokensFromLS();
const { userId, name } = getUserInfoFomLS();

const initialState: IAuthState = {
   accessToken: accessToken,
   userInfo: { userId, name },
};
const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      addAccessToken(state, action) {
         state.accessToken = action.payload;
      },
      removeAccessToken(state) {
         state.accessToken = null;
      },
      addUserInfo(state, action) {
         state.userInfo.name = action.payload.name;
         state.userInfo.userId = action.payload.userId;
      },
      removeUserInfo(state) {
         state.userInfo.name = null;
         state.userInfo.userId = null;
      },
   },
});

export const { addAccessToken, removeAccessToken, addUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;
