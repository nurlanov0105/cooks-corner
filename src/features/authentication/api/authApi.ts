import { baseApiInstance } from '@/shared/api/instance';
import {
   ILoginRequest,
   ILoginResponse,
   IRegisterRequest,
   IResendEmailRequest,
   IResetPasswordRequest,
} from '@/shared/lib/types';
import { AuthEndpoints } from '@/shared/api';
import { toast } from 'react-toastify';
import { apiErrorMessages } from '@/shared/lib/helpers/apiErrorMessages';

export const login = async (params: ILoginRequest) => {
   try {
      const { data } = await baseApiInstance.post<ILoginResponse>(AuthEndpoints.LOGIN, params);

      return data;
   } catch (error: any) {
      apiErrorMessages({ queryName: 'Login', error });
   }
};
export const register = async (params: IRegisterRequest) => {
   try {
      const { data } = await baseApiInstance.post(AuthEndpoints.REGISTER, params);

      return data;
   } catch (error: any) {
      apiErrorMessages({ queryName: 'Register', error });
   }
};
export const emailAvailable = async (email: string) => {
   try {
      const data = await baseApiInstance.post(AuthEndpoints.EMAIL_AVAILABLE, email, {
         headers: { 'Content-Type': 'text/plain' },
      });
      console.log('data,', data);
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const resendEmail = async (params: IResendEmailRequest) => {
   try {
      const { data } = await baseApiInstance.post(AuthEndpoints.RESEND_CONFIRMATION, params);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const confirm = async (ct: string) => {
   try {
      const { data } = await baseApiInstance.put(`${AuthEndpoints.CONFIRMATION}?ct=${ct}`);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const sendForgotPassword = async (params: IResendEmailRequest) => {
   try {
      const { data } = await baseApiInstance.post(AuthEndpoints.FORGOT_PASSWORD, params);
      return data;
   } catch (error) {
      console.log(error);
   }
};

export const resetPassword = async (params: IResetPasswordRequest) => {
   try {
      const { data } = await baseApiInstance.put(
         `${AuthEndpoints.RESET_PASSWORD}?rpt=${params.rpt}`,
         { password: params.password }
      );
      return data;
   } catch (error) {
      console.log(error);
   }
};
export const logout = async (refreshToken: string) => {
   try {
      const { data } = await baseApiInstance.post(AuthEndpoints.LOGOUT, `Bearer ${refreshToken}`, {
         headers: { 'Content-Type': 'text/plain' },
      });
      return data;
   } catch (error) {
      console.log(error);
   }
};
