import searchSlice, {
   addSearchCategory,
   setChefsPage,
   setRecipesPage,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
} from './model/searchSlice';

import { searchUsers, searchRecipes } from './api/searchApi';

export {
   searchSlice,
   setChefsPage,
   setRecipesPage,
   addSearchCategory,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
   searchUsers,
   searchRecipes,
};
