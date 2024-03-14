import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'Breakfast',
};

const categorySlice = createSlice({
   name: 'category',
   initialState,
   reducers: {
      addCategory(state, action) {
         state.category = action.payload;
      },
   },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
