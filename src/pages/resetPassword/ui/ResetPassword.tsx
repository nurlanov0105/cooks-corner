import { ResetPasswordForm } from '@/features/authentication';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '@/features/authentication/api/authApi';
import { toast } from 'react-toastify';

const ResetPassword = () => {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   const [resetPassword, { isLoading }] = useResetPasswordMutation();

   const token = searchParams.get('rpt');

   const handleResetPassword = async (password: string) => {
      if (token) {
         try {
            const response: any = await resetPassword({ password, token });
            if (response.error) {
               console.log('error in try - ', response.error);
               toast.error(response.error.data);
            } else {
               toast.success('Succesfully changed password!');
               console.log(response);
               navigate('/signin');
            }
         } catch (error) {
            console.log(error);
         }
      }
   };
   return <ResetPasswordForm handleResetPassword={handleResetPassword} isLoading={isLoading} />;
};

export default ResetPassword;
