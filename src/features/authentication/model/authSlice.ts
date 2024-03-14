import { getTokensFromLS } from '@/shared/lib/helpers/getTokensFromLS';
import { createSlice } from '@reduxjs/toolkit';

const { accessToken } = getTokensFromLS();

const initialState = { accessToken: accessToken };
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
   },
});

export const { addAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;
