import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '@/app/appStore';
import { closeModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

import { removeAccessToken } from '@/features/authentication';
import { AuthEndpoints } from '@/shared/api';
import { getTokensFromLS, updateTokenInLS } from '@/shared/lib/helpers';
const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
   prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;

      if (accessToken) {
         headers.set('authorization', `Bearer ${accessToken}`);
      }
      headers.set('Content-Type', 'application/json');
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
      const { refreshToken } = getTokensFromLS();
      localStorage.removeItem('currentTokens');
      api.dispatch(removeAccessToken());
      // send refresh token to get new access token
      console.log('before refrsh - ', refreshToken);
      const refreshResult: any = await baseQuery(
         {
            responseHandler: (response) => response.text(),
            url: AuthEndpoints.REFRESH_TOKEN,
            method: 'POST',
            body: `Bearer ${refreshToken}`,
         },
         api,
         extraOptions
      );

      console.log('refreshResult FROM AUTH API - ', refreshResult);

      if (refreshResult.data) {
         console.log('refreshResult.data - ', refreshResult.data);

         updateTokenInLS({ accessTooken: refreshResult.data, refreshToken });

         // Здесь access токен при первом запросе не актуален,
         //  поэтому выходит ошибка при первом logout, срабатывает только во второй раз,
         //  когда получает акутальный access токен.
         // Я не смог установить сюда актульное значение accesss токена. SOS

         result = await baseQuery(args, api, extraOptions);

         if (result.error && result.error.status === 400) {
            toast.error('Попробуй еще раз!');
            console.log(result.error);
         }

         api.dispatch(closeModal());
      } else {
         console.log('token not valid - ', refreshResult);
         api.dispatch(closeModal());
         api.dispatch(removeAccessToken());
         localStorage.removeItem('currentTokens');
      }
   }
   return result;
};
