import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   categoryId: 1,
   limit: 12,
   currentPage: 0,
   recipes: [],
};

const recipeSLice = createSlice({
   name: 'recipe',
   initialState,
   reducers: {
      addRecipeCategory(state, action) {
         state.categoryId = action.payload;
      },
      setRecipes(state, action) {
         state.recipes = action.payload;
      },
   },
});

export const { addRecipeCategory, setRecipes } = recipeSLice.actions;

export default recipeSLice.reducer;
