import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { RecipesEndpoints, Tags, UsersEndpoints } from '@/shared/api';
import { addUserProfile, setProfileRecipes } from '..';

export const profileApi = createApi({
   reducerPath: 'profileApi',
   baseQuery: baseQueryWithReauth,
   tagTypes: [Tags.RECIPES],
   endpoints: (builder) => ({
      getUserProfile: builder.query({
         query: ({ userId }) => {
            return {
               url: UsersEndpoints.USERS + `/${userId}`,
               method: 'GET',
            };
         },
         async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            const result = await queryFulfilled;
            const data = result.data;

            dispatch(addUserProfile(data));
         },
         providesTags: [Tags.RECIPES],
      }),
      getProfileRecipes: builder.query({
         keepUnusedDataFor: 0,
         query: ({ category }) => {
            return {
               url: RecipesEndpoints.RECIPES,
               method: 'GET',
               params: {
                  query: category,
               },
            };
         },
         providesTags: [Tags.RECIPES],
         async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            const result = await queryFulfilled;
            const data = result.data;

            dispatch(setProfileRecipes(data.content));
         },
      }),
   }),
});

export const { useGetUserProfileQuery, useGetProfileRecipesQuery } = profileApi;
