import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm, resetPassword } from '@/features/authentication';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { IResetPasswordRequest } from '@/shared/lib/types';

const ResetPassword: FC = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const rpt = searchParams.get('rpt');

   const { mutate: resetPasswordMutate, isPending } = useMutation({
      mutationFn: (params: IResetPasswordRequest) => resetPassword(params),
      onSuccess: (data) => {
         console.log(data);
         toast.success('Succesfully changed password!');
         navigate('/signin');
      },
      onError: (error) => {
         toast.error('reset password error');
         console.log(error);
      },
   });

   const handleResetPassword = (password: string) => {
      const params = { password, rpt };
      resetPasswordMutate(params);
   };
   return <ResetPasswordForm handleResetPassword={handleResetPassword} isLoading={isPending} />;
};

export default ResetPassword;
