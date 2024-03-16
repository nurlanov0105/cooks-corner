import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'Chefs',

   chefsCards: [],
   chefsSearchParams: '',
   chefsPage: 0,
   chefsLimit: 12,
   chefsTotalPages: 0,

   recipesCards: [],
   recipesSearchParams: '',
   recipesPage: 0,
   recipesLimit: 12,
   recipesTotalPages: 0,
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      addSearchCategory(state, action) {
         state.category = action.payload;
      },
      setChefsPage(state, action) {
         state.chefsPage = action.payload;
      },
      setChefsSearchParams(state, action) {
         state.chefsSearchParams = action.payload;
         console.log(state.chefsSearchParams);
      },
      setChefsCards(state, action) {
         state.chefsCards = action.payload;
      },

      addChefsTotalPages(state, action) {
         state.chefsTotalPages = action.payload;
      },

      addRecipesTotalPages(state, action) {
         state.chefsTotalPages = action.payload;
      },

      setRecipesPage(state, action) {
         state.recipesPage = action.payload;
      },
      setRecipesSearchParams(state, action) {
         state.recipesSearchParams = action.payload;
      },
      setRecipesCards(state, action) {
         state.recipesCards = action.payload;
      },
   },
});

export const {
   addSearchCategory,
   setChefsPage,
   setRecipesPage,
   addChefsTotalPages,
   addRecipesTotalPages,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
} = searchSlice.actions;

export default searchSlice.reducer;
