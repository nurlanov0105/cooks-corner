import { useAppDispatch } from '@/app/appStore';
import { SignInForm, addAccessToken, useLoginMutation } from '@/features/authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignIn = () => {
   const [login, { isLoading }] = useLoginMutation();
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const handleLogin = async (email: string, password: string) => {
      console.log(email, password);
      try {
         const res: any = await login({ email, password });
         if (res.error) {
            toast.error(res.error.data);
            console.log(res.error);
         } else if (res.data) {
            toast.success('Succefully logged in!');
            console.log(res.data);

            // remove email from Local Storage
            localStorage.removeItem('currentEmail');

            const { accessToken, refreshToken, userId } = res.data;
            // save in redux
            dispatch(addAccessToken(accessToken));

            // save in local storage
            const newTokens = JSON.stringify({ accessToken, refreshToken });
            const currentUserId = JSON.stringify({ userId });

            localStorage.setItem('currentUserId', currentUserId);
            localStorage.setItem('currentTokens', newTokens);
            navigate('/');
         }
      } catch (error) {
         toast.error('Error catch');

         console.log('error', error);
      }
   };
   return <SignInForm handleLogin={handleLogin} isLoading={isLoading} />;
};

export default SignIn;
