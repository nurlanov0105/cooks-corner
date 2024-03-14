import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 'Chefs',
   chefsSearchValue: '',
   recipesSearchValue: '',
   chefsCards: [],
   receiptsCards: [],
};

const searchSlice = createSlice({
   name: 'search',
   initialState,
   reducers: {
      addSearchCategory(state, action) {
         state.category = action.payload;
      },
   },
});

export const { addSearchCategory } = searchSlice.actions;

export default searchSlice.reducer;
