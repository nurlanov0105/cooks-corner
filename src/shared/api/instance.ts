import axios from 'axios';
import { addTokensToLS, getTokensFromLS } from '../lib/helpers';
import { AuthEndpoints } from '.';

export const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

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

baseApiInstance.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         const accessToken = await refreshAccessToken();
         const { refreshToken } = getTokensFromLS();

         addTokensToLS({ accessToken, refreshToken });
         return baseApiInstance(originalRequest);
      }
      return Promise.reject(error);
   }
);
