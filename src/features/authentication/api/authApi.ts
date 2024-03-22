import { authApiInstance, baseApiInstance } from '@/shared/api/instance';
import {
   ILoginRequest,
   IRegisterRequest,
   IResendEmailRequest,
   IResetPasswordRequest,
} from '@/shared/lib/types';
import { AuthEndpoints, UsersEndpoints } from '@/shared/api';

export const login = async (params: ILoginRequest) => {
   const response = await authApiInstance.post(AuthEndpoints.LOGIN, params);
   return response;
};
export const register = async (params: IRegisterRequest) => {
   const response = await authApiInstance.post(AuthEndpoints.REGISTER, params);

   return response;
};
export const emailAvailable = async (email: string) => {
   const response = await authApiInstance.post(AuthEndpoints.EMAIL_AVAILABLE, email, {
      headers: { 'Content-Type': 'text/plain' },
   });
   return response;
};
export const resendEmail = async (params: IResendEmailRequest) => {
   const response = await authApiInstance.post(AuthEndpoints.RESEND_CONFIRMATION, params);
   return response;
};

export const confirm = async (ct: string) => {
   const response = await authApiInstance.put(`${AuthEndpoints.CONFIRMATION}?ct=${ct}`);
   return response;
};

export const sendForgotPassword = async (params: IResendEmailRequest) => {
   const response = await authApiInstance.post(AuthEndpoints.FORGOT_PASSWORD, params);
   return response;
};

export const resetPassword = async (params: IResetPasswordRequest) => {
   const response = await authApiInstance.put(`${AuthEndpoints.RESET_PASSWORD}?rpt=${params.rpt}`, {
      password: params.password,
   });
   return response;
};
export const logout = async (refreshToken: string) => {
   const response = await baseApiInstance.post(AuthEndpoints.LOGOUT, `Bearer ${refreshToken}`, {
      headers: { 'Content-Type': 'text/plain' },
   });
   return response;
};
export const deleteAccount = async (password: string) => {
   const response = await baseApiInstance.delete(
      UsersEndpoints.USERS_DELETE + '?' + 'password=' + password
   );
   return response;
};
