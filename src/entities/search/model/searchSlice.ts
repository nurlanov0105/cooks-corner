import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'Chefs',
   chefsCards: [],
   recipesCards: [],
   chefsSearchParams: '',
   recipesSearchParams: '',

   chefsPage: 0,
   chefsLimit: 12,
   recipesPage: 0,
   recipesLimit: 12,
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      addSearchCategory(state, action) {
         state.category = action.payload;
      },
      setChefsSearchParams(state, action) {
         state.chefsSearchParams = action.payload;
         console.log(state.chefsSearchParams);
      },
      setRecipesSearchParams(state, action) {
         state.chefsSearchParams = action.payload;
      },
      setChefsCards(state, action) {
         state.chefsCards = action.payload;
      },
      setRecipesCards(state, action) {
         state.recipesCards = action.payload;
      },
   },
});

export const {
   addSearchCategory,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
} = searchSlice.actions;

export default searchSlice.reducer;
