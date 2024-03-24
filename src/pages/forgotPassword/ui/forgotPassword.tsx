import { FC } from 'react';
import { ForgetPasswordForm, sendForgotPassword } from '@/features/authentication';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { SECONDARY_URL } from '@/shared/api/instance';

const ForgotPassword: FC = () => {
   const sendForgotPasswordMutate = useMutation({
      mutationFn: sendForgotPassword,
      onSuccess: (data) => {
         toast.success('Succesfully email sent!');
         console.log(data);
      },
   });

   const handleForgotPassword = (email: string) => {
      const params = { email, url: `${SECONDARY_URL}/reset-password` };
      sendForgotPasswordMutate.mutate(params);
   };

   return (
      <ForgetPasswordForm
         handleForgotPassword={handleForgotPassword}
         isLoading={sendForgotPasswordMutate.isPending}
      />
   );
};

export default ForgotPassword;
