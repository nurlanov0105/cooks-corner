import SignInForm from './ui/SignInForm';
import SignUpForm from './ui/SignUpForm';
import ForgetPasswordForm from './ui/ForgotPasswordForm';
import ResetPasswordForm from './ui/ResetPasswordForm';

import authSlice, {
   addAccessToken,
   removeAccessToken,
   addUserId,
   removeUserId,
} from './model/authSlice';

import {
   login,
   register,
   emailAvailable,
   resendEmail,
   confirm,
   sendForgotPassword,
   resetPassword,
   logout,
} from './api/authApi';

export {
   SignInForm,
   SignUpForm,
   ForgetPasswordForm,
   ResetPasswordForm,
   authSlice,
   addAccessToken,
   removeAccessToken,
   addUserId,
   removeUserId,
   login,
   register,
   emailAvailable,
   resendEmail,
   confirm,
   sendForgotPassword,
   resetPassword,
   logout,
};
