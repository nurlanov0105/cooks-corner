import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { USERS } from '@/shared/api/endpoints';
import { Tags } from '@/shared/api';

export const profileAPi = createApi({
   reducerPath: 'profileAPi',
   baseQuery: baseQueryWithReauth,
   tagTypes: [Tags.USERS],
   endpoints: (builder) => ({
      getUser: builder.query({
         query: ({ userId }) => {
            return {
               url: USERS + `/${userId}`,
               method: 'GET',
            };
         },
         providesTags: [Tags.USERS],
      }),
      follow: builder.mutation({
         query: ({ userId }) => {
            return {
               responseHandler: (response) => response.text(),
               url: USERS + `/${userId}/follow`,
               method: 'POST',
            };
         },
         invalidatesTags: [Tags.USERS],
      }),
      unfollow: builder.mutation({
         query: ({ userId }) => {
            return {
               responseHandler: (response) => response.text(),
               url: USERS + `/${userId}/unfollow`,
               method: 'POST',
            };
         },
         invalidatesTags: [Tags.USERS],
      }),
   }),
});

export const { useGetUserQuery, useFollowMutation, useUnfollowMutation } = profileAPi;
