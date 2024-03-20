import { FC } from 'react';
import { ForgetPasswordForm, sendForgotPassword } from '@/features/authentication';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { IResendEmailRequest } from '@/shared/lib/types';

const ForgotPassword: FC = () => {
   const { mutate: sendForgotPasswordMutate, isPending } = useMutation({
      mutationFn: (params: IResendEmailRequest) => sendForgotPassword(params),
      onSuccess: (data) => {
         toast.success('Succesfully email sent!');
         console.log(data);
      },
      onError: (error) => {
         toast.error('forgot password failed');
         console.log(error);
      },
   });

   const handleForgotPassword = (email: string) => {
      const params = { email, url: 'http://localhost:5173/reset-password' };
      sendForgotPasswordMutate(params);
   };

   return <ForgetPasswordForm handleForgotPassword={handleForgotPassword} isLoading={isPending} />;
};

export default ForgotPassword;
