import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

import {
   addAccessToken,
   addUserId,
   removeAccessToken,
   removeUserId,
} from '@/features/authentication';
import { AuthEndpoints } from '@/shared/api';
import { getTokensFromLS, addTokensToLS } from '@/shared/lib/helpers';
const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
   prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;

      if (accessToken) {
         headers.set('authorization', `Bearer ${accessToken}`);
      }
      // headers.set('Content-Type', 'application/json');
      return headers;
   },
});

export const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
      const { refreshToken, accessToken } = getTokensFromLS();

      localStorage.removeItem('currentTokens');
      api.dispatch(removeAccessToken());
      console.log('before access profile - ', accessToken);
      // console.log('before refresh auth - ', refreshToken);

      // send refresh token to get new access token
      const refreshResult: any = await baseQuery(
         {
            responseHandler: (response) => response.text(),
            url: AuthEndpoints.REFRESH_TOKEN,
            method: 'POST',
            body: 'Bearer ' + refreshToken,
         },
         api,
         extraOptions
      );

      console.log('refreshResult FROM profile API - ', refreshResult);

      if (refreshResult.data) {
         const parsedResult = JSON.parse(refreshResult.data);
         addTokensToLS({
            accessTooken: parsedResult.accessToken,
            refreshToken: parsedResult.refreshToken,
         });
         addUserId(parsedResult.userId);

         api.dispatch(addAccessToken(parsedResult.accessToken));
         api.dispatch(addUserId(parsedResult.userId));

         result = await baseQuery(args, api, extraOptions);

         if (result.error && result.error.status === 400) {
            toast.error('Попробуй еще раз!');
            console.log(result.error);
         }

         api.dispatch(closeModal());
      } else {
         localStorage.removeItem('currentUserId');
         localStorage.removeItem('currentTokens');

         api.dispatch(removeAccessToken());
         api.dispatch(removeUserId());

         api.dispatch(closeModal());
         console.log('token not valid - ', refreshResult);
         toast.error('Перезайдите пожалуйста!');
      }
   }
   return result;
};
