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
   addUserInfo,
   removeUserInfo,
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
   addUserInfo,
   removeUserInfo,
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
