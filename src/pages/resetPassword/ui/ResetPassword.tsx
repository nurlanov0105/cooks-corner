import { ResetPasswordForm } from '@/features/authentication';
import { useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '@/features/authentication/model/authApiEndpoints';
import { toast } from 'react-toastify';

const ResetPassword = () => {
   const [searchParams] = useSearchParams();

   const [resetPassword, { isLoading }] = useResetPasswordMutation();

   const token = searchParams.get('rpt');

   const handleResetPassword = async (email: string) => {
      if (token) {
         try {
            const response: any = await resetPassword({ email, token });
            if (response.error) {
               console.log('error in try - ', response.error);
               toast.error('Error in reset password');
            } else {
               console.log(response);
            }
         } catch (error) {
            console.log(error);
         }
      }
   };
   return <ResetPasswordForm handleResetPassword={handleResetPassword} isLoading={isLoading} />;
};

export default ResetPassword;
