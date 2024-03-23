import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   categoryId: 1,
   limit: 12,
   currentPage: 0,
   recipes: [],
   totalPages: 1,
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
      addCurrentPage(state, action) {
         state.currentPage = action.payload;
      },
      addTotalPages(state, action) {
         state.totalPages = action.payload;
      },
   },
});

export const { addRecipeCategory, setRecipes, addCurrentPage, addTotalPages } = recipeSLice.actions;

export default recipeSLice.reducer;
