import searchSlice, {
   addSearchCategory,
   setChefsPage,
   setRecipesPage,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
   addChefsTotalPages,
   addRecipesTotalPages,
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
   addChefsTotalPages,
   addRecipesTotalPages,
};
