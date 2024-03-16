import searchSlice, {
   addSearchCategory,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
} from './model/searchSlice';

import { searchApi, useSearchUsersQuery, useGetSearchRecipesQuery } from './api/searchApi';

export {
   searchSlice,
   addSearchCategory,
   setChefsSearchParams,
   setRecipesSearchParams,
   setChefsCards,
   setRecipesCards,
   searchApi,
   useSearchUsersQuery,
   useGetSearchRecipesQuery,
};
