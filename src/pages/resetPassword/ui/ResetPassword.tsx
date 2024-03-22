import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm, resetPassword } from '@/features/authentication';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const ResetPassword: FC = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const rpt = searchParams.get('rpt');

   const resetPasswordMutate = useMutation({
      mutationFn: resetPassword,
      onSuccess: () => {
         toast.success('Succesfully changed password!');
         navigate('/signin');
      },
   });

   const handleResetPassword = (password: string) => {
      const params = { password, rpt };
      resetPasswordMutate.mutate(params);
   };
   return (
      <ResetPasswordForm
         handleResetPassword={handleResetPassword}
         isLoading={resetPasswordMutate.isPending}
      />
   );
};

export default ResetPassword;
