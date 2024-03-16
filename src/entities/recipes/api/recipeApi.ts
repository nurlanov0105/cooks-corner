import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { RECIPES } from '@/shared/api/endpoints';
import { setRecipes } from '..';
import { Tags } from '@/shared/api';

export const recipeApi = createApi({
   reducerPath: 'recipeApi',
   baseQuery: baseQueryWithReauth,
   tagTypes: [Tags.RECIPES],
   endpoints: (builder) => ({
      getRecipes: builder.query({
         keepUnusedDataFor: 0,
         query: ({ size, page, category }) => {
            return {
               url: RECIPES,
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
               url: RECIPES + `/${recipeId}/like`,
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
               url: RECIPES + `/${recipeId}/dislike`,
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
               url: RECIPES + `/${recipeId}/bookmark`,
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
               url: RECIPES + `/${recipeId}/remove-bookmark`,
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
               url: RECIPES + `/${recipeId}`,
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
