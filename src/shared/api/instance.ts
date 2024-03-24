import axios from 'axios';
import { addTokensToLS, getTokensFromLS } from '../lib/helpers';
import { AuthEndpoints } from '.';
import { apiErrorMessages } from '../lib/helpers/apiErrorMessages';

export const BASE_URL = import.meta.env.VITE_COOKS_BASE_API_URL;
export const SECONDARY_URL = import.meta.env.VITE_SECONDARY_URL;

export const authApiInstance = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
});

export const baseApiInstance = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
});

baseApiInstance.interceptors.request.use(
   (config) => {
      const { accessToken } = getTokensFromLS();
      if (accessToken) {
         config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

const refreshAccessToken = async () => {
   const { refreshToken } = getTokensFromLS();

   const { data } = await axios.post(
      BASE_URL + AuthEndpoints.REFRESH_TOKEN,
      `Bearer ${refreshToken}`,
      { headers: { 'Content-Type': 'text/plain' } }
   );
   console.log(data);
   return data.accessToken;
};

authApiInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      let url = new URL(window.location.href);

      if (
         error.response.data === 'Account has not been enabled' &&
         url.pathname !== '/verification'
      ) {
         apiErrorMessages({ queryName: 'authApiInstance', error: error });
         window.location.href = '/verification';
         return;
      }
      apiErrorMessages({ queryName: 'authApiInstance', error: error });
   }
);

baseApiInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const accessToken = await refreshAccessToken();
            const { refreshToken } = getTokensFromLS();

            addTokensToLS({ accessToken, refreshToken });
            return baseApiInstance(originalRequest);
         } catch (refreshError: any) {
            localStorage.removeItem('currentTokens');
            localStorage.removeItem('currentUserInfo');
            localStorage.removeItem('currentEmail');

            window.location.href = '/';

            throw refreshError;
         }
      }
      return Promise.reject(error);
   }
);
