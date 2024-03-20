import axios from 'axios';
import { addTokensToLS, getTokensFromLS } from '../lib/helpers';
import { AuthEndpoints } from '.';
import { useNavigate } from 'react-router-dom';

export const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

export const baseApiInstance = axios.create({
   baseURL: BASE_URL,
   headers: { 'Content-Type': 'application/json' },
});

// export const formDataApiInstance = axios.create({
//    baseURL: BASE_URL,
// });

// formDataApiInstance.interceptors.request.use(
//    (config) => {
//       const { accessToken } = getTokensFromLS();
//       if (accessToken) {
//          config.headers['Authorization'] = `Bearer ${accessToken}`;
//       }
//       return config;
//    },
//    (error) => {
//       return Promise.reject(error);
//    }
// );

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

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            const accessToken = await refreshAccessToken();
            const { refreshToken } = getTokensFromLS();

            addTokensToLS({ accessToken, refreshToken });
            return baseApiInstance(originalRequest);
         } catch (refreshError: any) {
            localStorage.removeItem('currentTokens');
            localStorage.removeItem('currentUserId');
            localStorage.removeItem('currentEmail');

            const navigate = useNavigate();
            navigate('/');

            throw refreshError;
         }
      }
      return Promise.reject(error);
   }
);

// function addResponseInterceptor(apiInstance: any) {
//    apiInstance.interceptors.response.use(
//       (response: any) => {
//          return response;
//       },
//       async (error: any) => {
//          const originalRequest = error.config;

//          if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                const accessToken = await refreshAccessToken();
//                const { refreshToken } = getTokensFromLS();

//                addTokensToLS({ accessToken, refreshToken });
//                return apiInstance(originalRequest);
//             } catch (refreshError: any) {
//                localStorage.removeItem('currentTokens');
//                localStorage.removeItem('currentUserId');
//                localStorage.removeItem('currentEmail');

//                const navigate = useNavigate();
//                navigate('/');

//                throw refreshError;
//             }
//          }
//          return Promise.reject(error);
//       }
//    );
// }

// addResponseInterceptor(baseApiInstance);
// addResponseInterceptor(formDataApiInstance);
