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
import { authApi } from './api/authApi';
import {
   useRegisterMutation,
   useLoginMutation,
   useConfirmationMutation,
   useResendConfirmationMutation,
   useLogoutMutation,
   useForgotPasswordMutation,
   useEmailAvailableMutation,
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
   authApi,
   useRegisterMutation,
   useLoginMutation,
   useConfirmationMutation,
   useResendConfirmationMutation,
   useLogoutMutation,
   useForgotPasswordMutation,
   useEmailAvailableMutation,
};
