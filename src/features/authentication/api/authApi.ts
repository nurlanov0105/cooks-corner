import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { AuthEndpoints } from '@/shared/api';

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: baseQueryWithReauth,
   endpoints: (builder) => ({
      register: builder.mutation({
         query: (params) => {
            const { name, email, password } = params;
            return {
               url: AuthEndpoints.REGISTER,
               responseHandler: (response) => response.text(),
               method: 'POST',
               body: {
                  name,
                  email,
                  password,
                  url: 'https://neobis-cooks-corner.vercel.app/confirm',
               },
            };
         },
      }),
      login: builder.mutation({
         query: (params) => {
            const { email, password } = params;
            return {
               url: AuthEndpoints.LOGIN,
               method: 'POST',
               body: {
                  email,
                  password,
               },
            };
         },
      }),
      confirmation: builder.mutation({
         query: (params) => {
            const { ct } = params;
            return {
               url: AuthEndpoints.CONFIRMATION,
               responseHandler: (response) => response.text(),
               method: 'PUT',
               params: {
                  ct: ct,
               },
            };
         },
      }),
      resendConfirmation: builder.mutation({
         query: (params) => {
            const { email } = params;
            return {
               url: AuthEndpoints.RESEND_CONFIRMATION,
               responseHandler: (response) => response.text(),
               method: 'POST',
               body: {
                  email,
                  url: 'https://neobis-cooks-corner.vercel.app/confirm',
               },
            };
         },
      }),
      logout: builder.mutation({
         query: (params) => {
            const { refreshToken } = params;
            return {
               url: AuthEndpoints.LOGOUT,
               responseHandler: (response) => response.text(),
               method: 'POST',
               body: `Bearer ${refreshToken}`,
            };
         },
      }),
      forgotPassword: builder.mutation({
         query: (params) => {
            const { email } = params;
            return {
               url: AuthEndpoints.FORGOT_PASSWORD,
               responseHandler: (response) => response.text(),
               method: 'POST',
               body: {
                  email,
                  url: 'https://neobis-cooks-corner.vercel.app/reset-password',
               },
            };
         },
      }),
      resetPassword: builder.mutation({
         query: (params) => {
            const { password, token } = params;
            console.log(password);
            return {
               url: AuthEndpoints.RESET_PASSWORD,
               responseHandler: (response) => response.text(),
               method: 'PUT',
               params: {
                  rpt: token,
               },
               body: {
                  password: password,
               },
            };
         },
      }),

      emailAvailable: builder.mutation({
         query: (params) => {
            const { email } = params;
            return {
               url: AuthEndpoints.EMAIL_AVAILABLE,
               responseHandler: (response) => response.text(),
               method: 'POST',
               body: email,
            };
         },
      }),
   }),
});

export const {
   useRegisterMutation,
   useLoginMutation,
   useConfirmationMutation,
   useResendConfirmationMutation,
   useLogoutMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
   useEmailAvailableMutation,
} = authApi;
