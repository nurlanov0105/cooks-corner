import SignInForm from './ui/SignInForm';
import SignUpForm from './ui/SignUpForm';
import ForgetPasswordForm from './ui/ForgotPasswordForm';
import ResetPasswordForm from './ui/ResetPasswordForm';
import { singlePasswordValidationSchema } from './model/validation';
import { getInputClassNames } from './model/getInputClassNames';
import ErrorMessage from './ui/ErrorMessage';

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
   deleteAccount,
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
   deleteAccount,
   singlePasswordValidationSchema,
   getInputClassNames,
   ErrorMessage,
};
