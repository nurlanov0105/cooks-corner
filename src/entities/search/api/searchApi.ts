import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { RecipesEndpoints, Tags, UsersEndpoints } from '@/shared/api';
import {
   addChefsTotalPages,
   addRecipesTotalPages,
   setChefsCards,
   setChefsPage,
   setRecipesCards,
   setRecipesPage,
} from '../model/searchSlice';

export const searchApi = createApi({
   reducerPath: 'searchApi',
   baseQuery: baseQueryWithReauth,
   tagTypes: [Tags.USERS, Tags.RECIPES],
   endpoints: (builder) => ({
      searchUsers: builder.query({
         keepUnusedDataFor: 0,
         query: ({ size, page, searchParams }) => {
            return {
               responseHandler: (response) => response.text(),
               url: UsersEndpoints.USERS_SEARCH,
               method: 'GET',
               params: {
                  query: searchParams,
                  size,
                  page,
               },
            };
         },
         providesTags: [Tags.USERS],
         async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            const result = await queryFulfilled;
            const data = JSON.parse(result.data);

            dispatch(setChefsCards(data.content));
            dispatch(addChefsTotalPages(data.totalPages));
            dispatch(setChefsPage(data.number));
         },
      }),
      getSearchRecipes: builder.query({
         keepUnusedDataFor: 0,
         query: ({ size, page, searchParams }) => {
            return {
               url: RecipesEndpoints.RECIPES,
               method: 'GET',
               params: {
                  query: searchParams,
                  size,
                  page,
               },
            };
         },
         providesTags: [Tags.RECIPES],
         async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            const result = await queryFulfilled;
            const data = result.data;

            dispatch(setRecipesCards(data.content));
            dispatch(addRecipesTotalPages(data.totalPages));
            dispatch(setRecipesPage(data.number));
         },
      }),
   }),
});

export const { useSearchUsersQuery, useGetSearchRecipesQuery } = searchApi;
