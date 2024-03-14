import { RootState } from '@/app/appStore';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AuthEndpoints } from './endpoints';

const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
   // credentials: 'include',

   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).profile.accessToken;

      if (token) {
         headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
   args,
   api,
   extraOptions
) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
      // send refresh token to get new access token
      const refreshResult: any = await baseQuery(
         {
            url: AuthEndpoints.REFRESH_TOKEN,
            method: 'POST',
            body: {
               refresh: (api.getState() as RootState).profile.refreshToken,
            },
         },
         api,
         extraOptions
      );

      if (refreshResult.data) {
         // api.dispatch(tokenRefresh(refreshResult.data));
         // updateUserInLS(refreshResult.data);
         // Здесь access токен при первом запросе не актуален,
         //  поэтому выходит ошибка при первом logout, срабатывает только во второй раз,
         //  когда получает акутальный access токен.
         // Я не смог установить сюда актульное значение accesss токена. SOS
         // result = await baseQuery(args, api, extraOptions);
         // if (result.error && result.error.status === 400) {
         //    toast.error('Попробуй еще раз!');
         //    console.log(result.error);
         // }
         // api.dispatch(closeModal());
      } else {
         // toast.error(refreshResult.error.data);
         // console.log('token not valid - ', refreshResult);
         // api.dispatch(closeModal());
         // api.dispatch(removeUser());
         // localStorage.removeItem('currentUser');
      }
   }
   return result;
};

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
});
