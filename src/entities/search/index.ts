import searchSlice, {
   addSearchCategory,
   setChefsPage,
   setRecipesPage,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
} from './model/searchSlice';

import { searchApi, useSearchUsersQuery, useGetSearchRecipesQuery } from './api/searchApi';

export {
   searchSlice,
   setChefsPage,
   setRecipesPage,
   addSearchCategory,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
   searchApi,
   useSearchUsersQuery,
   useGetSearchRecipesQuery,
};
