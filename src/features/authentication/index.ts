import SignInForm from './ui/SignInForm';
import SignUpForm from './ui/SignUpForm';
import ForgetPasswordForm from './ui/ForgotPasswordForm';
import ResetPasswordForm from './ui/ResetPasswordForm';

import { addAccessToken, removeAccessToken } from './model/authSlice';
import {
   useRegisterMutation,
   useLoginMutation,
   useConfirmationMutation,
   useResendConfirmationMutation,
   useLogoutMutation,
   useForgotPasswordMutation,
} from './model/authApiEndpoints';

export {
   SignInForm,
   SignUpForm,
   ForgetPasswordForm,
   ResetPasswordForm,
   addAccessToken,
   removeAccessToken,
   useRegisterMutation,
   useLoginMutation,
   useConfirmationMutation,
   useResendConfirmationMutation,
   useLogoutMutation,
   useForgotPasswordMutation,
};
