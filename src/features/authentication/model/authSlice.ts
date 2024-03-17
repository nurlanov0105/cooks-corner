import { createSlice } from '@reduxjs/toolkit';
import { getTokensFromLS } from '@/shared/lib/helpers';
import { getUserIdFromLS } from '@/shared/lib/helpers/getUserId';

const { accessToken } = getTokensFromLS();
const { userId } = getUserIdFromLS();

const initialState = { accessToken: accessToken, userId };
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
      addUserId(state, action) {
         state.userId = action.payload;
      },
      removeUserId(state) {
         state.userId = null;
      },
   },
});

export const { addAccessToken, removeAccessToken, addUserId, removeUserId } = authSlice.actions;

export default authSlice.reducer;
