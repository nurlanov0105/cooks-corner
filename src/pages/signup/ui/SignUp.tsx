import {
   SignUpForm,
   useEmailAvailableMutation,
   useRegisterMutation,
} from '@/features/authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
   const navigate = useNavigate();

   const [register, { isLoading }] = useRegisterMutation();
   const [checkEmailValidate, { isLoading: emailLoading, isSuccess: emailSucces }] =
      useEmailAvailableMutation();

   const handleRegister = async (name: string, email: string, password: string) => {
      try {
         const result: any = await register({ name, email, password });
         if (result.error) {
            toast.error(result.error.data);
            console.log(result.error);
         } else {
            console.log(result);

            const newEmail = JSON.stringify({ email });
            localStorage.setItem('currentEmail', newEmail);

            navigate('/verification');
         }
      } catch (error) {
         console.log('error', error);
      }
   };

   const checkEmailAvailable = async (email: string) => {
      try {
         const response: any = await checkEmailValidate({ email });
         if (response.error) {
            console.log('error in try - ', response.error);
            toast.error('error in check Email Available');
         } else {
            console.log(response);
         }
      } catch (error) {
         console.log(error);
         toast.error('Error in check Email Available');
      }
   };

   return (
      <SignUpForm
         handleRegister={handleRegister}
         checkEmailAvailable={checkEmailAvailable}
         isLoading={isLoading}
         emailLoading={emailLoading}
         emailSucces={emailSucces}
      />
   );
};

export default SignUp;
