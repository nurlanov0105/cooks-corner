import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/appStore';
import { SignInForm, addAccessToken, addUserId, login } from '@/features/authentication';
import { addEmailToLS, addTokensToLS, addUserIdToLS } from '@/shared/lib/helpers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const SignIn: FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const loginMutate = useMutation({
      mutationFn: login,
      onSuccess: (result) => {
         if (result.data) {
            console.log(result.data);
            // localStorage.removeItem('currentEmail');
            addTokensToLS({
               accessToken: result.data.accessToken,
               refreshToken: result.data.refreshToken,
            });
            addUserIdToLS(result.data.userId);
            dispatch(addAccessToken(result.data.accessToken));
            dispatch(addUserId(result.data.userId));

            navigate('/');
            toast.success('Succesfully login!');
         }
      },
   });

   const handleLogin = async (email: string, password: string) => {
      addEmailToLS(email);
      loginMutate.mutate({ email, password });
   };

   return <SignInForm handleLogin={handleLogin} isLoading={loginMutate.isPending} />;
};

export default SignIn;
