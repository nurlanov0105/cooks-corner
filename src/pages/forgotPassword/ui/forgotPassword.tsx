import { ForgetPasswordForm, useForgotPasswordMutation } from '@/features/authentication';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
   const [sendForgotPassword, { isLoading }] = useForgotPasswordMutation();
   const handleForgotPassword = async (email: string) => {
      try {
         const response: any = await sendForgotPassword({ email });
         if (response.error) {
            console.log('error in try --', response.error);
            toast.error(response.error.data);
         } else {
            toast.success('Succesfully email sent!');
            console.log(response);
         }
      } catch (error) {}
      console.log(email);
   };

   return <ForgetPasswordForm handleForgotPassword={handleForgotPassword} isLoading={isLoading} />;
};

export default ForgotPassword;
