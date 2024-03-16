import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: {},
};

const userSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      addUser(state, action) {
         state.user = action.payload;
      },
   },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
