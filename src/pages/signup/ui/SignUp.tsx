import { SignUpForm, useRegisterMutation } from '@/features/authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
   const navigate = useNavigate();

   const [register, { isLoading }] = useRegisterMutation();

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
   return <SignUpForm handleRegister={handleRegister} isLoading={isLoading} />;
};

export default SignUp;
