import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/appStore';
import { SignInForm, addAccessToken, addUserId, login } from '@/features/authentication';
import { addTokensToLS, addUserIdToLS } from '@/shared/lib/helpers';
import { useMutation } from '@tanstack/react-query';
import { ILoginRequest } from '@/shared/lib/types';
import { toast } from 'react-toastify';

const SignIn: FC = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const { mutate: loginMutate, isPending } = useMutation({
      mutationFn: (params: ILoginRequest) => login(params),
      onSuccess: (data) => {
         console.log(data);
         localStorage.removeItem('currentEmail');
         addTokensToLS({ accessToken: data.accessToken, refreshToken: data.refreshToken });
         addUserIdToLS(data.userId);
         dispatch(addAccessToken(data.accessToken));
         dispatch(addUserId(data.userId));

         navigate('/');
         toast.success('Succesfully login!');
      },
      onError: (error) => {
         toast.error('login failed');
         console.log(error);
      },
   });

   const handleLogin = (email: string, password: string) => {
      loginMutate({ email, password });
   };

   return <SignInForm handleLogin={handleLogin} isLoading={isPending} />;
};

export default SignIn;
