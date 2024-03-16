import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { setRecipes } from '..';
import { RecipesEndpoints, Tags } from '@/shared/api';

export const recipeApi = createApi({
   reducerPath: 'recipeApi',
   baseQuery: baseQueryWithReauth,
   tagTypes: [Tags.RECIPES],
   endpoints: (builder) => ({
      getRecipes: builder.query({
         keepUnusedDataFor: 0,
         query: ({ size, page, category }) => {
            return {
               url: RecipesEndpoints.RECIPES,
               method: 'GET',
               params: {
                  query: `category:${category}`,
                  size,
                  page,
               },
            };
         },
         providesTags: [Tags.RECIPES],
         async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            const result = await queryFulfilled;
            const data = result.data;

            dispatch(setRecipes(data.content));
         },
      }),
      likeRecipe: builder.mutation({
         query: ({ recipeId }) => {
            return {
               responseHandler: (response) => response.text(),
               url: RecipesEndpoints.RECIPES_LIKE + recipeId,
               method: 'PUT',
               params: {
                  recipeId,
               },
            };
         },
         invalidatesTags: [Tags.RECIPES],
      }),
      dislikeRecipe: builder.mutation({
         query: ({ recipeId }) => {
            return {
               responseHandler: (response) => response.text(),
               url: RecipesEndpoints.RECIPES_DISLIKE + recipeId,
               method: 'PUT',
               params: {
                  recipeId,
               },
            };
         },
         invalidatesTags: [Tags.RECIPES],
      }),
      bookmarkRecipe: builder.mutation({
         query: ({ recipeId }) => {
            return {
               responseHandler: (response) => response.text(),
               url: RecipesEndpoints.RECIPES_BOOKMARK + recipeId,
               method: 'PUT',
               params: {
                  recipeId,
               },
            };
         },
         invalidatesTags: [Tags.RECIPES],
      }),
      removeBookmarkRecipe: builder.mutation({
         query: ({ recipeId }) => {
            return {
               responseHandler: (response) => response.text(),
               url: RecipesEndpoints.RECIPES_REMOVE_BOOKMARK + recipeId,
               method: 'PUT',
               params: {
                  recipeId,
               },
            };
         },
         invalidatesTags: [Tags.RECIPES],
      }),
      getDetailRecipe: builder.query({
         query: ({ recipeId }) => {
            return {
               url: RecipesEndpoints.RECIPES + `/${recipeId}`,
               method: 'GET',
            };
         },
         providesTags: [Tags.RECIPES],
      }),
   }),
});

export const {
   useGetRecipesQuery,
   useLikeRecipeMutation,
   useDislikeRecipeMutation,
   useBookmarkRecipeMutation,
   useRemoveBookmarkRecipeMutation,
   useGetDetailRecipeQuery,
} = recipeApi;
