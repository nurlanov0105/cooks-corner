import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'main dishes',
   limit: 12,
   currentPage: 0,
   recipes: [],
};

const recipeSLice = createSlice({
   name: 'recipe',
   initialState,
   reducers: {
      addRecipeCategory(state, action) {
         state.category = action.payload;
      },
      setRecipes(state, action) {
         state.recipes = action.payload;
      },

      likeAction(state, action) {
         // const filteredItem = state.recipes.
      },

      bookmarkAction(state, action) {},
   },
});

export const { addRecipeCategory, setRecipes } = recipeSLice.actions;

export default recipeSLice.reducer;
